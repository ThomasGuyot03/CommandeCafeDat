<template>
  <div class="login-page">
    <h2 class="connexion-title">Connexion</h2>
    
    <div class="login-box">
      <div class="logo-container">
        <img src="https://i.postimg.cc/Y2gHH3HL/1.png" border="0" alt="Logo" class="logo" />
      </div>
      <h1 class="welcome-title">Bienvenue sur DAT Commande</h1>
      <p class="subtitle">Connectez-vous pour continuer</p>
      <form class="form">
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left">
            <input
              type="email"
              placeholder="exemple@gmail.com"
              class="input"
              v-model="customer.email"
            />
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Mot de passe</label>
          <div class="control password-field">
            <div class="control has-icons-left">
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                placeholder="*******"
                class="input"
                v-model="customer.password"
              />
            </div>
            <button type="button" class="eye-icon" @click="togglePasswordVisibility">
              <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </button>
          </div>
        </div>

        <div class="field remember-me">
          <label class="checkbox">
            <input type="checkbox" /> Se souvenir de moi
          </label>
          <a class="forgot-password" href="#" @click.prevent="sendResetRequest">
            Mot de passe oublié ?
          </a>
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div v-else-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        <div class="field">
          <button class="button" @click="login(origin)">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      origin: 'LoginView',
      customer: {
        email: '',
        password: '',
      },
      showPassword: false,
      errorMessage: null,
      successMessage: null,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  transition: background-color 0.3s ease;
}

/* Titre principal */
.connexion-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #1a1f2e;
  font-weight: 600;
  letter-spacing: -0.5px;
}

/* Bloc principal */
.login-box {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  width: 100%;
  max-width: 420px;
  padding: 3rem 2.5rem;
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.login-box:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Logo */
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.logo {
  width: 160px;
  height: auto;
}

/* Titres */
.welcome-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1f2e;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

/* Champs */
.field {
  margin-bottom: 1.5rem;
  text-align: left;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

/* Icones dans les champs */
.control.has-icons-left {
  position: relative;
}

.control.has-icons-left .icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 0.9rem;
}

.control.has-icons-left .input {
  padding-left: 2.5rem;
}

/* Mot de passe + œil */
.password-field {
  position: relative;
}

.password-field .eye-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s ease;
}

.password-field .eye-icon:hover {
  color: #3498db;
}

/* Souvenir et lien */
.remember-me {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
}

.checkbox input {
  margin-right: 0.4rem;
}

.forgot-password {
  color: #3498db;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-password:hover {
  color: #2980b9;
  text-decoration: underline;
}

/* Messages */
.error-message,
.success-message {
  font-size: 0.9rem;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  text-align: left;
  border-left: 3px solid;
  animation: fadeIn 0.3s ease;
}

.error-message {
  background: #fee;
  color: #c33;
  border-color: #c33;
}

.success-message {
  background: #e6ffed;
  color: #0f5132;
  border-color: #198754;
}

/* Bouton */
.button {
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
  margin-top: 0.5rem;
}

.button:hover {
  background: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.2);
}

.button:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .login-box {
    padding: 2rem 1.5rem;
  }

  .connexion-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .welcome-title {
    font-size: 1.25rem;
  }

  .button {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 2rem 1rem;
  }

  .connexion-title {
    font-size: 1.5rem;
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
