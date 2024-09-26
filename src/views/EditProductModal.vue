<template>
    <div v-if="isVisible" class="modal is-active">
      <div class="modal-background" @click="close"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modifier le Produit</p>
          <button class="delete" aria-label="close" @click="close"></button>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="updateProduct">
            <div class="field">
              <label class="label">Nom</label>
              <div class="control">
                <input class="input" type="text" v-model="localProduct.name" required>
              </div>
            </div>
            <!-- <div class="field">
              <label class="label">Prix</label>
              <div class="control">
                <input class="input" type="number" v-model="localProduct.price" step="1" required>
              </div>
            </div> -->
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <input class="input" type="text" v-model="localProduct.description" required>
              </div>
            </div>
            <!-- Ajoutez plus de champs si nécessaire -->
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updateProduct">Enregistrer</button>
          <button class="button" @click="close">Annuler</button>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      product: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        // Créez une copie locale du produit
        localProduct: { ...this.product }
      }
    },
    watch: {
      // Met à jour la copie locale lorsque la prop change
      product: {
        handler(newProduct) {
          this.localProduct = { ...newProduct }
        },
        deep: true
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      async updateProduct() {
        try {
          const response = await this.$http.patch(`/products/update/${this.localProduct._id}`, this.localProduct)
          this.$emit('product-updated')
          this.close()
          if (response.status === 200) {
            this.showToast('success', 'Produit modifié')
            this.$router.push('/'); 
          }
        } catch (error) {
          this.showToast('error', 'Erreur')
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-card {
    width: 40%;
  }
  </style>
  