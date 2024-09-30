<template>
  <div>
    <h1 class="title">Gestion des Utilisateurs</h1>
    <div  v-if="loading" class="loading-indicator">Chargement...</div>
    <table v-else class="table">
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Mail</th>
          <th>Société</th>
          <th>Compte Client</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstname }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.company }}</td>
          <td v-if="clientAccount">{{ clientAccount.name }}</td>
          <td>
            <button class="button is-info" @click="openModal(user)">
              Fiche Client
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <transition name="modal">
      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>Fiche Client</h2>
          <div class="client-info">
            <p><strong>Prénom:</strong> {{ selectedUser.firstname }}</p>
            <p><strong>Nom:</strong> {{ selectedUser.name }}</p>
            <p><strong>Adresse:</strong> {{ selectedUser.address.line }}</p>
            <p><strong>Société:</strong> {{ selectedUser.company }}</p>
            <p><strong>Email:</strong> {{ selectedUser.email }}</p>
            <p><strong>Téléphone:</strong> {{ selectedUser.phone }}</p>
          </div>
          <button class="close-button" @click="closeModal">Fermer</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'GestionUtilisateurs',
  data() {
    return {
      loading: true,
      users: [],
      clientAccount: null,
      isModalOpen: false,
      selectedUser: {}
    };
  },
  mounted() {
    this.fetchUsers();
    // this.fetchClientAccount();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$http.get('/users', {
          params: { accountId: this.$appConfig.accountId }
        });
        this.users = response.data;
        this.loading = false;
        console.log('this.users', this.users)
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },
    // async fetchClientAccount() {
    //   try {
    //     const response = await this.$http.get('/client-account', {
    //       params: { accountId: this.$appConfig.accountId }
    //     });
    //     this.clientAccount = response.data;
    //   } catch (error) {
    //     console.error('Erreur lors de la récupération du compte client:', error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    openModal(user) {
      this.selectedUser = user;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedUser = {};
    }
  }
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  font-size: 2.5rem; /* Taille du titre */
  margin-bottom: 20px; /* Espace en bas du titre */
  color: #333; /* Couleur du titre */
}

.loading-indicator {
  text-align: center;
  font-size: 1.5rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px; 
  margin-right: 5%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); 
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 12px; /* Augmentation du padding */
  text-align: left; /* Alignement à gauche */
}

.table th {
  background-color: #f2f2f2; /* Couleur de fond des en-têtes */
  color: #555; /* Couleur du texte des en-têtes */
  font-weight: bold; /* Gras pour les en-têtes */
}

.table tr:nth-child(even) {
  background-color: #f9f9f9; /* Couleur de fond alternée */
}

.table tr:hover {
  background-color: #eaeaea; /* Couleur de survol */
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.close {
  cursor: pointer;
  float: right;
  font-size: 1.5rem;
}

.client-info p {
  margin: 10px 0;
  font-size: 1rem;
  line-height: 1.5;
}

.close-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
}

.close-button:hover {
  background-color: #0056b3;
}

/* Styles de transition */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
