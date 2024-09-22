<template>
    <div class="field">
        <label class="label">Catégorie:</label>
        <div class="control">
            <div class="buttons">
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '' }" 
                    @click="setCategory('')">
                    <span class="icon"><i class="fas fa-list"></i></span>
                    Tous
                </button>
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '1' }" 
                    @click="setCategory('1')">
                    <span class="icon"><i class="fas fa-coffee"></i></span>
                    Café
                </button>
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '2' }" 
                    @click="setCategory('2')">
                    <span class="icon"><i class="fas fa-leaf"></i></span>
                    Thé
                </button>
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '3' }" 
                    @click="setCategory('3')">
                    <span class="icon"><i class="fas fa-glass-whiskey"></i></span>
                    Lait
                </button>
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '4' }" 
                    @click="setCategory('4')">
                    <span class="icon"><i class="fas fa-mug-hot"></i></span>
                    Cappuccino
                </button>
                <button 
                    class="button" 
                    :class="{ 'is-active': filters.category === '5' }" 
                    @click="setCategory('5')">
                    <span class="icon"><i class="fas fa-box-open"></i></span>
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
    font-size: 1.5em;
}
.buttons {
    display: flex;
    flex-wrap: wrap;
}
.button {
    margin-bottom: 0.5rem;
    font-size: 1.2em;
    padding: 1rem;
    width: 50%;
    font-weight: bold;
    display: flex;
    align-items: center; /* Aligne l'icône et le texte au centre verticalement */
}
.icon {
    margin-right: 1rem; /* Augmente l'espace entre l'icône et le texte */
}

.button .icon:first-child:last-child {
    margin-left: calc(-0.5em - 1px);
    margin-right: calc(0.5em - 1px);
}
</style>

