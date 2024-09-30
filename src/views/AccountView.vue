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
              <form @submit.prevent="saveUser">
                <div class="field">
                  <label class="label">Prénom</label>
                  <div class="control">
                    <input class="input" type="text" v-model="user.firstname" placeholder="Prénom">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Nom</label>
                  <div class="control">
                    <input class="input" type="text" v-model="user.lastname" placeholder="Nom">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Société</label>
                  <div class="control">
                    <input class="input" type="text" v-model="user.company" placeholder="Société">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Adresse</label>
                  <div class="control">
                    <input class="input" type="text" v-model="user.address" placeholder="Adresse">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Adresse e-mail</label>
                  <div class="control">
                    <input class="input" type="email" v-model="user.email" placeholder="exemple@gmail.com">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Mot de passe</label>
                  <div class="control">
                    <input class="input" type="password" v-model="user.password" placeholder="*******">
                  </div>
                </div>
                <div class="field">
                  <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                  </div>
                  <div class="control">
                    <button 
                      class="button is-primary is-fullwidth"
                      @click="saveUser">Sauvegarder</button>
                  </div>
                </div>
              </form>
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
       user: {
         firstname: '',
         lastname: '',
         company: '',
         address: '',
         email: '',
         password: ''
       },
       isMobileMenuOpen: false,
       errorMessage: ''
     };
   },
   methods: {
     saveUser() {
       // Ici, tu peux ajouter la logique pour sauvegarder les données utilisateur
       console.log('Données utilisateur enregistrées', this.user);
     },
     toggleMobileMenu() {
       this.isMobileMenuOpen = !this.isMobileMenuOpen;
     }
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

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
  