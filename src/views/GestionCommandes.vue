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
          <th>BL</th>
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
          <!-- Ajouter le bouton d'impression dans chaque ligne -->
          <td>
            <button @click="printBL(order)" class="button is-info">
              <i class="fas fa-print icon-space"></i>  BL
            </button>
          </td>

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
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
    // Méthode pour gérer l'impression du bon de livraison
    printBL(order) {
  console.log('Impression du BL pour la commande:', order);

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Bon de livraison</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          table, th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f2f2f2; }
          .logo { width: 150px; margin-bottom: 20px; } /* Ajuste la taille du logo */
        </style>
      </head>
      <body>
        <img src="../images/1.png" alt="Logo de l'entreprise" class="logo" />        
        <h1>Bon de livraison</h1>
        <p><strong>Client:</strong> ${order.user.name}</p>
        <p><strong>Email:</strong> ${order.user.email}</p>
        <p><strong>Adresse:</strong> ${order.user.address}</p>
        <p><strong>Date de commande:</strong> ${this.formatDate(order.createdAt)}</p>
        <h2>Produits commandés</h2>
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            ${order.products.map(product => `
              <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
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
  font-size: 1.5rem;
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
  margin-left: 50px; /* Décale le tableau vers la droite */
  margin-right: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.icon-space {
  margin-right: 8px; /* Ajoute un espace de 8px entre l'icône et le texte */
}


/* Responsivité : adaptation aux petits écrans */
@media screen and (max-width: 768px) {
  .table {
    font-size: 0.9rem;
    width: 100%;
    margin: 10px 0;
  }
  
  .table thead {
    display: none;
  }

  .table tr {
    display: block;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }

  .table td {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    text-align: left;
    font-size: 0.9rem;
    border: none;
    border-bottom: 1px solid #ddd;
    position: relative;
  }

  .table td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    font-weight: bold;
    text-transform: capitalize;
    color: #555;
  }

  .table td:last-child {
    text-align: right;
    border-bottom: 0;
  }
}

/* Styles généraux */
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

/* Boutons */
.button.is-primary {
  background-color: #3273dc; /* Couleur bleue */
  color: white;
  border-radius: 5%;
}

.button.is-primary:hover {
  background-color: #276cda; /* Bleue plus foncée au hover */
}
</style>
