<template>
  <div class="home page-padding">
    <h1 class="title">Accueil</h1>
    <div class="notification is-light text-align-center">
      Commandez le meilleur de notre café ! 
    </div>

     <!-- Filtres au-dessus des produits -->
     <FilterCollapse 
      :initialFilters="filters" 
      @filters-changed="getProducts(currentPage)" 
    />

    <div v-if="loading" class="loading-indicator text-align-center">
      <i class="fas fa-spinner fa-spin"></i> Chargement en cours...
    </div>
    <div v-else>
      <div class="columns">
        <div class="columns is-multiline ">
          <div v-for="(product, index) in products" 
       :key="index" 
       class="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <div class="card text-align-center">
      <div class="card-image">
        <a href='' target='_blank'><img :src="product.picture" border='0' alt='product'/></a>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="card-title no-wrap is-size-6 custom-title-size">{{ product.name }}</p>
          </div>
        </div>
        <div class="content">
          {{ product.description }}
          <br>
        </div>
        <div class="columns reverse">
          <div class="column">
            <button 
              class="button custom-add-to-cart-button" 
              @click="addItem(product)"><i class="fas fa-shopping-basket"></i></button>
            <button
              v-if="getUser && getUser.isAdmin"
              class="button custom-edit-button"
              @click="openEditModal(product)">
              <i class="fas fa-edit"></i> Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
      <PaginationComponent
        :current-page="currentPage"
        :total-pages="totalPages"
        :service-props="service"
        @update-page="updatePage"
      ></PaginationComponent>
    </div>
    
    <!-- Intégration de la modale -->
    <EditProductModal
      :is-visible="isEditModalVisible"
      :product="selectedProduct"
      @close="isEditModalVisible = false"
      @product-updated="getProducts(currentPage)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditProductModal from './EditProductModal.vue'

export default {
  components: {
    EditProductModal
  },
  data() {
    return {
      loading: true,
      service: 'products',
      itemsLimit: 10,
      products: null,
      currentPage: 1,
      totalPages: 10,
      filters: {
        category: '',
        sortByPrice: ''
      },
      isEditModalVisible: false,
      selectedProduct: null
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getCart']),
    isAdmin() {
      const user = this.getUser
      console.log('User:', user)
      return user && user.role === 'admin'
    },
    theme() {
      return this.$appConfig.theme
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    addItem(product) {
      const itemData = {
        id: product._id,
        name: product.name,
        quantity: 1,
      }
      let products = this.getCart.products
      let productAlreadyInCart = products.find(i => i.id === product._id)
      if (productAlreadyInCart) {
        productAlreadyInCart.quantity++
      } else {
        products.push(itemData)
      }
      this.$store.commit('updateToCart', { obj: products, source: 'products' })
    },
    async getProducts(page) {
      if (page) {
        this.currentPage = page
      } else {
        this.currentPage = 1
      }
      try {
        const params = {
          page: this.currentPage,
          limit: this.itemsLimit
        }

        for (const filterKey in this.filters) {
          if (Object.prototype.hasOwnProperty.call(this.filters, filterKey)) {
            const filterValue = this.filters[filterKey]
            if (filterValue !== null && filterValue !== '') {
              params[filterKey] = filterValue
            } else {
              delete params[filterKey]
            }
          }
        }
        const result = await this.$http.get('/products', { params: { accountId: this.$appConfig.accountId } })
        console.log(result)
        const { products, totalItems, totalPages } = result.data
        this.products = products
        this.totalItems = totalItems
        this.totalPages = totalPages
        this.loading = false
      } catch (error) {
        console.error(error)
      }
    },
    updatePage(page) {
      this.getProducts(page)
    },
    openEditModal(product) {
      console.log('Opening edit modal for:', product)
      this.selectedProduct = { ...product }
      this.isEditModalVisible = true
    }
  }
}
</script>

<style>
.page-padding {
  padding-top: 50px; 
}

.custom-title-size {
  font-size: 14px;
}

.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  border: grey 1px solid;
  min-width: 220px;
  max-width: 100%; 
}

.card-title {
  font-size: 1.25rem; 
  font-weight: bold; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card:hover {
  transform: translateY(-15px);
}

.card-image img {
  border-radius: 8px; /* Applique un petit arrondi aux coins de l'image */
  max-width: 100%;
}

.card-content {
  padding: 15px;
}

/* Colonnes des cartes produits */
.columns.is-multiline {
  display: flex;
  justify-content: center; /* Centre les cartes horizontalement */
  flex-wrap: wrap; /* Permet aux cartes de se renvoyer à la ligne */
  gap: 0px; /* Supprime tout espacement par défaut entre les cartes */
  margin: 0; /* Supprime toute marge externe */
  padding: 0; /* Supprime tout padding externe */
}

/* Colonnes sur mobile */
.column.is-half-mobile {
  flex: 0 0 50%; /* Chaque carte prend 50% de la largeur sur mobile */
  max-width: 100%; /* Assure que les cartes prennent toute la largeur disponible */
  padding-left: 0; /* Supprime le padding à gauche des colonnes */
  padding-right: 0; /* Supprime le padding à droite des colonnes */
}

/* Responsive design */
@media (max-width: 768px) {
  .column.is-half-mobile {
    max-width: 40%; /* Assure que les cartes prennent bien 50% de la largeur */
  }

  .card {
    min-width: 100%; /* Assure que chaque carte utilise bien toute la largeur disponible */
    margin: 0 auto; /* Centre chaque carte horizontalement */
  }

  .card-title {
    font-size: 1rem; /* Réduction de la taille du texte pour mobile */
  }

  .columns.is-multiline {
    gap: 10px; /* Réduction de l'espacement entre les cartes sur mobile */
    justify-content: center; /* Centre les cartes */
  }
}

.notification {
  background-color: #ffe0b2;
  border-radius: 8px;
  color: #bdbdbd;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 1rem;
}

.button.custom-add-to-cart-button {
  background-color: #4f4f4f; 
  color: white;
  border: none;
}

.button.custom-add-to-cart-button:hover {
  background-color: #cfcfcf;
}

.custom-edit-button {
  background-color: #575757; 
  color: rgb(107, 107, 107);
  border-color: #7e7e7e;
}

.custom-edit-button:hover {
  background-color: #9e9e9e;
}

</style>
