<template>
  <div>
    <nav :class="['sidebar', { 'is-active': isSidebarActive }]">
      <div class="sidebar-brand">
        <a href="#" target="" class="sidebar-logo">
          <img src="https://i.postimg.cc/mk088cKJ/Design-sans-titre-8.png" border="0" alt="Logo" />
        </a>
      </div>

      <ul class="sidebar-menu">
        <li>
          <router-link class="sidebar-item" to="/" @click="closeSidebar">
            <i class="fas fa-home"></i>
            <span>Accueil</span>
          </router-link>
        </li>
        <li>
          <router-link class="sidebar-item" to="/panier" style="position: relative;" @click="closeSidebar">
            <i class="fas fa-shopping-basket"></i>
            <span>Panier</span>
            <span class="cart-badge">{{ cartItemsCount }}</span>
          </router-link>
        </li>

        <li v-if="!getUser">
          <router-link class="sidebar-item" to="/signup" @click="closeSidebar">
            <i class="fas fa-user-plus"></i>
            <span>Inscription</span>
          </router-link>
          <router-link class="sidebar-item" to="/login" @click="closeSidebar">
            <i class="fas fa-sign-in-alt"></i>
            <span>Connexion</span>
          </router-link>
        </li>

        <li v-else>
          <router-link class="sidebar-item" to="/profil" @click="closeSidebar">
            <i class="fas fa-user"></i>
            <span>Profil</span>
          </router-link>
          <a class="sidebar-item" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Déconnexion</span>
          </a>

          <router-link v-if="getUser.isAdmin" class="sidebar-item to-ajouter-produit" to="/ajouter-produit" @click="closeSidebar">
            <i class="fas fa-plus"></i>
            <span>Ajouter produit</span>
          </router-link>

          <router-link v-if="getUser.isAdmin" class="sidebar-item" to="/gestion" @click="closeSidebar">
            <i class="fas fa-cogs"></i>
            <span>Gestion</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <button class="hamburger" @click.stop="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isSidebarActive: false,
    }
  },
  computed: {
    ...mapGetters(['getUser', 'cartItemsCount']),
  },
  methods: {
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
    },
    closeSidebar() {
      this.isSidebarActive = false;
    },
    handleClickOutside(event) {
      const sidebar = this.$el.querySelector('.sidebar');
      const hamburger = this.$el.querySelector('.hamburger');
      if (sidebar && !sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        this.closeSidebar();
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$store.dispatch('updateUser', null);
      this.closeSidebar();
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>



<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100%;
  background: linear-gradient(180deg, #1a1f2e 0%, #2c3e50 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  transform: translateX(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
}

.sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(46, 204, 113, 0.05) 100%);
  pointer-events: none;
}

.sidebar-brand {
  width: 100%;
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
}

.sidebar-brand::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 2px;
}

.sidebar-logo {
  display: block;
  transition: transform 0.3s ease;
}

.sidebar-logo:hover {
  transform: scale(1.05);
}

.sidebar-logo img {
  width: 180px;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.sidebar-menu {
  list-style-type: none;
  padding: 1.5rem 0;
  margin: 0;
  width: 100%;
  flex: 1;
}

.sidebar-menu li {
  position: relative;
}

.sidebar-item {
  width: 100%;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 16px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  letter-spacing: 0.3px;
}

.sidebar-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #3498db, #2ecc71);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.sidebar-item::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(52, 152, 219, 0.15), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar-item:hover {
  color: #ffffff;
  background: rgba(52, 152, 219, 0.1);
  padding-left: 2rem;
  transform: translateX(4px);
}

.sidebar-item:hover::before {
  transform: scaleY(1);
}

.sidebar-item:hover::after {
  opacity: 1;
}

.sidebar-item.router-link-active {
  color: #ffffff;
  background: rgba(52, 152, 219, 0.15);
  font-weight: 600;
}

.sidebar-item.router-link-active::before {
  transform: scaleY(1);
}

.sidebar-item i {
  margin-right: 1rem;
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.sidebar-item:hover i {
  transform: scale(1.1);
}

.sidebar-item span {
  flex-grow: 1;
  position: relative;
  z-index: 1;
}

.cart-badge {
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.4);
  animation: pulse 2s infinite;
  min-width: 24px;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.4);
  }
  50% {
    box-shadow: 0 2px 16px rgba(52, 152, 219, 0.6);
  }
}

.hamburger {
  display: none;
  position: fixed;
  top: 18px;
  left: 18px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  font-size: 1.4rem;
  border: none;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
}

.hamburger:hover {
  transform: scale(1.1);
}

.hamburger:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .sidebar {
    width: 80vw;
    max-width: 300px;
    transform: translateX(-100%);
    box-shadow: none;
  }

  .sidebar.is-active {
    transform: translateX(0);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
  }

  .sidebar-logo img {
    width: 150px;
  }

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
}

}

.sidebar-item.to-ajouter-produit {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  position: relative;
}

.sidebar-item.to-ajouter-produit::before {
  content: '';
  position: absolute;
  top: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.sidebar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #3498db, #2ecc71);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #2ecc71, #3498db);
}
</style>
