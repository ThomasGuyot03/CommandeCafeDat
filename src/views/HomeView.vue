<template>
  <div class="home page-padding">
    <h1 class="title">Accueil</h1>
    <div class="notification custom-notification text-align-center">
  Commandez le meilleur de notre café !
    </div>


    <div class="filter-wrapper">
      <FilterCollapse
        :initialFilters="filters"
        @updateFilter="updateFilter($event)"
      />
    </div>

    <div v-if="loading" class="loading-indicator text-align-center">
      <i class="fas fa-spinner fa-spin"></i> Chargement en cours...
    </div>
    <div v-else>
      <div class="columns">
        <div class="columns is-multiline">
          <div
            v-for="(product, index) in products"
            :key="product._id"
            class="column is-one-third-desktop is-one-third-tablet is-half-mobile"
          >
            <div class="card text-align-center">
              <div class="card-image">
                <img :src="product.picture" border="0" alt="product" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="card-title no-wrap is-size-4 custom-title-size">
                      {{ product.name }}
                    </p>
                  </div>
                </div>
                <div class="content">
                  {{ product.description }}
                  <br />
                </div>

                <div class="quantity-selector">
                  <button @click="decreaseQuantity(index)" class="quantity-btn">-</button>
                  <input type="number" v-model="quantities[index]" min="1" class="quantity-input" />
                  <button @click="increaseQuantity(index)" class="quantity-btn">+</button>
                </div>

                <div class="columns is-centered">
                  <div class="column is-narrow">
                    <button
                      class="button custom-add-to-cart-button"
                      @click="addItem(product, quantities[index])"
                    >
                      Ajoutez au&nbsp;<i class="fas fa-shopping-basket"></i>
                    </button>
                    <button
                      v-if="getUser && getUser.isAdmin"
                      class="button custom-edit-button"
                      @click="openEditModal(product)"
                    >
                      <i class="fas fa-edit"></i> Modifier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaginationComponent
        :currentPage="currentPage"
        :totalPages="totalPages"
        :service-props="service"
        @update-page="updatePage"
      />
    </div>

    <EditProductModal
      :is-visible="isEditModalVisible"
      :product="selectedProduct"
      @close="isEditModalVisible = false"
      @product-updated="getProducts(currentPage)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditProductModal from "./EditProductModal.vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    EditProductModal,
  },
  data() {
    return {
      loading: true,
      service: "products",
      itemsLimit: 12,
      products: null,
      currentPage: 1,
      totalPages: 1,
      filters: {
        category: "",
        sortByPrice: "",
      },
      isEditModalVisible: false,
      selectedProduct: null,
      quantities: [],
    };
  },
  computed: {
    ...mapGetters(["getUser", "getCart"]),
    isAdmin() {
      const user = this.getUser;
      return user && user.role === "admin";
    },
    theme() {
      return this.$appConfig.theme;
    },
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    addItem(product, quantity) {
      const itemData = {
        id: product._id,
        name: product.name,
        quantity: quantity || 1,
      };
      let products = this.getCart.products;
      let productAlreadyInCart = products.find((i) => i.id === product._id);

      if (productAlreadyInCart) {
        productAlreadyInCart.quantity += itemData.quantity;
      } else {
        products.push(itemData);
      }

      this.$store.commit("updateToCart", { obj: products, source: "products" });
      this.showToast('success', `Le produit "${product.name}" a été ajouté au panier.`);
    },
    async getProducts(page = this.currentPage) {
      this.currentPage = page;
      this.loading = true;

      try {

        const result = await this.$http.get("/products", {
          params: {category: this.filters.category, page: this.currentPage, limit: this.itemsLimit},
        });
        const { products, totalPages } = result.data;

        this.products = products;
        this.totalPages = totalPages;
        this.quantities = products.map(() => 1);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      } finally {
        this.loading = false;
      }
    },
    updatePage(page) {
      this.getProducts(page);
    },
    openEditModal(product) {
      this.selectedProduct = { ...product };
      this.isEditModalVisible = true;
    },
    increaseQuantity(index) {
      this.quantities[index]++;
    },
    decreaseQuantity(index) {
      if (this.quantities[index] > 1) {
        this.quantities[index]--;
      }
    },
    showToast(type, message) {
      const toast = useToast();
      switch (type) {
        case 'success':
          toast.success(message, { timeout: 2000 });
          break;
        case 'error':
          toast.error(message, { timeout: 2000 });
          break;
        default:
          toast(message, { timeout: 2000 });
      }
    },
    updateFilter(value) {
      this.filters.category = value
      this.getProducts()
    }
  },
};
</script>

