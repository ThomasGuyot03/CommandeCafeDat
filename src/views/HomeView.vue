<template>
  <div class="home">
    <h1 class="title">Produits</h1>
    <div class="notification is-light text-align-center">
      Commandez le meilleur de notre café ! {{ theme }}
    </div>
    <div v-if="loading" class="loading-indicator text-align-center">
      <i class="fas fa-spinner fa-spin"></i> Chargement en cours...
    </div>
    <div v-else>
      <div class="columns">
        <div class="column is-3">
          <h2 class="subtitlee">Filtres</h2>
          <FilterCollapse
            :initialFilters="filters"
            @filters-changed="getProducts(currentPage)"
          />
        </div>
        <div class="column">
          <div class="columns is-multiline">
            <div v-for="(product, index) in products" :key="index" class="column is-one-quarter is-4-tablet is-4-desktop is-3-widescreen">
              <div class="card text-align-center">
                <div class="card-image">
                  <a href='https://postimg.cc/NyZs9pQG' target='_blank'><img src='https://i.postimg.cc/NyZs9pQG/48-capsules-espresso-vivace-1.jpg' border='0' alt='48-capsules-espresso-vivace-1'/></a > 
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                    </div>
                    <div class="media-content">
                      <p class="is-1 no-wrap">{{ product.name }}</p>
                      <p class="subtitle is-6">{{ product.price }} €</p>
                    </div>
                  </div>
                  <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris.
                    <br>
                  </div>
                  <div class="columns reverse">
                    <div class="column">
                      <button 
                        class="button is-primary"
                        @click="addItem(product)"><i class="fas fa-shopping-basket"></i></button>
                      <button 
                        v-if="getUser && getUser.isAdmin" 
                        class="button is-warning"
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
      service:'products',
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
        price: product.price,
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
        const result = await this.$http.get('/products', { params: {accountId:this.$appConfig.accountId} })
        // const result = await this.$http.get(`/products/${this.$appConfig.accountId}`)
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
/* ... styles existants ... */
</style>
