import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditProduct from '@/views/EditProductModal.vue'; // Assurez-vous que le chemin est correct

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/AccountView.vue')
  },
  {
    path: '/panier',
    name: 'panier',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/reset-password/:id',
    name: 'reset-password',
    component: () => import('../views/ResetPasswordView.vue')
  },
  {
    path: '/pre-order/',
    name: 'order',
    component: () => import('../views/OrderView.vue')
  },

  {
    path: '/ajouter-produit',
    name: 'add-product',
    component: () => import('../views/AddProduct.vue') // Assure-toi que le chemin est correct
  },
  {
    path: '/edit-product/:id',
    name: 'edit-product',
    component: EditProduct,
    props: true // Permet de passer des paramètres à la vue
  },
  // {
  //   path: '/product/:id',
  //   name: 'ProductPage',
  //   component: () => import('@/components/ProductPage.vue')
  // },
  {
    path: '/gestion',
    name: 'GestionAdmin',
    component: () => import('@/views/GestionAdmin.vue'),
    children: [
      {
        path: 'produits',
        name: 'GestionProduits',
        component: () => import('@/views/GestionProduits.vue')
      },
      {
        path: 'commandes',
        name: 'GestionCommandes',
        component: () => import('@/views/GestionCommandes.vue')
      },
      {
        path: 'utilisateurs',
        name: 'GestionUtilisateurs',
        component: () => import('@/views/GestionUtilisateurs.vue')
      }
    ]
  }
  // Autres routes
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
