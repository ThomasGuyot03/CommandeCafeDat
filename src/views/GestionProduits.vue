<template>
  <div class="container">
    <h1 class="title">Gestion des Produits</h1>

    <!-- Table des produits avec gestion du stock -->
    <table class="table is-striped is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produit in produits" :key="produit._id">
          <td>{{ produit.name }}</td>
          <td>{{ produit.price }} €</td>
          <td>
            <input class="input is-small" type="number" v-model="produit.stock" />
          </td>
          <td>
            <button @click="mettreAJourStock(produit)" class="button is-primary is-small">Mettre à jour</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      produits: [], // Liste des produits
      loading: true,
      currentPage: 1,
      itemsLimit: 10
    }
  },
  mounted() {
    this.getProducts() // Récupérer les produits dès que la vue est montée
  },
  methods: {
    // Récupération des produits (similaire à la vue Home)
    async getProducts(page = 1) {
      try {
        this.currentPage = page
        // const params = { page: this.currentPage, limit: this.itemsLimit }
        const response = await axios.get('/products', { params: { accountId: this.$appConfig.accountId } })
        this.produits = response.data.products
        this.loading = false
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error)
      }
    },
    // Mettre à jour le stock d'un produit
    async mettreAJourStock(produit) {
      try {
        await axios.patch(`/products/update/${produit._id}`, { stock: produit.stock })
        alert('Stock mis à jour avec succès !')
      } catch (error) {
        console.error('Erreur lors de la mise à jour du stock:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.table th, .table td {
  text-align: center;
}

.input[type="number"] {
  max-width: 80px;
  margin: 0 auto;
}
</style>
