<template>
  <div class="home">
    <!-- Titre de la page -->
    <h1 class="title">Panier</h1>

    <!-- Notification -->
    <div class="notification is-light has-text-centered">
      Commandez le meilleur de notre café ! 
    </div>

    <!-- Section Panier -->
    <section class="section">
      <div v-if="getCart.products.length > 0" class="container">
        <!-- Table des produits dans le panier -->
        <div class="table-container">
          <table class="table is-striped is-fullwidth">
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
                  <button class="button is-danger is-small" @click="removeFromCart(product)">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Bouton de commande -->
        <div class="content has-text-right">
          <button class="button is-success is-large" @click="submitOrder">Commander</button>
        </div>
      </div>

      <!-- Message si le panier est vide -->
      <div v-else>
        <p class="title">Panier vide</p>
      </div>
    </section>

    <!-- Section Produits Suggérés -->
    <section class="section">
      <h2 class="title has-text-centered">Produits Suggérés</h2>
      <div class="columns is-multiline is-variable is-2">
        <!-- Boucle sur les produits suggérés -->
        <div
          v-for="(product, index) in suggestedProducts"
          :key="index"
          class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop"
        >
          <div class="card product-card">
            <div class="card-image">
              <a href="#" target="_blank">
                <img :src="product.picture || defaultImage" border="0" alt="Image du produit" />
              </a>
            </div>
            <div class="card-content has-text-centered">
              <p class="card-title is-size-5">{{ product.name }}</p>
              <p class="content">{{ product.description }}</p>
              <button class="button is-primary is-fullwidth" @click="addItem(product)">
                <i class="fas fa-shopping-basket"></i> Ajouter au panier
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
      defaultImage: 'https://example.com/default-image.jpg', // Remplace par ton image par défaut
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
        const response = await this.$http.get('/products', { params: { accountId: this.$appConfig.accountId } });
        this.allProducts = response.data.products;
        this.getRandomProducts();  // Appel de getRandomProducts après avoir récupéré les produits
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    },

    getRandomProducts() {
      const shuffled = this.allProducts.sort(() => 0.5 - Math.random());
      this.suggestedProducts = shuffled.slice(0, 3); // Récupération de trois produits aléatoires
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
        const response = await this.$http.post('/orders/create', params);
        if (response.status === 200) {
          this.showToast('success', 'Commande réussie');
          this.$router.push('/');
        }
      } catch (error) {
        this.showToast('error', 'Erreur lors de la commande');
      }
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
/* Global button style */
.button {
  background-color: #00d1b2;
  border-color: #00d1b2;
  color: white;
  margin-top: 1.5rem;
}

/* Adjust table style and responsiveness */
.table-container {
  margin-top: 2rem;
}
.table th,
.table td {
  text-align: center;
  vertical-align: middle;
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

/* Espace autour des cartes des produits suggérés */
.product-card {
  margin: 10px;
}

/* Responsive adjustments */
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
  .card {
    margin-top: 1rem;
  }
}
</style>

