<template>
  <div>
    <nav :class="['sidebar', { 'is-active': isSidebarActive }]">
      <div class="sidebar-brand">
        <a href="#" target="_blank" class="sidebar-logo">
          <img src="https://i.postimg.cc/CdFtCbdw/1.png" border="0" alt="Logo" />
        </a>
      </div>

      <ul class="sidebar-menu">
        <li>
          <router-link class="sidebar-item" to="/">
            <i class="fas fa-home"></i>
            <span>Accueil</span>
          </router-link>
        </li>
        <li>
          <router-link class="sidebar-item" to="/panier" style="position: relative;">
            <i class="fas fa-shopping-basket"></i>
            <span>Panier</span>
            <span class="cart-badge">{{ cartItemsCount }}</span>
          </router-link>
        </li>

        <li v-if="!getUser">
          <router-link class="sidebar-item" to="/signup">
            <i class="fas fa-user-plus"></i>
            <span>Inscription</span>
          </router-link>
          <router-link class="sidebar-item" to="/login">
            <i class="fas fa-sign-in-alt"></i>
            <span>Connexion</span>
          </router-link>
        </li>

        <li v-else>
          <router-link class="sidebar-item" to="/profil">
            <i class="fas fa-user"></i>
            <span>Profil</span>
          </router-link>
          <a class="sidebar-item" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Déconnexion</span>
          </a>

          <router-link v-if="getUser.isAdmin" class="sidebar-item to-ajouter-produit" to="/ajouter-produit">
            <i class="fas fa-plus"></i>
            <span>Ajouter produit</span>
          </router-link>

          <router-link v-if="getUser.isAdmin" class="sidebar-item" to="/gestion">
            <i class="fas fa-cogs"></i>
            <span>Gestion</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Hamburger button for mobile -->
    <button class="hamburger" @click="toggleSidebar">
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
    logout() {
      localStorage.removeItem('token');
      this.$store.dispatch('updateUser', null);
    }
  }
}
</script>


<style scoped>
/* Style de base pour la sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100%;
  background-color: #303649;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  transform: translateX(0);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.sidebar-logo {
  width: 120px;
  margin-bottom: 30px;
}

.sidebar-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.sidebar-item {
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s;
  font-size: 18px;
}

.sidebar-item:hover {
  background-color: #575757;
}

.sidebar-item i {
  margin-right: 10px;
}

.sidebar-item span {
  flex-grow: 1;
}

.cart-badge {
  background-color: rgb(155, 155, 155);
  color: white;
  border-radius: 15%;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 10px; /* Espace à gauche du badge */
  font-weight: bold;
  display: inline-flex; /* Aligne le badge avec le texte */
  justify-content: center;
  align-items: center;
  text-align: center; /* Centre le texte à l'intérieur */
}

.hamburger {
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  z-index: 1001;
}

/* Responsive styles */
@media (max-width: 768px) {
  .sidebar {
    width: 80vw;
    transform: translateX(-100%);
  }

  .sidebar.is-active {
    transform: translateX(0);
  }

  .sidebar-logo {
    width: 40px;
  }

  /* Display hamburger button on mobile */
  .hamburger {
    display: block;
    color: black;
  }

}

/* Trait blanc au-dessus du bouton "Ajouter produit" */
.sidebar-item.to-ajouter-produit {
  border-top: 4px solid white;
  margin-top: 20px;
  padding-top: 20px;
}

</style>

