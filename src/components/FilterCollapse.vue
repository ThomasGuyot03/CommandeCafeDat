<template>
  <div class="filters-container">
    <h2 class="category-title">Catégorie</h2>

    <div class="control">
      <div class="buttons is-centered">
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
        <!-- <button 
          class="button custom-filter-button" 
          :class="{ 'is-active': filters.category === '3' }" 
          @click="setCategory('3')">
          Lait
        </button> -->
        <button 
          class="button custom-filter-button" 
          :class="{ 'is-active': filters.category === '4' }" 
          @click="setCategory('4')">
          Gourmand
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
import { debounce } from 'lodash';

export default {
  props: {
    initialFilters: {
      type: Object,
      default: () => ({ category: '' }), // Définit un filtre par défaut si aucun n'est fourni
    },
  },
  data() {
    return {
      filters: { ...this.initialFilters }, // Clone pour éviter de modifier la prop directement
    };
  },
  methods: {
    setCategory(category) {
      this.filters.category = category; // Modifie la catégorie sélectionnée
      this.updateFilters(); // Met à jour les filtres
    },
    updateFilters() {
      this.$emit('updateFilter', this.filters.category); // Émet l'événement avec les filtres actuels
    },
  },
  watch: {
    'filters.minPrice': debounce(function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateFilters();
      }
    }, 500),
    'filters.maxPrice': debounce(function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateFilters();
      }
    }, 500),
  },
}
</script>

<style scoped>
.filters-container {
  margin-bottom: 2rem;
}

.category-title {
  text-align: center;
  font-size: 1.6rem;
  margin: 1rem 0;
}

.buttons {
  display: flex; 
  flex-wrap: wrap; 
  gap: 10px; 
  justify-content: center; /* Centre les boutons sur desktop */
}

.icon {
  margin-right: 10px;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.button.custom-filter-button {
  background-color: #f0f0f0;
  color: #333;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px; /* Conserve la largeur minimale */
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-wrap: nowrap;
}

.button.custom-filter-button.is-active {
  background-color: #4f4f4f;
  color: white;
}

.button.custom-filter-button:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}

@media (max-width: 768px) {
  .buttons {
    display: grid; /* Utilise une grille pour la mise en page mobile */
    grid-template-columns: repeat(2, 1fr); /* Deux colonnes */
    gap: 10px; /* Espace entre les colonnes */
    margin: 0 auto; /* Centre le conteneur */
    padding: 0 10px; /* Ajoute un espacement sur les côtés */
    width: 90%;
  }

  .button.custom-filter-button {
    font-size: 0.9rem; /* Ajuste la taille de police si nécessaire */
    padding: 0.5rem 1rem; /* Ajuste le rembourrage si nécessaire */
    width: 100%; /* Assure que les boutons prennent la largeur du conteneur */
  }

  .icon {
    margin-right: 5px;
    font-size: 1rem;
  }
}


</style>
