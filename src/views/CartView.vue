<template>
  <div class="home">
    <h1 class="title">Panier</h1>

    <div class="notification is-dark text-align-center">
      Commandez le meilleur de notre café ! 
    </div>

    <section class="section">
      <div v-if="getCart.products.length > 0" class="container">
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

        <div class="content has-text-right">
          <button class="button is-success is-large" @click="submitOrder">Commander</button>
        </div>
      </div>
 
      <div v-else>
        <p class="title">Panier vide</p>
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
          params: { page: 1, category: ''}
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
        const response = await this.$http.post('/orders/create', params);
        console.log('Response:', response); 
        if (response.status === 200) {
          this.showToast('success', 'Commande réussie');
          this.emptyCart(); 
          await this.$nextTick(); 
          this.$router.push('/'); 
        }
      } catch (error) {
        this.showToast('error', 'Erreur lors de la commande');
      }
    },

    emptyCart() {
      console.log('Emptying cart...'); // Vérifiez si cette ligne est exécutée
      this.$store.commit('updateToCart', { obj: [], source: 'products' }); // Met à jour le panier avec un tableau vide
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
.button {
  background-color: #303649;
  border-color: #ffffff;
  color: white;
  margin-top: 1.5rem;
}

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

.product-card {
  margin: 10px;
}

.card {
  display: flex; /* Pour permettre l'utilisation de flexbox dans la carte */
  flex-direction: column; /* Aligne les éléments verticalement */
  justify-content: space-between; /* Utilise tout l'espace disponible */
}

.card-image {
  display: flex;
  justify-content: center; /* Centre l'image horizontalement */
  align-items: center; /* Centre l'image verticalement */
  height: 200px; /* Ajuste cette hauteur selon tes besoins */
  overflow: hidden; /* Cache les débordements */
}

.card-image img {
  max-width: 100%; /* Limite la largeur à 100% du conteneur */
  max-height: 100%; /* Limite la hauteur à 100% du conteneur */
  object-fit: contain; /* Garde les proportions sans couper l'image */
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
  .card {
    min-width: 170px; /* Réduit la largeur minimale */
    max-width: 90%; /* Limite la largeur à 90% pour éviter qu'elles ne dépassent */
    margin: 0 5% 15px 5%; /* Centre la carte et ajoute de l'espace en bas */
  }
}
</style>
