<template>
  <div class="home page-padding">
    <h1 class="title">Accueil</h1>
    <div class="notification is-light text-align-center">
      Commandez le meilleur de notre café !
    </div>

    <div class="filter-wrapper">
      <FilterCollapse
        :initialFilters="filters"
        @filters-changed="getProducts(currentPage)"
      />
    </div>

    <div v-if="loading" class="loading-indicator text-align-center">
      <i class="fas fa-spinner fa-spin"></i> Chargement en cours...
    </div>
    <div v-else>
      <div class="columns">
        <div class="columns is-multiline">
          <div
            v-for="(product, index) in products.slice(0, itemsLimit)"
            :key="index"
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
        :current-page="currentPage"
        :total-pages="totalPages"
        :service-props="service"
        @update-page="updatePage"
      ></PaginationComponent>
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
import { useToast } from "vue-toastification"; // Importez le toast ici

export default {
  components: {
    EditProductModal,
  },
  data() {
    return {
      loading: true,
      service: "products",
      itemsLimit: 10,
      products: null,
      currentPage: 1,
      totalPages: 10,
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

      // Utilisation de la méthode showToast du mixin
      this.showToast('success', `Le produit "${product.name}" a été ajouté au panier.`);
    },
    async getProducts(page) {
      if (page) {
        this.currentPage = page;
      } else {
        this.currentPage = 1;
      }
      try {
        const params = {
          page: this.currentPage,
          limit: this.itemsLimit,
        };

        for (const filterKey in this.filters) {
          if (Object.prototype.hasOwnProperty.call(this.filters, filterKey)) {
            const filterValue = this.filters[filterKey];
            if (filterValue !== null && filterValue !== "") {
              params[filterKey] = filterValue;
            } else {
              delete params[filterKey];
            }
          }
        }
        const result = await this.$http.get("/products", {
          params: { accountId: this.$appConfig.accountId },
        });
        const { products, totalItems, totalPages } = result.data;
        this.products = products;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        
        console.log(this.totalPages);

        this.quantities = products.map(() => 1);

        this.loading = false;
      } catch (error) {
        console.error(error);
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
      const toast = useToast(); // Obtenez l'instance du toast
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
    }
  },
};
</script>


<style>
.home {
  padding-left: 160px; /* Ajoutez ce padding */
}

.quantity-selector {
  display: flex;
  justify-content: center;
  align-items: center;
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

.page-padding {
  padding-top: 50px;
}

.custom-title-size {
  font-size: 14px;
}

.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  border: grey 1px solid;
  min-width: 140px;
  max-width: 220px;
  width: 100%;
  margin: 8px;
}

.card-content {
  padding: 8px;
}

.card-title {
  font-size: 3.25rem;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card:hover {
  transform: translateY(-15px);
}

.card-image img {
  border-radius: 8px;
  max-width: 80%;
}

.columns.is-multiline {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;
}

.notification {
  background-color: #ffe0b2;
  border-radius: 10px;
  color: #bdbdbd;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 1rem;
}

.button.custom-add-to-cart-button {
  background-color: #303649;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.button.custom-add-to-cart-button:hover {
  background-color: #cfcfcf;
}

.custom-edit-button {
  color: rgb(107, 107, 107);
  border-color: #7e7e7e;
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

  .columns.is-multiline {
    justify-content: center; /* Centre les colonnes */
  }

  .columns {
    width: 100%;
   margin-left: 0rem;
  }

  .column.is-half-mobile {
    max-width: 50%;
    display: flex;
    justify-content: center; /* Centre chaque colonne pour éviter qu'elles collent à gauche */
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
    min-width: 120px; /* Réduit la largeur minimale */
    max-width: 100%; /* Limite la largeur à 100% pour bien s'adapter */
    margin: 0 auto 15px; /* Ajoute une marge entre les cartes et les centre */
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
