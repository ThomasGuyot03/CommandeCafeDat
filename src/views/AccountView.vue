<template>
  <div class="app">
      <h1 class="title">Mon Profil</h1>
      <div class="notification is-light text-align-center">
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
          <div class="navbar-menu" :class="{ 'is-active': isMobileMenuOpen }">
              <div class="navbar-start">
                  <router-link to="/commands" class="navbar-item">Mes commandes</router-link>
                  <router-link to="/cart" class="navbar-item">Mon panier</router-link>
                  <router-link to="/profil" class="navbar-item">Mon profil</router-link>
              </div>
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
                              <p>{{ selectedUser.address }}</p>
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
  fetchUserProfile() {
    // Supposons que l'API renvoie les informations de l'utilisateur connecté
    fetch('/api/user/profile', { 
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`  // Utilisation d'un token de session s'il existe
      }
    })
    .then(response => response.json())
    .then(data => {
      this.selectedUser = data;  // Assigner les données récupérées à selectedUser
      this.isLoading = false;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du profil:', error);
      this.isLoading = false;
    });
  }
},
mounted() {
    fetch('/api/user/profile', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Le token JWT est récupéré depuis le localStorage
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    })
    .then(data => {
        this.selectedUser = data; // Mise à jour des données utilisateur dans la vue
    })
    .catch(error => {
        console.error('Erreur lors de la récupération du profil:', error);
    });
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
