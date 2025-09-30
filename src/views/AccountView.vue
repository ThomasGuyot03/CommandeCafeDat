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
  /* Arrière-plan global */
  .app {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 2rem 0;
  }
  
  /* Titre principal */
  .title {
    margin-top: 0;
    margin-bottom: 3rem;
    color: #ffffff;
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.02em;
  }
  
  /* Carte du profil */
  .profile-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 3rem;
    box-shadow: 
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    color: #1f2937;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }
  
  .profile-card:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.3);
  }
  
  .subtitle {
    font-size: 2.2rem;
    color: #374151;
    font-weight: 600;
    margin-bottom: 2.5rem;
    position: relative;
  }
  
  .subtitle::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
  
  /* Effet glassmorphism en haut de la carte */
  .profile-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    border-radius: 24px 24px 0 0;
  }
  
  /* Champs individuels */
  .profile-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
    border: 2px solid transparent;
    border-radius: 16px;
    padding: 1.5rem;
    background: linear-gradient(145deg, #ffffff, #f8fafc);
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .profile-field::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(145deg, transparent, rgba(102, 126, 234, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .profile-field:hover {
    transform: translateY(-2px);
    border-color: rgba(102, 126, 234, 0.3);
    box-shadow: 
      0 8px 25px -8px rgba(102, 126, 234, 0.3),
      0 0 0 1px rgba(102, 126, 234, 0.1);
  }
  
  .profile-field:hover::before {
    opacity: 1;
  }
  
  /* Labels */
  .field-label {
    font-size: 1rem;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 0.5rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: relative;
    z-index: 1;
  }
  
  /* Valeurs */
  .field-value {
    font-size: 1.4rem;
    color: #111827;
    text-align: center;
    font-weight: 500;
    word-break: break-word;
    position: relative;
    z-index: 1;
  }
  
  /* Chargement */
  .loading-message {
    text-align: center;
    font-size: 1.3rem;
    color: #6b7280;
    font-weight: 500;
    padding: 2rem;
    background: linear-gradient(145deg, #f8fafc, #e5e7eb);
    border-radius: 16px;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  /* Responsivité */
  @media screen and (max-width: 768px) {
    .app {
      padding: 1rem 0;
    }
    
    .profile-card {
      padding: 2rem;
      margin: 0 1rem;
      border-radius: 20px;
    }
  
    .title {
      font-size: 2.2rem;
      margin-bottom: 2rem;
    }
    
    .subtitle {
      font-size: 1.8rem;
    }
    
    .profile-field {
      padding: 1.2rem;
      margin-bottom: 1.2rem;
    }
    
    .field-value {
      font-size: 1.2rem;
    }
  }
  
  @media screen and (max-width: 480px) {
    .profile-card {
      margin: 0 0.5rem;
      padding: 1.5rem;
    }
    
    .title {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 1.6rem;
    }
  }
  </style>