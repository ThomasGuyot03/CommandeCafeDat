<template>
  <div class="home">
    <h1 class="title">Panier</h1>
    <section class="section">
      <div v-if="getCart.products.length > 0" class="container">
        <div class="table-card">
          <div class="table-header">
            <h2 class="subtitle">Détails du Panier</h2>
          </div>
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in getCart.products" :key="index">
                  <td>{{ product.name }}</td>
                  <td class="quantity-buttons">
                    <button class="button is-small" @click="decrementQuantity(product)">-</button>
                    <span class="quantity">{{ product.quantity }}</span>
                    <button class="button is-small" @click="incrementQuantity(product)">+</button>
                  </td>
                  <td>
                    <button class="button is-danger is-small remove-button" @click="removeFromCart(product)">
                      <span class="is-hidden-mobile">Supprimer</span>
                      <i class="fas fa-trash is-hidden-tablet"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="content has-text-right">
          <button class="button is-success is-large" @click="submitOrder">Commander</button>
        </div>
      </div>
      <div v-else>
        <p class="title-panier">Panier vide</p>
      </div>
    </section>

    <section class="section">
      <h2 class="title has-text-centered">Produits Suggérés</h2>
      <div class="columns is-multiline is-variable is-2">
        <div
          v-for="(product, index) in suggestedProducts"
          :key="index"
          class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop"
        >
          <div class="card product-card">
            <div class="card-image">
              <a href="#" target="_blank">
                <img :src="product.picture || defaultImage" alt="Image du produit" />
              </a>
            </div>
            <div class="card-content has-text-centered">
              <p class="card-title is-size-5">{{ product.name }}</p>
              <p class="content">{{ product.description }}</p>
              <button class="button is-primary is-fullwidth" @click="addItem(product)">
                Ajouter au &nbsp;<i class="fas fa-shopping-basket"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      customer: null,
      allProducts: [],
      suggestedProducts: [],
      defaultImage: 'https://example.com/default-image.jpg',
    };
  },
  computed: {
    ...mapGetters(['getCart', 'getUser']),
    total() {
      return this.getCart.products.reduce((total, product) => total + product.quantity, 0);
    },
  },
  async mounted() {
    await this.checkProductsInCart();
    await this.init();
    await this.getAllProducts();
  },
  methods: {
    async getAllProducts() {
      try {
        const response = await this.$http.get('/products', {
          params: { page: 1, category: '' }
        });
        this.allProducts = response.data.products || [];
        console.log('Produits récupérés:', this.allProducts);

        if (this.allProducts.length > 0) {
          this.getRandomProducts();
        } else {
          console.warn('Pas de produits disponibles pour les suggestions');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        this.showToast('error', 'Impossible de récupérer les produits suggérés.');
      }
    },

    getRandomProducts() {
      const shuffled = this.allProducts.sort(() => 0.5 - Math.random());
      this.suggestedProducts = shuffled.slice(0, 4);
    },

    async init() {
      await this.getUserData();
    },

    async submitOrder() {
        const params = {
          user: this.customer,
          cart: this.getCart,
        };

        try {
          const { data } = await this.$http.post('/orders/create', params);
          console.log('Response:', data);

          if (data.success) {
            this.showToast('success', 'Commande réussie');
            this.sendOrderEmail();
            this.emptyCart();
            await this.$nextTick();
            this.$router.push('/');
          } else {
            this.showToast('error', 'La commande a échoué côté serveur.');
          }
        } catch (error) {
          console.error('Erreur Axios:', error.response || error);
          this.showToast('error', 'Erreur lors de la commande.');
        }
      },

    emptyCart() {
      console.log('Emptying cart...');
      this.$store.commit('updateToCart', { obj: [], source: 'products' });
    },

    async checkProductsInCart() {
      const response = await this.$http.post('/check-products', { cart: this.getCart });
      const products = response.data.products;
      this.$store.commit('updateToCart', { obj: products, source: 'products' });
    },

    incrementQuantity(currentProduct) {
      let products = this.getCart.products;
      let product = products.find((i) => i.id === currentProduct.id);
      if (product) {
        product.quantity++;
        this.$store.commit('updateToCart', { obj: products, source: 'products' });
      }
    },

    decrementQuantity(currentProduct) {
      let products = this.getCart.products;
      let product = products.find((i) => i.id === currentProduct.id);
      if (product && product.quantity > 1) {
        product.quantity--;
        this.$store.commit('updateToCart', { obj: products, source: 'products' });
      }
    },

    removeFromCart(currentProduct) {
      let products = this.getCart.products.filter((i) => i.id !== currentProduct.id);
      this.$store.commit('updateToCart', { obj: products, source: 'products' });
    },

    addItem(product) {
      let newProducts = this.getCart.products;
      let existingProduct = newProducts.find((i) => i.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        newProducts.push({ ...product, quantity: 1 });
      }
      this.$store.commit('updateToCart', { obj: newProducts, source: 'products' });
    },
  },
};
</script>


