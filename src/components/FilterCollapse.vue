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
import { debounce } from 'lodash';
export default {
  props: ["initialFilters"],
  data() {
    return {
      filters: this.initialFilters,
    };
  },
  methods: {
    setCategory(category) {
      this.filters.category = category;
      this.updateFilters();
    },
    updateFilters() {
      this.$emit('filters-changed', this.filters);
    },
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

.category-title {
  text-align: center;
  font-size: 1.6rem;
  margin: 1rem 0;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center; 
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
  min-width: 120px;
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    gap: 10px;
    margin: 0 10px; 
    padding: 0 15px; 
  }

  .button.custom-filter-button {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    min-width: unset;
    width: 100%;
  }

  .icon {
    margin-right: 5px;
    font-size: 1rem;
  }
}
</style>
