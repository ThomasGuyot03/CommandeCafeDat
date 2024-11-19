<template>
    <div class="login-page">
      <h2 class="connexion-title">Connexion</h2>
      
      <div class="login-box">
        <div class="logo-container">
          <img src="https://i.postimg.cc/mk088cKJ/Design-sans-titre-8.png" border="0" alt="Logo" class="logo" />
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
              <input
                :type="showPassword ? 'text' : 'password'"
                placeholder="*******"
                class="input"
                v-model="customer.password"
              />
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-family: 'Arial', sans-serif;
    height: 100vh;
  }
  
  .logo {
    width: 200px;
    height: auto;
  }
  
  .connexion-title {
    font-size: 2.8rem;
    font-weight: bold;
    color: #303649;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .login-box {
    background-color: #303649;
    border-radius: 5px;
    padding: 2.5rem;
    width: 400px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    text-align: center;
    position: relative;
  }
  
  .login-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #00ffcc, #0077a6);
    border-radius: 12px 12px 0 0;
  }
  
  .welcome-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }
  
  .subtitle {
    font-size: 1rem;
    color: #bbbbbb;
    margin-bottom: 2rem;
  }
  
  .form .field {
    margin-bottom: 1.5rem;
  }
  
  .label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffffff;
    text-align: left;
  }
  
  .input {
    background-color: #2a2a2a;
    border: 1px solid #444444;
    color: #ffffff;
    padding: 0.8rem 0.8rem 0.8rem 2.5rem;
    border-radius: 4px;
    width: 100%;
    font-size: 0.9rem;
  }
  
  .input:focus {
    outline: none;
    border-color: #ffffff;
  }
  
  .control.has-icons-left .input {
    padding-left: 3rem;
  }
  
  .control.has-icons-left .icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #bbbbbb;
  }
  
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
    color: #bbbbbb;
    cursor: pointer;
  }
  
  .password-field .eye-icon i {
    font-size: 1.2rem;
  }
  
  .remember-me {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .checkbox input {
    margin-right: 0.5rem;
  }
  
  .forgot-password {
    font-size: 0.9rem;
    color: #00ffcc;
    text-decoration: none;
    cursor: pointer;
  }
  
  .forgot-password:hover {
    text-decoration: underline;
  }
  
  .error-message {
    color: #ff6b6b;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .success-message {
    color: #6bff6b;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .button {
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
  
  .button:hover {
    background-color: #00e6b3;
  }
  </style>
  