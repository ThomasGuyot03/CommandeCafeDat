<template>
  <div class="container">
    <h1 class="title">Ajouter un produit</h1>
    <form @submit.prevent="submitProduct" class="product-form">
      <div class="field">
        <label class="label">Titre du produit</label>
        <div class="control">
          <input v-model="product.title" class="input" type="text" placeholder="Titre du produit" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Prix</label>
        <div class="control">
          <input v-model="product.price" class="input" type="number" placeholder="Prix du produit" min="0" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea v-model="product.description" class="textarea" placeholder="Description du produit" required></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">Catégorie</label>
        <div class="control">
          <div class="select">
            <select v-model="product.category" required>
              <option value="" disabled selected>Sélectionnez une catégorie</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Image du produit</label>
        <div class="control">
          <input type="file" @change="handleFileUpload" accept="image/*" required>
        </div>
      </div>

      <div class="field is-grouped">
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
          price: '',
          description: '',
          category: '',
          image: null
        },
        categories: ['Vêtements', 'Électronique', 'Livres', 'Accessoires'] // recuperer les catégories
      }
    },
    methods: {
      handleFileUpload(event) {
        this.product.image = event.target.files[0]; // On récupère le fichier
      },
      async submitProduct() {
        const formData = new FormData();
        formData.append('title', this.product.title);
        formData.append('price', this.product.price);
        formData.append('description', this.product.description);
        formData.append('category', this.product.category);
        formData.append('image', this.product.image); 
        this.product.image = null
        try {
          const params = {
            name: this.product.title,
            price: this.product.price,
            description: this.product.description,
            category: this.product.category
          }
          const response = await this.$http.post('/products/create', params)
          console.log("test-acceuil",response)
          if (response.status === 201) {
            this.showToast('success', 'Produit ajouté')
            this.$router.push('/'); 
          }
        } catch (error) {
          this.showToast('error', 'Erreur')
        }
      },
     
    }
  }
  </script>
  
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center; /* Centrer le contenu du container */
  }
  
  .product-form {
    max-width: 400px; /* Réduire la largeur du formulaire */
    margin: 0 auto; /* Centrer le formulaire */
  }
  
  .field {
    margin-bottom: 20px;
  }
  
  .control .input, 
  .control .textarea, 
  .control .select select {
    max-width: 100%; /* Largeur maximale des champs */
    width: 100%; /* Adapter la largeur à celle du formulaire */
  }
  
  .button {
    width: 100%; /* Rendre le bouton de soumission plein */
  }
  
  </style>