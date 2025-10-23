<template>
  <div>
    <h1 class="title">Gestion des Commandes</h1>

    <table v-if="orders.length > 0" class="table">
      <thead>
        <tr>
          <th>Nom Utilisateur</th>
          <th>Email</th>
          <th>Société</th>
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
          <td>{{ order.user.company }}</td>
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
        console.log('Données reçues du serveur:', response.data);
        this.orders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
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
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Bon de livraison - ${order.user.name}</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              @page {
                size: A4;
                margin: 0;
              }

              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                padding: 30px;
                color: #2c3e50;
                line-height: 1.6;
              }

              .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
              }

              .header {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                padding: 40px;
                position: relative;
                overflow: hidden;
              }

              .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 6px;
                background: linear-gradient(90deg, #3498db, #2ecc71, #3498db);
              }

              .logo-section {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 30px;
              }

              .logo {
                max-width: 180px;
                height: auto;
                filter: brightness(0) invert(1);
              }

              .company-info {
                text-align: right;
                color: #ecf0f1;
                font-size: 0.9rem;
              }

              .company-info h2 {
                font-size: 1.5rem;
                margin-bottom: 10px;
                font-weight: 700;
                color: white;
              }

              .company-info p {
                margin: 5px 0;
                opacity: 0.9;
              }

              .document-title {
                text-align: center;
                color: white;
                font-size: 2rem;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-top: 20px;
              }

              .content {
                padding: 40px;
              }

              .info-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                margin-bottom: 40px;
              }

              .info-box {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 25px;
                border-radius: 12px;
                border-left: 5px solid #3498db;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
              }

              .info-box h3 {
                color: #2c3e50;
                font-size: 1.1rem;
                margin-bottom: 15px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                display: flex;
                align-items: center;
              }

              .info-box h3::before {
                content: '';
                display: inline-block;
                width: 8px;
                height: 8px;
                background: #3498db;
                border-radius: 50%;
                margin-right: 10px;
              }

              .info-box p {
                margin: 8px 0;
                color: #495057;
                font-size: 0.95rem;
              }

              .info-box strong {
                color: #2c3e50;
                font-weight: 600;
              }

              .products-section {
                margin-top: 40px;
              }

              .section-title {
                font-size: 1.3rem;
                color: #2c3e50;
                font-weight: 700;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 3px solid #3498db;
                text-transform: uppercase;
                letter-spacing: 1px;
              }

              .products-table {
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
                margin-top: 20px;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
              }

              .products-table thead {
                background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
              }

              .products-table th {
                padding: 18px 15px;
                text-align: left;
                color: white;
                font-weight: 700;
                font-size: 0.95rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }

              .products-table tbody tr {
                background: white;
                transition: all 0.3s ease;
              }

              .products-table tbody tr:nth-child(even) {
                background: #f8f9fa;
              }

              .products-table tbody tr:hover {
                background: #e3f2fd;
              }

              .products-table td {
                padding: 16px 15px;
                border-bottom: 1px solid #dee2e6;
                color: #495057;
                font-size: 0.95rem;
              }

              .products-table td:last-child {
                text-align: center;
                font-weight: 700;
                color: #2c3e50;
              }

              .quantity-badge {
                background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
                color: white;
                padding: 6px 14px;
                border-radius: 20px;
                font-weight: 700;
                display: inline-block;
                box-shadow: 0 2px 8px rgba(46, 204, 113, 0.3);
              }

              .footer {
                margin-top: 50px;
                padding-top: 30px;
                border-top: 2px solid #e9ecef;
                text-align: center;
              }

              .footer-info {
                display: flex;
                justify-content: space-around;
                margin-bottom: 20px;
                padding: 20px;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border-radius: 12px;
              }

              .footer-box {
                text-align: center;
              }

              .footer-box strong {
                display: block;
                color: #2c3e50;
                font-size: 0.85rem;
                text-transform: uppercase;
                margin-bottom: 5px;
              }

              .footer-box span {
                color: #495057;
                font-size: 1rem;
                font-weight: 600;
              }

              .signature-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 40px;
                margin-top: 50px;
                padding-top: 30px;
              }

              .signature-box {
                text-align: center;
                padding: 20px;
                border: 2px dashed #3498db;
                border-radius: 12px;
                background: #f8f9fa;
              }

              .signature-box p {
                color: #495057;
                font-size: 0.9rem;
                margin-bottom: 60px;
                font-weight: 600;
              }

              .signature-line {
                border-top: 2px solid #2c3e50;
                margin: 0 auto;
                width: 60%;
                padding-top: 10px;
                color: #7f8c8d;
                font-size: 0.85rem;
              }

              .thank-you {
                text-align: center;
                margin-top: 40px;
                padding: 25px;
                background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
                color: white;
                border-radius: 12px;
                font-size: 1.1rem;
                font-weight: 600;
                letter-spacing: 0.5px;
              }

              @media print {
                body {
                  background: white;
                  padding: 0;
                }

                .container {
                  box-shadow: none;
                  border-radius: 0;
                }

                .products-table tbody tr:hover {
                  background: inherit;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo-section">
                  <div>
                    <img src="../images/1.png" alt="Logo" class="logo" onerror="this.style.display='none'" />
                  </div>
                  <div class="company-info">
                    <h2>DAT Développement</h2>
                    <p>Solutions café innovantes</p>
                    <p>contact@dat-dev.fr</p>
                    <p>05.34.48.00.59</p>
                  </div>
                </div>
                <h1 class="document-title">Bon de Livraison</h1>
              </div>

              <div class="content">
                <div class="info-section">
                  <div class="info-box">
                    <h3>Informations Client</h3>
                    <p><strong>Nom :</strong> ${order.user.name}</p>
                    <p><strong>Email :</strong> ${order.user.email}</p>
                    <p><strong>Société :</strong> ${order.user.company || 'Non renseignée'}</p>
                    <p><strong>Adresse :</strong> ${this.formatAddress(order.user.address)}</p>
                  </div>

                  <div class="info-box">
                    <h3>Informations Commande</h3>
                    <p><strong>Date :</strong> ${this.formatDate(order.createdAt)}</p>
                    <p><strong>N° Commande :</strong> ${order._id || 'N/A'}</p>
                    <p><strong>Articles :</strong> ${order.products.length}</p>
                    <p><strong>Quantité totale :</strong> ${order.products.reduce((sum, p) => sum + p.quantity, 0)}</p>
                  </div>
                </div>

                <div class="products-section">
                  <h2 class="section-title">Détail des Produits</h2>
                  <table class="products-table">
                    <thead>
                      <tr>
                        <th>Produit</th>
                        <th>Description</th>
                        <th>Quantité</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${order.products.map(product => `
                        <tr>
                          <td><strong>${product.name}</strong></td>
                          <td>${product.description || 'Aucune description'}</td>
                          <td><span class="quantity-badge">${product.quantity}x</span></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>

                <div class="footer">
                  <div class="footer-info">
                    <div class="footer-box">
                      <strong>Articles</strong>
                      <span>${order.products.length}</span>
                    </div>
                    <div class="footer-box">
                      <strong>Quantité Totale</strong>
                      <span>${order.products.reduce((sum, p) => sum + p.quantity, 0)}</span>
                    </div>
                    <div class="footer-box">
                      <strong>Statut</strong>
                      <span style="color: #2ecc71;">✓ En cours</span>
                    </div>
                  </div>

                  <div class="signature-section">
                    <div class="signature-box">
                      <p>Signature du livreur</p>
                      <div class="signature-line">Date et signature</div>
                    </div>
                    <div class="signature-box">
                      <p>Signature du client</p>
                      <div class="signature-line">Date et signature</div>
                    </div>
                  </div>

                  <div class="thank-you">
                    Merci pour votre confiance !
                  </div>
                </div>
              </div>
            </div>
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
