<template>
  <nav class="pagination is-small is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous" :class="{ 'is-disabled': currentPage === 1 }" @click="prevPage">Précédent</a>
    <a class="pagination-next" :class="{ 'is-disabled': currentPage === totalPages }" @click="nextPage">Suivant</a>
    <ul class="pagination-list">
      <li v-for="page in displayedPages" :key="page">
        <template v-if="typeof page === 'number'">
          <a class="pagination-link" :class="{ 'is-current': page === currentPage }" @click="gotoPage(page)">
            {{ page }}
          </a>
        </template>
        <template v-else>
          <span class="pagination-ellipsis">&hellip;</span>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
import GenericMixin from '@/mixins/GenericMixin.js'
export default {
  mixins: [GenericMixin],
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true
    },
    serviceProps: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      test: ''
    }
  },
  created() {
  },
  computed: {
    displayedPages() {
      const pages = [];
      if (this.totalPages <= 5) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (this.currentPage <= 2) {
          pages.push(1, 2, 3, '...', this.totalPages);
        } else if (this.currentPage >= this.totalPages - 1) {
          pages.push(1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages);
        } else {
          pages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
        }
      }
      return pages;
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('update-page', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update-page', this.currentPage + 1);
      }
    },
    gotoPage(page) {
      if (typeof page === 'number') {
        this.$emit('update-page', page);
      }
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 2rem 1rem;
  flex-wrap: wrap;

  /* 🧩 Fix overflow horizontal */
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.pagination-previous,
.pagination-next {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #495057;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 2px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}

.pagination-previous::before,
.pagination-next::before {
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

.pagination-previous:hover::before,
.pagination-next:hover::before {
  width: 200px;
  height: 200px;
}

.pagination-previous:hover,
.pagination-next:hover {
  border-color: #3498db;
  color: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

.pagination-previous:active,
.pagination-next:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.is-disabled {
  pointer-events: none;
  opacity: 0.4;
  cursor: not-allowed;
  background: #f8f9fa;
  border-color: #dee2e6;
  color: #adb5bd;
}

.pagination-list {
  display: flex;
  align-items: center;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  justify-content: center;

  /* 🧩 Empêche le débordement horizontal */
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.pagination-list li {
  display: flex;
}

.pagination-link {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #495057;
  font-size: 0.95rem;
  font-weight: 600;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}

.pagination-link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(52, 152, 219, 0.15);
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.pagination-link:hover::before {
  width: 60px;
  height: 60px;
}

.pagination-link:hover {
  border-color: #3498db;
  color: #2c3e50;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.25);
}

.pagination-link.is-current {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  border-color: #2980b9;
  color: white;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.35);
  transform: scale(1.05);
  font-weight: 700;
}

.pagination-link.is-current::before {
  display: none;
}

.pagination-link.is-current:hover {
  background: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(52, 152, 219, 0.45);
}

.pagination-ellipsis {
  color: #adb5bd;
  font-size: 1.2rem;
  font-weight: 700;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

/* 📱 Tablettes */
@media (max-width: 768px) {
  .pagination {
    gap: 6px;
    padding: 1.5rem 0.5rem;
  }

  .pagination-previous,
  .pagination-next {
    font-size: 0.85rem;
    padding: 0.65rem 1.25rem;
    min-width: 95px;
    border-radius: 10px;
  }

  .pagination-link {
    width: 38px;
    height: 38px;
    font-size: 0.9rem;
  }

  .pagination-ellipsis {
    width: 38px;
    height: 38px;
    font-size: 1.1rem;
  }
}

/* 📱 Mobiles */
@media (max-width: 480px) {
  .pagination {
    gap: 4px;
    padding: 1rem 0.25rem;
  }

  .pagination-previous,
  .pagination-next {
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
    min-width: 85px;
  }

  .pagination-link {
    width: 36px;
    height: 36px;
    font-size: 0.85rem;
  }

  .pagination-ellipsis {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}
</style>

