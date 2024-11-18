<template>
  <div>
    <h1 class="title">Gestion des Produits</h1>

    <!-- Table des produits avec gestion du stock -->
    <table v-if="produits.length > 0" class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produit in produits" :key="produit._id">
          <td>{{ produit.name }}</td>
          <td>
            <input class="input is-small" type="number" v-model="produit.stock" />
          </td>
          <td>
            <button @click="mettreAJourStock(produit)" class="button is-info">
              <i class="fas fa-save icon-space"></i> Mettre à jour
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="loading-indicator">Chargement...</div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification' // Importation du système de toast

export default {
  setup() {
    const toast = useToast() // Initialisation du toast
    return { toast }
  },
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
    // Récupération des produits
    async getProducts(page = 1) {
      try {
        this.currentPage = page
        const response = await this.$http.get('/products', { params: { findAccount: this.$appConfig.findAccount } })
        this.produits = response.data.products
        this.loading = false
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error)
      }
    },
    // Mettre à jour le stock d'un produit avec le toast
    async mettreAJourStock(produit) {
      try {
        await this.$http.patch(`/products/update/${produit._id}`, { stock: produit.stock })
        // Affichage du toast de succès
        this.toast.success('Stock mis à jour avec succès !', {
          position: 'bottom-right', // Toast en bas à droite
          timeout: 5000, // Durée d'affichage du toast
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      } catch (error) {
        // Affichage du toast d'erreur
        this.toast.error('Erreur lors de la mise à jour du stock.', {
          position: 'bottom-right',
          timeout: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
        console.error('Erreur lors de la mise à jour du stock:', error)
      }
    }
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
    vertical-align: middle; /* Centrer verticalement */
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
    text-align: center; /* Centrer horizontalement */
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
.button.is-info {
  background-color: #303649; /* Couleur bleue */
  color: white;
}

.button.is-info:hover {
  background-color: #8d8d8d; /* Bleue plus foncée au hover */
}

.table td:last-child button {
  display: inline-block;
  margin: auto;
  vertical-align: middle; /* Centrage vertical */
}
</style>
