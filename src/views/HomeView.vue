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
            v-for="(product, index) in products"
            :key="index"
            class="column is-one-quarter-desktop is-one-third-tablet is-half-mobile"
          >
            <div class="card text-align-center">
              <div class="card-image">
                <a href="" target="_blank">
                  <img :src="product.picture" border="0" alt="product" />
                </a>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="card-title no-wrap is-size-6 custom-title-size">
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
                      Ajoutez au <i class="fas fa-shopping-basket"></i>
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
  },
};
</script>

<style>
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
}

.quantity-btn {
  background-color: #4f4f4f;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
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
  min-width: 220px;
  max-width: 100%;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card:hover {
  transform: translateY(-15px);
}

.card-image img {
  border-radius: 8px;
  max-width: 100%;
}

.card-content {
  padding: 15px;
}

.columns.is-multiline {
  display: flex;
  justify-content: center;
}

.notification {
  background-color: #ffe0b2;
  border-radius: 8px;
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
  background-color: #4f4f4f;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px
}

.button.custom-add-to-cart-button:hover {
  background-color: #cfcfcf;
}

.custom-edit-button {
  background-color: #575757;
  color: rgb(107, 107, 107);
  border-color: #7e7e7e;
}

.custom-edit-button:hover {
  background-color: #9e9e9e;
}

@media (max-width: 768px) {
  .columns {
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 0 !important;
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

  .column.is-half-mobile {
    flex: 0 0 45%;
    max-width: 45%;
  }

  .card {
    min-width: 150px;
    margin-bottom: 20px;
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
</style>
