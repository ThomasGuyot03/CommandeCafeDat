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
.add-product-page {
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3rem 1.5rem;
  transition: background-color 0.3s ease;
}

/* Titre principal */
.add-product-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #1a1f2e;
  font-weight: 600;
  letter-spacing: -0.5px;
}

/* Boîte du formulaire */
.product-form-box {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  width: 100%;
  max-width: 640px;
  padding: 3rem 2.5rem;
  text-align: left;
  transition: box-shadow 0.3s ease;
}

.product-form-box:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Champs du formulaire */
.field {
  margin-bottom: 1.5rem;
}

.label {
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
}

/* Inputs et textarea */
.input,
.textarea,
.select select {
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  color: #1a1f2e;
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  width: 100%;
}

.input::placeholder,
.textarea::placeholder {
  color: #9ca3af;
}

.input:hover,
.textarea:hover,
.select select:hover {
  border-color: #9ca3af;
}

.input:focus,
.textarea:focus,
.select select:focus {
  background-color: #ffffff;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  outline: none;
}

/* Sélecteur de catégorie */
.select {
  width: 100%;
}

.select select {
  appearance: none;
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  color: #1a1f2e;
  font-size: 0.95rem;
  padding: 0.65rem 1rem; /* ajusté */
  border-radius: 6px;
  line-height: 1.3; /* correction d'alignement du texte */
  height: 42px; /* hauteur fixe pour aligner le texte verticalement */
  transition: all 0.2s ease;
}

/* Zone de dépose d’image */
.dropbox {
  background-color: #f9fafb;
  border: 2px dashed #cbd5e1;
  color: #6b7280;
  padding: 2rem 1rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.dropbox:hover {
  border-color: #3498db;
  background-color: #f0f8ff;
  color: #3498db;
}

.dropbox.is-dragover {
  border-color: #3498db;
  background-color: rgba(52, 152, 219, 0.05);
}

.file-input {
  display: none;
}

/* Bouton principal */
.button.is-link {
  background: #3498db;
  border: none;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;
}

.button.is-link:hover {
  background: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.2);
}

.button.is-link:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Messages (si ajoutés plus tard) */
.error-message,
.success-message {
  font-size: 0.9rem;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  text-align: left;
  border-left: 3px solid;
  animation: fadeIn 0.3s ease;
}

.error-message {
  background: #fee;
  color: #c33;
  border-color: #c33;
}

.success-message {
  background: #e6ffed;
  color: #0f5132;
  border-color: #198754;
}

/* Animation fade-in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .add-product-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .product-form-box {
    padding: 2rem 1.5rem;
  }

  .button.is-link {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .add-product-page {
    padding: 2rem 1rem;
  }

  .add-product-title {
    font-size: 1.5rem;
  }

  .label {
    font-size: 0.8rem;
  }

  .input,
  .textarea {
    font-size: 0.9rem;
    padding: 0.65rem 0.875rem;
  }

  .dropbox {
    padding: 1.5rem 0.75rem;
    font-size: 0.9rem;
  }
}
</style>

