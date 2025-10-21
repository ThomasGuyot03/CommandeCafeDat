<template>
  <div>
    <h1 class="title">Gestion des Commandes</h1>

    <table v-if="orders.length > 0" class="table">
      <thead>
        <tr>
          <th>Nom Utilisateur</th>
          <th>Email</th>
          <th>Société</th> <!-- ✅ Nouvelle colonne ajoutée -->
          <th>Adresse</th>
          <th>Produits</th>
          <th>Date</th>
          <th>BL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in paginatedOrders()" :key="order._id">
          <td>{{ order.user.name }}</td>
          <td>{{ order.user.email }}</td>
          <td>{{ order.user.company }}</td> <!-- ✅ Affichage de la société -->
          <td>{{ formatAddress(order.user.address) }}</td>
          <td>
            <ul>
              <li v-for="product in order.products" :key="product._id">
                {{ product.name }} - <strong>{{ product.quantity }}x</strong>
              </li>
            </ul>
          </td>
          <td>{{ formatDate(order.createdAt) }}</td>
          <td>
            <button @click="printBL(order)" class="button is-info">
              <i class="fas fa-print icon-space"></i> BL
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="loading-indicator">Chargement...</div>

    <div v-if="totalPages > 1" class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="button is-light"
      >
        Précédent
      </button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        class="button is-light"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],          
      currentPage: 1,      
      itemsPerPage: 10,    
      totalPages: 0        
    }
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await this.$http.get('/orders');
        console.log('Données reçues du serveur:', response.data); // 🛠 Vérification des données
        this.orders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage); // Calcul du nombre total de pages
        console.log('Données reçues du serveur:', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.orders.slice(start, end);
    },
    formatDate(date) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
    formatAddress(address) {
      if (!address) return ''; 
      return `${address.line}, ${address.zip_code} ${address.city}`; 
    },
    printBL(order) {
      console.log('Impression du BL pour la commande:', order);
      const printWindow = window;
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
              .logo { width: 150px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <img src="../images/1.png" alt="Logo de l'entreprise" class="logo" />        
            <h1>Bon de livraison</h1>
            <p><strong>Client:</strong> ${order.user.name}</p>
            <p><strong>Email:</strong> ${order.user.email}</p>
            <p><strong>Société:</strong> ${order.user.company}</p> <!-- ✅ Ajout dans le BL -->
            <p><strong>Adresse:</strong> ${this.formatAddress(order.user.address)}</p>
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
      printWindow.print();
    }
  },
  mounted() {
    this.fetchOrders(); 
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #1a1f2e;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.loading-indicator {
  text-align: center;
  font-size: 1.5rem;
  color: #6b7280;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.table th, .table td {
  padding: 15px 12px;
}

.table th {
  background-color: #f3f4f6;
  color: #374151;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.table td {
  background-color: #ffffff;
  color: #4b5563;
  font-size: 0.9rem;
  vertical-align: middle;
}

.table tr:nth-child(even) td {
  background-color: #f9fafb;
}

.table tr:hover td {
  background-color: #eef2f7;
  transition: background-color 0.3s;
}

.icon-space {
  margin-right: 6px;
}

/* Boutons */
.button.is-info {
  background: #3b82f6;
  color: #ffffff;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.2s ease;
}

.button.is-info:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

/* Pagination modernisée */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  gap: 12px;
}

.pagination span {
  font-size: 0.95rem;
  color: #374151;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .table {
    font-size: 0.85rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
  
  .table thead {
    display: none;
  }

  .table tr {
    display: block;
    margin-bottom: 20px;
    border-bottom: 2px solid #e5e7eb;
  }

  .table td {
    display: flex;
    justify-content: space-between;
    padding: 10px 8px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    position: relative;
  }

  .table td::before {
    content: attr(data-label);
    font-weight: 600;
    text-transform: capitalize;
    color: #6b7280;
    width: 50%;
    flex-shrink: 0;
  }

  .table td:last-child {
    text-align: right;
    border-bottom: 0;
  }

  .button.is-info {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
}

</style>
