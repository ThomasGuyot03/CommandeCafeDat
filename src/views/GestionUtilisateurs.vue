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
.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #1a1f2e;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.loading-indicator {
  text-align: center;
  font-size: 1.4rem;
  color: #6b7280;
  margin-top: 30px;
}

/* TABLE */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.table th,
.table td {
  padding: 15px 12px;
}

.table th {
  background-color: #f3f4f6;
  color: #374151;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.table td {
  background-color: #ffffff;
  color: #4b5563;
  font-size: 0.9rem;
  vertical-align: middle;
}

.table tr:nth-child(even) td {
  background-color: #f9fafb;
}

.table tr:hover td {
  background-color: #eef2f7;
  transition: background-color 0.3s;
}

/* BOUTONS */
.button.is-info {
  background: #3b82f6;
  color: #ffffff;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.2s ease;
}

.button.is-info:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

/* MODALE */
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 420px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  animation: modalFade 0.3s ease;
}

@keyframes modalFade {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close {
  cursor: pointer;
  float: right;
  font-size: 1.5rem;
  color: #6b7280;
  transition: color 0.2s ease;
}

.close:hover {
  color: #111827;
}

.modal-content h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #1a1f2e;
  font-size: 1.4rem;
  font-weight: 600;
}

.client-info p {
  margin: 10px 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #374151;
}

.client-info strong {
  color: #1a1f2e;
}

.close-button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.2s ease;
}

.close-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

/* TRANSITIONS */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

/* RESPONSIVE */
@media screen and (max-width: 768px) {
  .table {
    font-size: 0.85rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }

  .table thead {
    display: none;
  }

  .table tr {
    display: block;
    margin-bottom: 20px;
    border-bottom: 2px solid #e5e7eb;
  }

  .table td {
    display: flex;
    justify-content: space-between;
    padding: 10px 8px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    position: relative;
  }

  .table td::before {
    content: attr(data-label);
    font-weight: 600;
    text-transform: capitalize;
    color: #6b7280;
    width: 50%;
    flex-shrink: 0;
  }

  .table td:last-child {
    text-align: right;
    border-bottom: 0;
  }

  .button.is-info {
    font-size: 0.8rem;
    padding: 5px 10px;
  }

  .modal-content {
    width: 90%;
    padding: 20px;
  }
}

</style>
