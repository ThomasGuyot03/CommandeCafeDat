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

        <!-- Bouton Supprimer (visible seulement si un produit existe) -->
        <button v-if="localProduct._id" class="button is-danger" @click="deleteProduct">Supprimer le produit</button>
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
        this.showToast('error', 'Erreur lors de la modification du produit')
      }
    },
    async deleteProduct() {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        try {
          const response = await this.$http.delete(`/products/delete/${this.localProduct._id}`);
          if (response.status === 200) {
            this.showToast('success', 'Produit supprimé');
            this.$emit('product-deleted'); // Émettre un événement pour signaler la suppression
            this.close();
            this.$router.push('/');
          }
        } catch (error) {
          this.showToast('error', 'Erreur lors de la suppression du produit');
        }
      }
    }
  }
}
</script>

<style scoped>
.modal.is-active {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

/* Fond semi-transparent */
.modal-background {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
}

/* Carte principale */
.modal-card {
  background: #ffffff;
  border-radius: 12px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: modalAppear 0.3s ease-out;
}

/* Animation d’apparition */
@keyframes modalAppear {
  from {
    opacity: 0;
    transform: translateY(-25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* En-tête */
.modal-card-head {
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-card-title {
  color: #1f2937;
  font-size: 1.2rem;
  font-weight: 600;
}

.delete {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s ease;
}

.delete:hover {
  color: #111827;
}

/* Corps du formulaire */
.modal-card-body {
  padding: 25px 30px;
  background-color: #ffffff;
}

.field {
  margin-bottom: 1.2rem;
  text-align: left;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 5px;
  display: block;
}

.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #f9fafb;
  color: #1f2937;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Pied de la modale */
.modal-card-foot {
  padding: 15px 20px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Boutons */
.button {
  border: none;
  border-radius: 6px;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Enregistrer */
.button.is-success {
  background-color: #10b981;
  color: #ffffff;
}

.button.is-success:hover {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
}

/* Annuler */
.button:not(.is-success):not(.is-danger) {
  background-color: #e5e7eb;
  color: #374151;
}

.button:not(.is-success):not(.is-danger):hover {
  background-color: #d1d5db;
}

/* Supprimer */
.button.is-danger {
  background-color: #ef4444;
  color: #ffffff;
}

.button.is-danger:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-card {
    width: 90%;
  }

  .modal-card-body {
    padding: 20px;
  }

  .modal-card-foot {
    flex-direction: column;
    align-items: stretch;
  }

  .button {
    width: 100%;
  }
}
  
</style>
