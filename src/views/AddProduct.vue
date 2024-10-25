<template>
  <div class="container">
    <h1 class="title">Ajouter un produit</h1>

    <FilterCollapse @filters-changed="onFiltersChanged" />

    

    <form @submit.prevent="submitProduct" class="box">
      <!-- Titre du produit -->
      <div class="field">
        <label class="label">Titre du produit</label>
        <div class="control">
          <input v-model="product.title" class="input" type="text" placeholder="Titre du produit" required>
        </div>
      </div>

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
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
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
import FilterCollapse from '@/components/FilterCollapse.vue';

export default {
  components: {
    FilterCollapse,
  },
  data() {
    return {
      product: {
        title: '',
        description: '',
        category: '', // Catégorie sélectionnée par défaut
        image: null,
      },
      categories: [
        { id: '1', name: 'Café' },
        { id: '2', name: 'Thé' },
        { id: '3', name: 'Lait' },
        { id: '4', name: 'Gourmand' },
        { id: '5', name: 'Accessoires' },
      ],
    };
  },
  methods: {
    handleFileUpload(event) {
      this.product.image = event.target.files[0]; // Stocke le fichier image
    },
    async submitProduct() {
      const formData = new FormData();
      formData.append('name', this.product.title);
      formData.append('description', this.product.description);
      formData.append('category', this.product.category);
      // formData.append('accountId', this.$appConfig.accountId);
      formData.append('image', this.product.image);

      try {
        const response = await this.$http.post('/products/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 201) {
          this.showToast('success', 'Produit ajouté');
          this.$router.push('/');
        }
      } catch (error) {
        this.showToast('error', 'Erreur lors de l\'ajout du produit');
      }
    },
    onFiltersChanged(filters) {
      this.product.category = filters.category; // Mise à jour de la catégorie du produit
    },
  },
};
</script>

<style scoped>

.container {
  max-width: 600px; 
  margin: 0 auto; 
}

.title {
  margin-top: 30px;
  text-align: center;
}

.box {
  max-width: 600px; 
  margin: 0 auto; 
  padding: 20px; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  background-color: white; 
}

.input, .textarea, .select select {
  border: 2px solid #303649; 
}

.input:focus, .textarea:focus, .select select:focus {
  border-color: rgb(75, 75, 75);
  box-shadow: 0 0 5px rgba(180, 180, 180, 0.5);
}

.button.is-link {
  background-color: #303649;
  border-color: rgb(0, 0, 0);
}

.button.is-link:hover {
  background-color: rgb(110, 110, 110);
}

.label {
  font-weight: bold;
  color: #303649;
}
</style>
