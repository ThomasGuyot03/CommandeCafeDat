<template>
    <div class="product-page">
      <h1>{{ product.name }}</h1>
      <img :src="product.image" alt="product.name" />
      <p>{{ product.description }}</p>
      <p>Prix: {{ product.price }} €</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: null
      };
    },
    mounted() {
      // Récupérer l'ID du produit depuis les paramètres de la route
      const productId = this.$route.params.id;
      
      // Appel à une API ou un service pour récupérer les détails du produit
      this.getProduct(productId);
    },
    methods: {
      async getProduct(productId) {
        try {
          const result = await this.$http.get(`/products/${productId}`);
          this.product = result.data.product;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  