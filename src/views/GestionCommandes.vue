<template>
  <div>
    <h1 class="title is-3 has-text-centered has-text-primary">Gestion des Commandes</h1>

    <table class="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th>Nom Utilisateur</th>
          <th>Email</th>
          <th>Adresse</th>
          <th>Produits</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.user.name }}</td>
          <td>{{ order.user.email }}</td>
          <td>{{ order.user.address }}</td>
          <td>
            <ul>
              <li v-for="product in order.products" :key="product._id">
                {{ product.name }} - {{ product.quantity }}x
              </li>
            </ul>
          </td>
          <td>{{ formatDate(order.createdAt) }}</td>
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
      orders: []
    }
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get('/orders'); 
        this.orders = response.data
        console.log('Données reçues du serveur:', response.data); 
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error)
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      return new Date(date).toLocaleDateString('fr-FR', options)
    }
  },
  mounted() {
    this.fetchOrders() 
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
