<template>
  <div>
    <h1 class="title">Gestion des Commandes</h1>

    <table v-if="orders.length > 0" class="table">
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
                {{ product.name }} - <strong>{{ product.quantity }}x</strong>
              </li>
            </ul>
          </td>
          <td>{{ formatDate(order.createdAt) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else class="loading-indicator">Chargement...</div>
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
        this.orders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log('Données reçues du serveur:', response.data); 
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    }
  },
  mounted() {
    this.fetchOrders();
  }
}
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.loading-indicator {
  text-align: center;
  font-size: 1.5rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 5%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
  color: #555;
  font-weight: bold;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tr:hover {
  background-color: #eaeaea;
}
</style>
