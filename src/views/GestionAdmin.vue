<template>
  <div class="columns is-8 is-gapless is-fullheight">
    <!-- Menu de navigation à gauche -->
    <div class="column is-one-fifth has-background-light p-4">
      <div class="menu">
        <div class="columns is-multiline">
          <div class="column is-full">
            <router-link to="/gestion/produits">
              <div class="menu-square box has-text-centered has-background-grey-dark has-text-white">
                <i class="fas fa-box"></i> Gestion Produits
              </div>
            </router-link>
          </div>
          <div class="column is-full">
            <router-link to="/gestion/commandes">
              <div class="menu-square box has-text-centered has-background-grey-dark has-text-white">
                <i class="fas fa-receipt"></i> Gestion Commandes
              </div>
            </router-link>
          </div>
          <div class="column is-full">
            <router-link to="/gestion/utilisateurs">
              <div class="menu-square box has-text-centered has-background-grey-dark has-text-white">
                <i class="fas fa-users"></i> Gestion Utilisateurs
              </div>
            </router-link>
          </div>
          <div class="column is-full">
            <router-link to="/gestion/graphique">
              <div class="menu-square box has-text-centered has-background-grey-dark has-text-white">
                <i class="fas fa-chart-line"></i> Graphique
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="column p-5">
      <h1 class="title">Menu Administrateur</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "GestionAdmin",
}
</script>

<style scoped>
.menu-square {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Espace entre l'icône et le texte */
}

.menu-square:hover {
  background-color: #adadad;
}
</style>
