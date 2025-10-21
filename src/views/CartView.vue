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
            // this.sendOrderEmail();
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
.home {
  min-height: 100vh;
  padding-bottom: 4rem;
}

.title {
  margin-top: 2rem;
  padding-top: 2rem;
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: -0.5px;
}

.title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 2px;
}

.title-panier {
  margin-top: 4rem;
  color: #95a5a6;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section {
  padding: 2rem 1.5rem;
}

.table-card {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-radius: 20px;
  padding: 2.5rem;
  margin-top: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  color: #ffffff;
  position: relative;
  margin-bottom: 2rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.table-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #3498db, #2ecc71, #3498db);
  background-size: 200% 100%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 0%; }
}

.table-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.subtitle {
  font-size: 1.8rem;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.3px;
}

.table-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.table {
  width: 100%;
  color: #ffffff;
  border-collapse: separate;
  border-spacing: 0;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
  padding: 1.25rem 1rem;
  transition: all 0.3s ease;
}

.table th {
  background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  color: #000000;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 3px solid rgba(52, 152, 219, 0.3);
}

.table tbody tr {
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.table tbody tr:hover {
  background: rgba(52, 152, 219, 0.15);
  transform: scale(1.01);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

.table td {
  background: transparent;
  color: #000000;
  font-size: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.quantity-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.quantity-buttons .button {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-buttons .button:hover {
  background: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.5);
}

.quantity-buttons .button:active {
  transform: scale(0.95);
}

.quantity {
  font-weight: 700;
  font-size: 1.1rem;
  min-width: 30px;
  color: #000000;
}

.button.is-danger {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  border: none;
  color: #ffffff;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
}

.button.is-danger:hover {
  background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
  box-shadow: 0 4px 16px rgba(231, 76, 60, 0.5);
  transform: translateY(-2px);
}

.button.is-danger:active {
  transform: translateY(0);
}

.content.has-text-right {
  margin-top: 2rem;
  text-align: right;
}

.button.is-success {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #2c3e50;
  border: 2px solid #3498db;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
  position: relative;
  overflow: hidden;
}

.button.is-success::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  transform: translate(-50%, -50%);
  transition: width 0.5s ease, height 0.5s ease;
  z-index: 0;
}

.button.is-success:hover::before {
  width: 400px;
  height: 400px;
}

.button.is-success:hover {
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 6px 25px rgba(52, 152, 219, 0.4);
  transform: translateY(-3px);
}

.button.is-success span {
  position: relative;
  z-index: 1;
}

.button.is-success:active {
  transform: translateY(-1px);
}

.columns.is-multiline {
  margin-top: 1rem;
}

.column {
  padding: 0.75rem;
}

.section:last-of-type {
  margin-top: 2rem;
  padding-top: 0;
}

.section:last-of-type .title {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.card.product-card {
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
}

.card.product-card::before {
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

.card.product-card:hover::before {
  transform: scaleX(1);
}

.card.product-card:hover {
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

.card.product-card:hover .card-image {
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
}

.card-content .content {
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.button.is-primary {
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

.button.is-primary:hover {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
  transform: translateY(-2px);
}

.button.is-primary:active {
  transform: translateY(0);
}

.button.is-primary i {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .home {
    padding-bottom: 2rem;
  }

  .title {
    font-size: 2rem;
    padding-top: 1rem;
  }

  .table-card {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .table-container {
    overflow-x: auto;
    border-radius: 8px;
  }

  .table {
    white-space: nowrap;
  }

  .table th,
  .table td {
    padding: 1rem 0.75rem;
    font-size: 0.9rem;
  }

  .button {
    width: 100%;
  }

  .subtitle {
    font-size: 1.5rem;
  }

  .section:last-of-type {
    margin-top: 1rem;
  }

  .section:last-of-type .title {
    font-size: 1.75rem;
  }

  .button.is-primary {
    max-width: 100%;
    font-size: 0.95rem;
    padding: 0.75rem 1.25rem;
  }

  .card.product-card {
    padding: 1.25rem;
  }

  .quantity-buttons .button {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.75rem;
  }

  .table-card {
    padding: 1.25rem;
  }

  .button.is-success {
    font-size: 1rem;
    padding: 0.85rem 2rem;
  }

  .card-title {
    font-size: 1rem;
  }
}
</style>
