import process from 'process'
import { createApp } from 'vue'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/styles.css'
import './assets/js/bulma.js'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import NavBar from '@/components/NavBar.vue'
import FooterVue from '@/components/FooterVue.vue'
import FilterCollapse from '@/components/FilterCollapse.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import GenericMixin from '@/mixins/GenericMixin.js'

window.process = process
axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, error => {
    return Promise.reject(error)
})

const app = createApp(App)

const token = localStorage.getItem('token')
if (token) {
  const decodedToken = jwt.decode(token)
  store.dispatch('updateUser', decodedToken)
}

const cartData = localStorage.getItem('cart');
if (cartData) {
  try {
    const cleCryptage = process.env.VUE_APP_CRYPTO_SECRET;
    if (!cleCryptage) {
      throw new Error("La clé de chiffrement est manquante.");
    }

    const decryptedBytes = CryptoJS.AES.decrypt(cartData, cleCryptage);

    console.log('decryptedBytes', decryptedBytes);

    // Vérification si les données sont déchiffrées correctement
    const panierDecrypte = decryptedBytes.toString(CryptoJS.enc.Utf8);

    if (!panierDecrypte) {
      throw new Error("Le déchiffrement a échoué ou a produit des données vides.");
    }

    // Vérification si les données sont un JSON valide
    try {
      const parsedPanier = JSON.parse(panierDecrypte);
      store.state.cartId = cartData;
      store.state.cart = parsedPanier;
      console.log('panier => ', parsedPanier);
    } catch (jsonError) {
      console.error("Erreur lors du parsing JSON : ", jsonError);
      console.error("Données déchiffrées : ", panierDecrypte);
    }
  } catch (error) {
    console.error("Erreur lors du déchiffrement : ", error);
  }
} else {
  console.log("Aucune donnée de panier trouvée dans le localStorage.");
}

app.config.globalProperties.$http = axios
app.component('NavBar', NavBar)
app.component('FooterVue', FooterVue)
app.component('PaginationComponent', PaginationComponent)
app.component('FilterCollapse', FilterCollapse)
app.mixin(GenericMixin)

app.use(store).use(router).mount('#app')
