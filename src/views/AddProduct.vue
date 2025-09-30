<template>
  <div class="add-product-page">
    <h1 class="add-product-title">Ajouter un produit</h1>
    <div class="product-form-box">
      <form @submit.prevent="submitProduct" class="product-form">
        <!-- Titre du produit -->
        <div class="field">
          <label class="label">Titre du produit</label>
          <div class="control">
            <input v-model="product.title" class="input" type="text" placeholder="Titre du produit" required />
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

        <!-- Image du produit (Dropbox et clic pour sélectionner) -->
        <div class="field">
          <label class="label">Image du produit</label>
          <div class="control">
            <div class="dropbox" @click="selectFile" @dragover.prevent @drop="handleDrop" :class="{'is-dragover': isDragover}">
              <span>Cliquez pour sélectionner une image</span>
            </div>
            <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="file-input" />
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
  </div>
</template>

<script>
export default {
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
      isDragover: false, // Etat pour gérer la zone de survol
    };
  },
  methods: {
    handleFileUpload(event) {
      this.product.image = event.target.files[0]; // Stocke le fichier image
    },
    handleDrop(event) {
      event.preventDefault();
      this.isDragover = false;
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.product.image = files[0]; // Récupère le fichier déposé
      }
    },
    selectFile() {
      this.$refs.fileInput.click(); // Clic sur l'input fichier en cas de clic sur la zone dropbox
    },
    async submitProduct() {
      const formData = new FormData();
      formData.append('name', this.product.title);
      formData.append('description', this.product.description);
      formData.append('category', this.product.category);
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
/* Container global */
.add-product-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}

/* Titre de la page */
.add-product-title {
  font-size: 2.8rem;
  font-weight: bold;
  color: #303649;
  margin-bottom: 2rem;
  text-align: center;
}

/* Formulaire d'ajout de produit */
.product-form-box {
  background-color: #303649;
  border-radius: 5px;
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
}

/* Gradient en haut du formulaire */
.product-form-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #00ffcc, #0077a6);
  border-radius: 12px 12px 0 0;
}

/* Formulaire et champs */
.product-form .field {
  margin-bottom: 1.5rem;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  text-align: left;
}

/* Champs de saisie */
.input,
.textarea,
.select select {
  background-color: #2a2a2a;
  border: 1px solid #d3d3d3;
  color: #ffffff;
  border-radius: 4px;
  width: 100%;
  font-size: 0.9rem;
}

/* Focus sur les champs */
.input:focus,
.textarea:focus,
.select select:focus {
  outline: none;
  border-color: #ffffff;
  box-shadow: 0 0 5px rgba(64, 96, 255, 0.5);
}

/* Placeholder des champs */
.input::placeholder {
  color: rgb(105, 105, 105); /* Placeholder color (light grey) */
}

.textarea {
  color: #ffffff; /* Texte de la description maintenant avec la même couleur que le titre */
}

.textarea::placeholder {
  color: rgb(105, 105, 105); /* Placeholder color (light grey) */
  opacity: 1; /* Assure que la couleur soit pleinement visible */
}

/* Boutons */
.button.is-link {
  background-color: #ffffff;
  border-color: #ffffff;
  color: rgb(0, 0, 0);
  font-weight: bold;
  padding: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.button.is-link:hover {
  background-color: #005bb5;
}

.button:hover {
  background: linear-gradient(90deg, #00ffcc, #0077a6);
}

/* Styles de la zone de dépose (Dropbox) */
.dropbox {
  background-color: #2a2a2a;
  border: 2px dashed #ffffff;
  color: #ffffff;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropbox.is-dragover {
  background-color: #0077a6;
}

.dropbox span {
  display: block;
  text-align: center;
  font-size: 1rem;
  color: #fff;
}

.file-input {
  display: none;
}

/* Styles des icônes dans les champs */
.control.has-icons-left .input {
  padding-left: 3rem;
}

.control.has-icons-left .icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #bbbbbb;
}

/* Message d'erreur */
.error-message {
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

/* Message de succès */
.success-message {
  color: #6bff6b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

/* Media Query pour réduire le titre en mobile */
@media (max-width: 768px) {
  .add-product-title {
    font-size: 2rem; /* Taille réduite du titre pour les petits écrans */
  }
}
</style>