<style scoped>
/* Titre principal */
.title {
  margin-top: 2rem;
  color: #303649;
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
}

.title-panier {
  margin-top: 2rem;
  color: #303649;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.table-card {
  background-color: #303649;
  border-radius: 12px;
  padding: 2rem;
  margin-top: -2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  position: relative;
  margin-bottom: 1rem;
  text-align: center;
}

.table-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #00ffcc, #0077a6);
  border-radius: 12px 12px 0 0;
}

.table-header {
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

.table {
  width: 100%;
  color: #ffffff;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}

.table th {
  background-color: #535353;
  color: #d3d3d3;
  font-weight: bold;
}

.table td {
  background-color: #686868;
  color: #d3d3d3;
}

.quantity-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.quantity {
  margin: 0 0.5rem;
  font-weight: bold;
}

.button.is-danger {
  background-color: #ff3860;
  border-color: #ff3860;
  color: #ffffff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.button.is-danger:hover {
  background-color: #ff1c40;
  box-shadow: 0 4px 10px rgba(255, 56, 96, 0.5);
}

.button.is-success {
  background-color: #ffffff;
  color: #000000;
  border: 2px solid #d3d3d3;
  transition: all 0.3s ease-in-out;
  font-weight: bold;
}

.button.is-success:hover {
  background: linear-gradient(90deg, #00ffcc, #0077a6);
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 255, 204, 0.5);
  transform: translateY(-2px);
}

.columns.is-multiline {
  margin-top: -1rem;
}

.column {
  padding: 0.5rem;
}

.section:last-of-type {
  margin-top: -2rem;
  padding-top: 0;
}

.card.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  background-color: #f9f9f9;
}

.card-image {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 200px; 
  overflow: hidden; 
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
}

.card-title {
  font-weight: bold;
  color: #303649;
  margin-bottom: 0.5rem;
  word-wrap: break-word;
}

.button.is-primary {
  margin-top: 1rem;
  width: 100%; 
  max-width: 250px; 
  padding: 0.75rem 1rem; 
  font-size: 1rem; 
}

.button.is-primary i {
  margin-left: 0.5rem;
}

.button.is-primary {
  background-color: #ffffff;
  color: #000000;
  border: 2px solid #d3d3d3;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.button.is-primary:hover {
  background: linear-gradient(90deg, #00ffcc, #0077a6);
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 255, 204, 0.5);
  transform: translateY(-2px);
  cursor: pointer;
}

@media (max-width: 768px) {
  .table-container {
    overflow-x: auto;
  }

  .table {
    white-space: nowrap;
  }

  .button {
    width: 100%;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.5rem;
  }

  .section:last-of-type {
    margin-top: -1.5rem;
  }
  
  .button.is-primary {
    max-width: 100%; 
    font-size: 0.9rem; 
    padding: 0.5rem 0.75rem; 
  }
}

</style>
