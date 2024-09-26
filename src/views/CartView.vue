<template>
  <div class="home">
    <h1 class="title">Panier</h1>
    <div class="notification is-light text-align-center">
      Commandez le meilleur de notre café ! 
    </div>
    <section class="section">
      <div v-if="getCart.products.length > 0" class="container">
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
              <td>
                <button class="button is-small" @click="decrementQuantity(product)">-</button>
                {{ product.quantity }}
                <button class="button is-small" @click="incrementQuantity(product)">+</button>
              </td>
              <td><button class="button is-danger is-small" @click="removeFromCart(product)">Supprimer</button></td>
            </tr>
          </tbody>
        </table>
        <div class="content has-text-right">
          <button class="button is-success" @click="submitOrder">Commander</button>
        </div>
      </div>
      <div v-else>
        <p class="title">Panier vide</p>
      </div>
    </section>
    
    <section class="section">
      <h2 class="title">Produits Suggérés</h2>
      <div class="columns is-multiline">
        <div v-for="(product, index) in suggestedProducts" :key="index" class="column is-one-quarter is-4-tablet is-4-desktop is-3-widescreen">
          <div class="card text-align-center">
            <div class="card-image">
              <a href='https://postimg.cc/NyZs9pQG' target='_blank'><img src='https://i.postimg.cc/NyZs9pQG/48-capsules-espresso-vivace-1.jpg' border='0' alt='48-capsules-espresso-vivace-1'/></a > 
              </div>
            <div class="card-content">
              <p class="card-title no-wrap">{{ product.name }}</p>
              <div class="content">
                {{ product.description }}
                <br>
              </div>
              <div class="columns reverse">
                <div class="column">
                  <button class="button is-primary" @click="addItem(product)">
                    <i class="fas fa-shopping-basket"></i> Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      customer: null,
      allProducts: [],
      suggestedProducts: [],
      defaultImage: 'https://example.com/default-image.jpg' // Remplace par l'URL de ton image par défaut
    }
  },
  computed: {
    ...mapGetters(['getCart', 'getUser']),
    total() {
      return this.getCart.products.reduce((total, product) => total + product.quantity, 0)
    }
  },
  async mounted() {
    await this.checkProductsInCart();
    await this.init();
    await this.getAllProducts();
    this.getRandomProducts();
  },
  methods: {
    async getAllProducts() {
      try {
        const response = await this.$http.get('/products');
        this.allProducts = response.data.products;
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    },
    
    getRandomProducts() {
      const shuffled = this.allProducts.sort(() => 0.5 - Math.random());
      this.suggestedProducts = shuffled.slice(0, 3);
    },

    async init() {
      await this.getUserData();
    },
    async submitOrder() {
      const params = {
        user: this.customer,
        cart: this.getCart
      }
      try {
        const response = await this.$http.post('/orders/create', params);
        if (response.status === 200) {
          this.showToast('success', 'Commande réussie');
          this.$router.push('/');
        }
      } catch (error) {
        this.showToast('error', 'Erreur lors de l\'ajout du produit');
      }
    },
    async checkProductsInCart() {
      const response = await this.$http.post('/check-products', { cart: this.getCart });
      const products = response.data.products;
      this.$store.commit('updateToCart', { obj: products, source: 'products' });
    },
    incrementQuantity(currentProduct) {
      let products = this.getCart.products;
      let product = products.find(i => i.id === currentProduct.id);
      if (product) {
        product.quantity++;
        this.$store.commit('updateToCart', { obj: products, source: 'products' });
      }
    },
    decrementQuantity(currentProduct) {
      let products = this.getCart.products;
      let product = products.find(i => i.id === currentProduct.id);
      if (product && product.quantity > 1) {
        product.quantity--;
        this.$store.commit('updateToCart', { obj: products, source: 'products' });
      }
    },
    removeFromCart(currentProduct) {
      let products = this.getCart.products.filter(i => i.id !== currentProduct.id);
      this.$store.commit('updateToCart', { obj: products, source: 'products' });
    },
    addItem(product) {
      let newProducts = this.getCart.products;
      let existingProduct = newProducts.find(i => i.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        newProducts.push({ ...product, quantity: 1 });
      }
      this.$store.commit('updateToCart', { obj: newProducts, source: 'products' });
    }
  }
}
</script>


<style scoped>
.button {
  background-color: #00d1b2;
  border-color: #00d1b2;
  color: #f5f5f5;
  margin-top: 1.5rem;
}

.section {
  margin-top: -9rem; /* Ajuste cette valeur pour remonter ou descendre les cartes */
}

.card {
  margin-top: 1rem; /* Ajoute un espace entre les cartes si nécessaire */
}
</style>