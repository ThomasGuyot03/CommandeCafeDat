<template>
    <div class="field">
        <label class="label">Catégorie</label>
        <div class="control">
            <div class="select">
                <select v-model="filters.category" @change="updateFilters">
                    <option value="">Toutes</option>
                    <option value="1">Café</option>
                    <option value="2">Thé</option>
                    <option value="3">Lait</option>
                    <option value="4">Toppin</option>

                </select>
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
        updateFilters() {
            this.$emit('filters-changed', this.filters)
        }
    },
    watch: {
    'filters.minPrice': debounce(function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('filters-changed', this.filters)
      }
    }, 500),
    'filters.maxPrice': debounce(function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('filters-changed', this.filters)
      }
    }, 500),
  },
}
</script>

<style scoped>

.field {
    padding-left: 1rem;
}
.label {
    margin-top: 1.5rem;
}
.flex {
    display: flex;
    justify-content: space-between;
}
.control {
    width: 45%;
}

</style>

