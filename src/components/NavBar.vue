<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a href="#" target="_blank">
        <img src="https://i.postimg.cc/CdFtCbdw/1.png" border="0" alt="1" />
      </a>
      <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" id="navMenu">
      <div class="navbar-start">
        <a class="navbar-item has-text-is-light">
          <router-link class="button" to="/"><strong>Accueil</strong></router-link>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div v-if="!getUser">
              <router-link class="button" to="/signup">
                <strong>Inscription</strong>
              </router-link>
              <router-link class="button" to="/login">
                <strong>Connexion</strong>
              </router-link>
              <router-link class="button" to="/panier">
                <strong><i class="fas fa-shopping-basket"></i> Panier</strong>
                <span class="cart-badge">{{ cartItemsCount }}</span>
              </router-link>
            </div>
            <div v-else>
              <router-link class="button" to="/profil">
                <strong>Profil</strong>
              </router-link>
              <div class="button" @click="logout">
                <strong>Déconnexion</strong>
              </div>
              <router-link class="button" to="/panier">
                <strong><i class="fas fa-shopping-basket"></i></strong>
                <span class="cart-badge">{{ cartItemsCount }}</span>
              </router-link>

              <!-- Bouton visible uniquement pour les admins -->
              <router-link v-if="getUser.isAdmin" class="button has-border" to="/ajouter-produit">
                <strong>Ajouter un produit</strong>
              </router-link>

              <!-- Nouveau bouton "Gestion" visible uniquement pour les admins -->
              <router-link v-if="getUser.isAdmin" class="button has-border" to="/gestion">
                <strong>Gestion</strong>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
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
.has-border {
  border-color: #dadada; 
  border-width: 1px; 
  border-style: solid;
}

.cart-badge {
  background-color: #ff3860;
  border-radius: 50%;
  color: white;
  padding: 0 5px;
  margin-left: 5px;
}

</style>