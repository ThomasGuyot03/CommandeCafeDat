<template>
  <div class="container">
    <h1 class="title">Ajouter un produit</h1>
    <form @submit.prevent="submitProduct" class="box">
      <!-- Titre du produit -->
      <div class="field">
        <label class="label">Titre du produit</label>
        <div class="control">
          <input v-model="product.title" class="input" type="text" placeholder="Titre du produit" required>
        </div>
      </div>

      <!-- <div class="field">
        <label class="label">Prix</label>
        <div class="control">
          <input v-model="product.price" class="input" type="number" placeholder="Prix du produit" min="0" required>
        </div>
      </div> -->

      <!-- Description du produit -->
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea v-model="product.description" class="textarea" placeholder="Description du produit" required></textarea>
        </div>
      </div>

      <!-- Catégorie du produit -->
      <div class="field">
        <label class="label">Catégorie</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="product.category" required>
              <option value="" disabled selected>Sélectionnez une catégorie</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Image du produit -->
      <div class="field">
        <label class="label">Image du produit</label>
        <div class="control">
          <input type="file" @change="handleFileUpload" accept="image/*" required>
        </div>
      </div>

      <!-- Boutons de soumission -->
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-link" type="submit">Ajouter le produit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        title: '',
        // price: '',
        description: '',
        category: '',
        image: null
      },
      categories: ['Café', 'Thé', 'Lait', 'Toppin'] 
    }
  },
  methods: {
    handleFileUpload(event) {
      this.product.image = event.target.files[0]; // Récupérer le fichier image
    },
    async submitProduct() {
      const formData = new FormData();
      formData.append('title', this.product.title);
      // formData.append('price', this.product.price);
      formData.append('description', this.product.description);
      formData.append('category', this.product.category);
      formData.append('image', this.product.image);

      try {
        const params = {
          name: this.product.title,
          // price: this.product.price,
          description: this.product.description,
          category: this.product.category,
          accountId: this.$appConfig.accountId
        };
        const response = await this.$http.post('/products/create', params);
        if (response.status === 201) {
          this.showToast('success', 'Produit ajouté');
          this.$router.push('/');
        }
      } catch (error) {
        this.showToast('error', 'Erreur lors de l\'ajout du produit');
      }
    }
  }
};
</script>

<style scoped>
/* Plus besoin de beaucoup de CSS, Bulma gère la mise en page */
</style>
