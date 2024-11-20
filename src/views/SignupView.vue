<template>
  <div class="home" :class="{ 'dark-mode': darkMode }">
    <h1 class="title">Inscription</h1>

    <div class="signup-page">
      <div class="container">
        <div class="columns is-centered">
          <!-- Formulaire divisé en 2 colonnes sur desktop et une seule sur mobile -->
          <div class="column is-12-mobile is-8-tablet is-6-desktop">
            <div class="box">
              <form @submit.prevent="signup">
                <!-- Ligne 1 - Prénom et Nom -->
                <div class="columns is-multiline">
                  <div class="column is-12-mobile is-6-desktop">
                    <div class="field">
                      <label class="label">Prénom</label>
                      <div class="control">
                        <input class="input" type="text" v-model="firstname" placeholder="Prénom" @input="sanitizeInput('firstname')">
                      </div>
                    </div>
                  </div>
                  <div class="column is-12-mobile is-6-desktop">
                    <div class="field">
                      <label class="label">Nom</label>
                      <div class="control">
                        <input class="input" type="text" v-model="name" placeholder="Nom" @input="sanitizeInput('name')">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Ligne 2 - Société et Adresse -->
                <div class="columns is-multiline">
                  <div class="column is-12-mobile is-6-desktop">
                    <div class="field">
                      <label class="label">Société</label>
                      <div class="control">
                        <input class="input" type="text" v-model="company" placeholder="Entreprise">
                      </div>
                    </div>
                  </div>
                  <div class="column is-12-mobile is-6-desktop">
                    <div class="field">
                      <label class="label">Adresse</label>
                      <div class="control">
                        <input class="input" type="text" v-model="line" placeholder="Adresse">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Ligne 3 - Code postal et Ville -->
                <div class="columns is-multiline">
                  <div class="column is-12-mobile is-6-desktop">
                    <div class="field">
                      <label class="label">Code postal</label>
                      <div class="control">
                        <input class="input" type="text" v-model="zip_code" placeholder="Code postal">
                      </div>
                    </div>
                  </div>
                  <div class="column is-12-mobile is-6-desktop">
                    <div class="field">
                      <label class="label">Ville</label>
                      <div class="control">
                        <input class="input" type="text" v-model="city" placeholder="Ville">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Ligne 4 - Email et Mot de passe -->
                <div class="columns is-multiline">
                  <div class="column is-12-mobile is-6-desktop">
                    <div class="field">
                      <label class="label">Adresse e-mail</label>
                      <div class="control">
                        <input class="input" type="email" v-model="email" placeholder="Exemple@exemple.com">
                      </div>
                    </div>
                  </div>
                  <div class="column is-12-mobile is-6-desktop">
                    <div class="field">
                      <label class="label">Mot de passe</label>
                      <div class="control">
                        <input class="input" type="password" v-model="password" placeholder="*******">
                      </div>
                      <!-- Instructions dynamiques pour le mot de passe -->
                      <p class="help-is-info">
                        Le mot de passe doit contenir :
                        <ul>
                          <li :class="{ 'has-text-success': passwordLengthValid }">Au moins 8 caractères</li>
                          <li :class="{ 'has-text-success': passwordUppercaseValid }">Au moins une lettre majuscule</li>
                          <li :class="{ 'has-text-success': passwordLowercaseValid }">Au moins une lettre minuscule</li>
                          <li :class="{ 'has-text-success': passwordNumberValid }">Au moins un chiffre</li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Message d'erreur et bouton -->
                <div class="field">
                  <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                  </div>
                  <div class="control">
                    <button class="button is-primary is-fullwidth" type="submit">Créer un compte</button>
                  </div>
                </div>
              </form>
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
      darkMode: false,  // Etat initial du mode sombre
      firstname: null,
      name: null,
      email: null,
      password: null,
      errorMessage: null,
      line: null,
      zip_code: null,
      city: null,
      country: "France",
      company: null
    };
  },
  computed: {
    // Validation des conditions du mot de passe
    passwordLengthValid() {
      return this.password && this.password.length >= 8;
    },
    passwordUppercaseValid() {
      return /[A-Z]/.test(this.password);
    },
    passwordLowercaseValid() {
      return /[a-z]/.test(this.password);
    },
    passwordNumberValid() {
      return /\d/.test(this.password);
    }
  },
  methods: {
    sanitizeInput(field) {
      // Nettoyer les entrées pour éviter les caractères non autorisés
      this[field] = this[field].replace(/[^a-zA-ZÀ-ÿ '-]/g, '');
    },
    async signup() {
      try {
        // Vérification des champs obligatoires
        if (!this.firstname || !this.name || !this.email || !this.password) {
          this.errorMessage = "Veuillez remplir tous les champs.";
          this.showToast('error', this.errorMessage);
          return;
        }

        // Validation de l'email
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(this.email)) {
          this.errorMessage = "Veuillez entrer une adresse email valide.";
          this.showToast('error', this.errorMessage);
          return;
        }

        // Validation des critères de mot de passe
        if (
          !this.passwordLengthValid ||
          !this.passwordUppercaseValid ||
          !this.passwordLowercaseValid ||
          !this.passwordNumberValid
        ) {
          this.errorMessage =
            "Le mot de passe doit respecter les conditions : au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre.";
          this.showToast('error', this.errorMessage);
          return;
        }

        // Préparation des paramètres d'inscription
        const params = {
          firstname: this.firstname,
          name: this.name,
          email: this.email,
          password: this.password,
          accountId: this.$appConfig.accountId,
          address: {
            line: this.line,
            zip_code: this.zip_code,
            city: this.city,
            country: this.country
          },
          company: this.company
        };

        // Envoi de la requête d'inscription
        const response = await this.$http.post('/user/signup', params);

        if (response.status === 201) {
          // Succès de l'inscription
          this.showToast('success', 'Inscription réussie !');
          this.$router.push('/login');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Erreur d'email déjà utilisé
          this.showToast('error', "L'adresse e-mail est déjà utilisée.");
        } else {
          // Erreur générale
          this.showToast('error', "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
        }
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
/* Mode clair par défaut */
.home {
  margin-top: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.title {
  font-size: 2.8rem;
  text-align: center;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.signup-page {
  display: flex;
  justify-content: center;
  padding: 1rem 3rem;
}

.columns {
  color: #303649;
}

/* Pour les étiquettes de champs */
.label {
  color: white;
}

/* Boîte du formulaire */
.box {
  padding: 2rem;
  background-color: #303649;
  border-radius: 8px;
  color: white;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Button styling for the sign-up page */
.button.is-primary {
  background-color: #ffffff;
  border: none;
  color: #121212;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
}

.button.is-primary:hover {
  background: linear-gradient(90deg, #00ffcc, #0077a6);
}


.input:focus {
  border-color: #4060ff;
  box-shadow: 0 0 5px rgba(64, 96, 255, 0.5);
}

/* Affichage de l'alerte d'erreur */
.error-message {
  background-color: #ff5252;
  color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  text-align: center;
}

/* Conditions de mot de passe */
.help-is-info {
  font-size: 0.9rem;
  color: #b0b0b0;
}

.help-is-info ul {
  list-style-type: none;
  padding-left: 0;
}

.help-is-info li {
  margin: 5px 0;
}

.has-text-success {
  color: #34d399;
}

</style>
