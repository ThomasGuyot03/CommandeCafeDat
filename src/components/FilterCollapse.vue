<template>
  <div class="filters-container">
    <label class="label">Catégorie:</label>
    <div class="control">
      <div class="buttons">
        <button 
          class="button custom-filter-button" 
          :class="{ 'is-active': filters.category === '' }" 
          @click="setCategory('')">
          Tous
        </button>
        <button 
          class="button custom-filter-button" 
          :class="{ 'is-active': filters.category === '1' }" 
          @click="setCategory('1')">
          Café
        </button>
        <button 
          class="button custom-filter-button" 
          :class="{ 'is-active': filters.category === '2' }" 
          @click="setCategory('2')">
          Thé
        </button>
        <button 
          class="button custom-filter-button" 
          :class="{ 'is-active': filters.category === '3' }" 
          @click="setCategory('3')">
          Lait
        </button>
        <button 
          class="button custom-filter-button" 
          :class="{ 'is-active': filters.category === '4' }" 
          @click="setCategory('4')">
          Cappuccino
        </button>
        <button 
          class="button custom-filter-button" 
          :class="{ 'is-active': filters.category === '5' }" 
          @click="setCategory('5')">
          Accessoires
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  props: ["initialFilters"],
  data() {
    return {
      filters: this.initialFilters
    }
  },
  methods: {
    setCategory(category) {
      this.filters.category = category;
      this.updateFilters();
    },
    updateFilters() {
      this.$emit('filters-changed', this.filters);
    }
  },
  watch: {
    'filters.minPrice': debounce(function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('filters-changed', this.filters);
      }
    }, 500),
    'filters.maxPrice': debounce(function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('filters-changed', this.filters);
      }
    }, 500),
  },
}
</script>

<style scoped>

.filters-container {
  margin-bottom: 2rem;
}

.label {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.icon {
  margin-right: 10px;
  font-size: 1.2rem;
  flex-shrink: 0; /* Empêche l'icône de se réduire */
}

.button.custom-filter-button {
  background-color: #f0f0f0;
  color: #333;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  display: inline-flex; /* Assure un alignement horizontal */
  align-items: center; /* Aligne verticalement l'icône et le texte */
  justify-content: center; /* Centrer le contenu */
  min-width: 120px; /* Assure que les boutons ont une largeur suffisante */
  transition: all 0.3s ease;
  white-space: nowrap; /* Empêche le texte de se diviser sur plusieurs lignes */
  flex-wrap: nowrap; /* Empêche l'empilement des éléments dans le bouton */
}

.button.custom-filter-button.is-active {
  background-color: #4f4f4f;
  color: white;
}

.button.custom-filter-button:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}

/* Responsive styles for mobile */
@media (max-width: 768px) {
  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Trois boutons par ligne */
    justify-items: center; /* Centrer les boutons horizontalement */
    gap: 10px;
    margin: 0 10px 0 10px;
  }

  .button.custom-filter-button {
    font-size: 0.9rem; /* Réduire la taille du texte sur mobile */
    padding: 0.5rem 1rem; /* Ajuster le padding sur mobile */
    min-width: unset; /* Supprime la largeur minimale pour un ajustement flexible */
    width: 100%; /* Rendre les boutons responsive et flexibles */
  }

  .icon {
    margin-right: 5px; /* Réduire l'espace entre l'icône et le texte */
    font-size: 1rem; /* Réduire la taille de l'icône sur mobile */
  }
}

</style>
