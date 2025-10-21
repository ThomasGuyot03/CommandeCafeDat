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
  margin-bottom: 3rem;
  padding: 0 1rem;
}

.category-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 2rem 0;
  color: #2c3e50;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 2px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
}

.icon {
  margin-right: 10px;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.button.custom-filter-button {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #495057;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.875rem 2rem;
  border-radius: 50px;
  border: 2px solid #e9ecef;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  flex-wrap: nowrap;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.button.custom-filter-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(52, 152, 219, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.button.custom-filter-button:hover::before {
  width: 300px;
  height: 300px;
}

.button.custom-filter-button:hover {
  border-color: #3498db;
  color: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.25);
}

.button.custom-filter-button.is-active {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border-color: #2980b9;
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.35);
  transform: translateY(-2px);
}

.button.custom-filter-button.is-active::before {
  display: none;
}

.button.custom-filter-button.is-active:hover {
  background: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.45);
  transform: translateY(-3px);
}

.button.custom-filter-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .filters-container {
    margin-bottom: 2rem;
  }

  .category-title {
    font-size: 1.5rem;
    margin: 1.5rem 0;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin: 0 auto;
    padding: 0 10px;
    max-width: 500px;
  }

  .button.custom-filter-button {
    font-size: 0.95rem;
    padding: 0.75rem 1.5rem;
    width: 100%;
    min-width: unset;
    border-radius: 12px;
  }

  .icon {
    margin-right: 5px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .category-title {
    font-size: 1.3rem;
  }

  .button.custom-filter-button {
    font-size: 0.9rem;
    padding: 0.65rem 1.25rem;
  }
}
</style>
