<template>
    <div class="app">
      <h1 class="title">Mon Profil</h1>
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8">
            <div class="profile-card">
              <h2 class="subtitle">Informations Client</h2>
              <div v-if="isLoading" class="loading-message">
                Chargement des informations...
              </div>
              <div v-else>
                <div class="profile-field">
                  <label class="field-label">Prénom:</label>
                  <div class="field-value">{{ selectedUser.firstname }}</div>
                </div>
                <div class="profile-field">
                  <label class="field-label">Nom:</label>
                  <div class="field-value">{{ selectedUser.lastname }}</div>
                </div>
                <div class="profile-field">
                  <label class="field-label">Société:</label>
                  <div class="field-value">{{ selectedUser.company }}</div>
                </div>
                <div class="profile-field">
                  <label class="field-label">Adresse:</label>
                  <div class="field-value">{{ selectedUser.address.line }}</div>
                </div>
                <div class="profile-field">
                  <label class="field-label">Adresse e-mail:</label>
                  <div class="field-value">{{ selectedUser.email }}</div>
                </div>
                <!-- Téléphone -->
                <!-- <div class="profile-field">
                  <label class="field-label">Téléphone:</label>
                  <div class="field-value">{{ selectedUser.phone }}</div>
                </div> -->
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
          this.selectedUser = response.data;
          this.isLoading = false;
        } catch (error) {
          this.showToast('error', 'Erreur lors de la récupération de l\'utilisateur');
        }
      }
    },
    mounted() {
      this.fetchUserProfile(); // Récupérer les données lors du montage du composant
    }
  };
  </script>
  
  <style scoped>
  /* Titre principal */
  .title {
    margin-top: 2rem;
    color: #303649;
    font-size: 2.8rem;
    font-weight: bold;
    text-align: center;
  }
  
  /* Carte du profil */
  .profile-card {
    background-color: #303649; /* Fond sombre */
    border-radius: 12px; /* Coins arrondis */
    padding: 2.5rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    color: #ffffff;
    max-width: 600px;
    margin: 0 auto;
    text-align: center; /* Centre le texte dans toute la carte */
    position: relative;
  }
  
  .subtitle {
    font-size: 2rem;
    color: #ffffff;
  }
  
  /* Gradient en haut de la carte */
  .profile-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #00ffcc, #0077a6);
    border-radius: 12px 12px 0 0;
  }
  
  /* Champs individuels */
  .profile-field {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centre le texte et les labels horizontalement */
    margin-bottom: 1.5rem;
    border: 1px solid #d3d3d3; /* Bordure grise */
    border-radius: 6px;
    padding: 1rem;
    background-color: #2a2a2a; /* Fond contrasté */
  }
  
  /* Labels */
  .field-label {
    font-size: 1.2rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.5rem;
    text-align: center; /* Centre le label */
  }
  
  /* Valeurs */
  .field-value {
    font-size: 1.2rem;
    color: #d3d3d3; /* Texte légèrement gris */
    text-align: center; /* Centre la valeur */
  }
  
  /* Chargement */
  .loading-message {
    text-align: center;
    font-size: 1.2rem;
    color: #ffffff;
  }
  
  /* Responsivité */
  @media screen and (max-width: 768px) {
    .profile-card {
      padding: 2rem;
      margin: 0 auto; /* Centre horizontalement */
      width: calc(100% - 4rem); /* Réduit la largeur et ajoute de l'espace sur les côtés */
    }
  
    .title {
      font-size: 2rem;
    }
  
    .profile-card {
      padding: 2rem;
    }
  }
  </style>
  