<template>
  <div class="home" :class="{ 'dark-mode': darkMode }">
    <h1 class="title">Inscription</h1>

    <div class="signup-page">
      <div class="container">
        <div class="columns is-centered">
          <!-- Formulaire divisé en 2 colonnes sur desktop et une seule sur mobile -->
          <div class="column is-12-mobile is-8-tablet is-6-desktop">
            <div class="box">
              <form @submit-prevent="signup">
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
      darkMode: false,
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
      this[field] = this[field].replace(/[^a-zA-ZÀ-ÿ '-]/g, '');
    },
    async signup() {
      try {
        if (!this.firstname) {
          this.errorMessage = "Le prénom est requis.";
          this.showToast('error', this.errorMessage);
          return;
        }

        if (!this.name) {
          this.errorMessage = "Le nom est requis.";
          this.showToast('error', this.errorMessage);
          return;
        }

        if (!this.company) {
          this.errorMessage = "La société est requis.";
          this.showToast('error', this.errorMessage);
          return;
        }

        if (!this.line) {
          this.errorMessage = "L'adresse est requis.";
          this.showToast('error', this.errorMessage);
          return;
        }

        if (!this.email) {
          this.errorMessage = "L'adresse e-mail est requise.";
          this.showToast('error', this.errorMessage);
          return;
        }

        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(this.email)) {
          this.errorMessage = "Veuillez entrer une adresse e-mail valide.";
          this.showToast('error', this.errorMessage);
          return;
        }

        if (!this.password) {
          this.errorMessage = "Le mot de passe est requis.";
          this.showToast('error', this.errorMessage);
          return;
        }

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

        if (this.line && this.line.trim() === "") {
          this.errorMessage = "L'adresse ne peut pas être vide si renseignée.";
          this.showToast('error', this.errorMessage);
          return;
        }

        if (this.zip_code && this.zip_code.trim() === "") {
          this.errorMessage = "Le code postal ne peut pas être vide si renseigné.";
          this.showToast('error', this.errorMessage);
          return;
        }

        if (this.city && this.city.trim() === "") {
          this.errorMessage = "La ville ne peut pas être vide si renseignée.";
          this.showToast('error', this.errorMessage);
          return;
        }

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

        const response = await this.$http.post('/user/signup', params);

        if (response.status === 201) {
          this.showToast('success', 'Inscription réussie !');
          this.$router.push('/login');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.showToast('error', 'Cette adresse email est déjà utilisée.');
        } else {
          this.showToast('error', "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
        }
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 3rem 0;
  transition: background-color 0.3s ease;
}

.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #1a1f2e;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.signup-page {
  display: flex;
  justify-content: center;
  padding: 0 1.5rem;
}

.columns {
  margin: 0;
}

.label {
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.box {
  padding: 3rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  border: 1px solid #e8e8e8;
}

.box:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.field {
  margin-bottom: 1.5rem;
}

.control {
  position: relative;
}

.input {
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  color: #1a1f2e;
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  width: 100%;
  font-weight: 400;
}

.input::placeholder {
  color: #9ca3af;
}

.input:hover {
  border-color: #9ca3af;
}

.input:focus {
  background-color: #ffffff;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  outline: none;
}

.button.is-primary {
  background: #3498db;
  border: none;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;
  margin-top: 1.5rem;
}

.button.is-primary:hover {
  background: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.2);
}

.button.is-primary:active {
  transform: translateY(0);
  box-shadow: none;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.875rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 6px;
  text-align: left;
  font-size: 0.9rem;
  border-left: 3px solid #c33;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.help-is-info {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.625rem;
  line-height: 1.5;
}

.help-is-info ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0.375rem 0 0 0;
}

.help-is-info li {
  margin: 0.375rem 0;
  padding-left: 1.25rem;
  position: relative;
  transition: color 0.2s ease;
  color: #6b7280;
}

.help-is-info li::before {
  content: '○';
  position: absolute;
  left: 0;
  color: #9ca3af;
  font-size: 0.7rem;
}

.has-text-success {
  color: #059669;
}

.has-text-success::before {
  content: '✓';
  color: #059669;
  font-weight: 700;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .box {
    padding: 2rem 1.5rem;
  }

  .signup-page {
    padding: 0 1rem;
  }

  .button.is-primary {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .home {
    padding: 2rem 0;
  }

  .title {
    font-size: 1.5rem;
  }

  .box {
    padding: 1.5rem 1rem;
  }

  .label {
    font-size: 0.8rem;
  }

  .input {
    font-size: 0.9rem;
    padding: 0.65rem 0.875rem;
  }
}
</style>
