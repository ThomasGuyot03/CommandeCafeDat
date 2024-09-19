<template>
    <div class="field">
        <label class="label">Catégorie:</label>
        <div class="control">
            <div class="buttons">
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '' }" 
                    @click="setCategory('')">
                    Tous
                </button>
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '1' }" 
                    @click="setCategory('1')">
                    Café
                </button>
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '2' }" 
                    @click="setCategory('2')">
                    Thé
                </button>
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '3' }" 
                    @click="setCategory('3')">
                    Lait
                </button>
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '4' }" 
                    @click="setCategory('4')">
                    Toppin
                </button>
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '5' }" 
                    @click="setCategory('4')">
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
.field {
    padding-left: 1rem;
}
.label {
    margin-top: 1.5rem;
    font-size: 1.5em; /* Augmente la taille de la police du label */
}
.buttons {
    display: flex;
}
.button {
    margin-bottom: 0.5rem; /* Ajoute de l'espace entre les boutons */
    font-size: 1.2em; /* Augmente la taille de la police */
    padding: 1rem; /* Ajuste le rembourrage pour uniformiser la taille */
    width: 50%; /* Assure que tous les boutons prennent la largeur complète */
    font-weight: bold; /* Met le texte en gras */
}
</style>

