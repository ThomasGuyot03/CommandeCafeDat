<template>
  <div class="app">
      <h1 class="title">Mon Profil</h1>
      <div class="notification is-dark text-align-center">
          Commandez le meilleur de notre café !
      </div>
      <nav class="navbar">
          <div class="navbar-brand">
              <a class="navbar-item" @click="toggleMobileMenu">
                  <span class="icon">
                      <i class="fas fa-bars"></i>
                  </span>
              </a>
          </div>
      </nav>
      <div class="container">
          <div class="columns is-centered">
              <div class="column is-4-tablet is-4-desktop is-3-widescreen">
                  <div class="box">
                      <h2 class="subtitle">Informations Client</h2>
                      <div v-if="isLoading">Chargement des informations...</div>
                      <div v-else>
                          <div class="field">
                              <label class="label">Prénom</label>
                              <p>{{ selectedUser.firstname }}</p>
                          </div>
                          <div class="field">
                              <label class="label">Nom</label>
                              <p>{{ selectedUser.lastname }}</p>
                          </div>
                          <div class="field">
                              <label class="label">Société</label>
                              <p>{{ selectedUser.company }}</p>
                          </div>
                          <div class="field">
                              <label class="label">Adresse</label>
                              <p>{{ selectedUser.address.line }}</p>
                          </div>
                          <div class="field">
                              <label class="label">Adresse e-mail</label>
                              <p>{{ selectedUser.email }}</p>
                          </div>
                          <div class="field">
                              <label class="label">Téléphone</label>
                              <p>{{ selectedUser.phone }}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            selectedUser: {
                firstname: '',
                lastname: '',
                company: '',
                address: '',
                email: '',
                phone: ''
            },
            isLoading: true,
            isMobileMenuOpen: false
        };
    },
    methods: {
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },

        async fetchUserProfile() {
          try {
            const response = await this.$http.get('/user/profile');
            this.selectedUser = response.data
            this.isLoading = false
          } catch (error) {
            this.showToast('error', 'Erreur lors de la récupération de l\'utilisateur');
          }
        }
    },
    mounted() {
        this.fetchUserProfile(); // Appel de la méthode pour récupérer les données au moment du montage du composant
    }
};
</script>

<style scoped>
.navbar-item {
    color: #333;
}

@media screen and (max-width: 768px) {
    .navbar-menu {
        display: none;
    }

    .is-active .navbar-menu {
        display: block;
    }
}

p {
    font-size: 1.2rem;
    color: #555;
    margin-top: 5px;
}
</style>
