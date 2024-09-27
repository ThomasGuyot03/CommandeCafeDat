<template>
  <nav class="sidebar">
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
        <router-link class="button sidebar-cart-button" to="/panier" style="position: relative;">
          <i class="fas fa-shopping-basket"></i>
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

        <router-link v-if="getUser.isAdmin" class="sidebar-item" to="/ajouter-produit">
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUser', 'cartItemsCount']),
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$store.dispatch('updateUser', null)
    }
  }
}
</script>

<style scoped>
/* Style pour la sidebar */
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
  padding: 20px; /* Augmenter la taille du padding */
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s;
  font-size: 18px; /* Augmenter la taille de la police */
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

.sidebar-cart-button {
  padding: 15px 20px; /* Ajuster les dimensions pour le bouton panier */
  background-color: #475057; /* Couleur de fond pour le bouton panier */
  color: white; /* Couleur du texte */
  border: none; /* Pas de bordure */
  border-radius: 5px; /* Bords arrondis */
  text-align: center; /* Centre le contenu */
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff3860; /* Une couleur vive, tu peux changer selon ton thème */
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 6px;
  border-radius: 50%; /* Rendre la pastille ronde */
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Ajout d'une ombre légère */
  z-index: 1; /* Pour la mettre au-dessus de l'icône */
}

/* Responsivité pour rendre la barre de navigation rétractable (optionnel) */
@media (max-width: 768px) {
  .sidebar {
    width: 80px;
  }
  .sidebar-item span {
    display: none;
  }
  .sidebar-logo {
    width: 40px;
  }
}
</style>