<style>

.home {
  padding-left: 160px;
}

.custom-notification {
  background-color: #303649 !important;
  color: #ffffff !important;
  border-radius: 10px;
  padding: 1.5rem 2rem;
}

.page-padding {
  padding-top: 50px;
}

.columns.is-multiline {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;
}

.notification {
  background-color: #4a4a4a;
  border-radius: 10px;
  color: #ffffff;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  overflow: hidden;
  position: relative;
  min-width: 140px;
  max-width: 220px;
  width: 100%;
  height: 100%;
  margin: 8px;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.card:hover::before {
  transform: scaleX(1);
}

.card:hover {
  box-shadow: 0 8px 30px rgba(52, 152, 219, 0.2);
  transform: translateY(-8px);
  border-color: #3498db;
}

.card-image {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 200px;
  overflow: hidden;
  margin-bottom: 1rem;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.card:hover .card-image {
  transform: scale(1.05);
}

.card-image img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card-title {
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  word-wrap: break-word;
  font-size: 1.1rem;
  text-align: center;
}

.custom-title-size {
  font-size: 14px;
}

.content {
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  text-align: center;
}

.quantity-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin-bottom: 10px;
}

.quantity-input {
  width: 50px;
  text-align: center;
  margin: 0 10px;
  border-radius: 5px;
}

.quantity-btn {
  background-color: #303649;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.quantity-btn:hover {
  background-color: #cfcfcf;
}

.button.custom-add-to-cart-button {
  margin-top: 1rem;
  width: 100%;
  max-width: 250px;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: #ffffff;
  border: none;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button.custom-add-to-cart-button:hover {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
  transform: translateY(-2px);
}

.button.custom-add-to-cart-button:active {
  transform: translateY(0);
}

.button.custom-add-to-cart-button i {
  font-size: 1.1rem;
}

.custom-edit-button {
  color: rgb(107, 107, 107);
  border-color: #7e7e7e;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
}

.custom-edit-button:hover {
  background-color: #9e9e9e;
}

@media (max-width: 768px) {
  body {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .home {
    padding-left: 0px;
  }

  .custom-notification {
    margin: 0 auto;
    width: 90%;
    text-align: center;
  }

  .columns.is-multiline {
    justify-content: center;
  }

  .columns {
    width: 100%;
    margin-left: 0rem;
  }

  .column.is-half-mobile {
    max-width: 50%;
    display: flex;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
  }

  .filter-wrapper {
    margin-left: -15px;
  }

  .quantity-selector {
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .quantity-input {
    width: 40px;
    margin: 0 5px;
  }

  .quantity-btn {
    padding: 4px 8px;
  }

  .card {
    min-width: 120px;
    max-width: 100%;
    margin: 0 auto 15px;
    padding: 1.25rem;
  }

  .card-title {
    font-size: 0.875rem;
  }

  .button {
    font-size: 0.75rem;
    padding: 5px 10px;
  }

  .button.custom-add-to-cart-button {
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    margin-bottom: 5px;
  }

  .button.custom-add-to-cart-button i {
    margin-left: 5px;
    font-size: 0.875rem;
  }

  .content {
    font-size: 0.85rem;
  }
}

@media screen and (min-width: 1024px) {
  .column.is-one-third-desktop {
    flex: none;
    width: 25%;
  }
}

</style>
