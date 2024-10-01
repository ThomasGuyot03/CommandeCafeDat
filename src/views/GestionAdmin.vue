<template>
  <div class="columns is-8 is-gapless is-fullheight">
    <div class="column p-5">
      <h1 class="title custom-title">Menu Administrateur</h1>
      
      <!-- Les boutons alignés horizontalement et responsives -->
      <div class="menu-horizontal columns is-mobile is-multiline is-gapless">
        <div class="column is-one-quarter-desktop is-half-mobile">
          <router-link to="/gestion/produits">
            <div class="menu-square">
              <i class="fas fa-box"></i> Gestion Produits
            </div>
          </router-link>
        </div>
        <div class="column is-one-quarter-desktop is-half-mobile">
          <router-link to="/gestion/commandes">
            <div class="menu-square">
              <i class="fas fa-receipt"></i> Gestion Commandes
            </div>
          </router-link>
        </div>
        <div class="column is-one-quarter-desktop is-half-mobile">
          <router-link to="/gestion/utilisateurs">
            <div class="menu-square">
              <i class="fas fa-users"></i> Gestion Utilisateurs
            </div>
          </router-link>
        </div>
        <div class="column is-one-quarter-desktop is-half-mobile">
          <router-link to="/gestion/graphique">
            <div class="menu-square">
              <i class="fas fa-chart-line"></i> Graphique
            </div>
          </router-link>
        </div>
      </div>

      <!-- Contenu du gestionnaire -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "GestionAdmin",
};
</script>

<style scoped>
/* Style pour que les boutons soient alignés horizontalement */
.menu-horizontal {
  margin-top: 20px; /* Ajout d'un espace entre le titre et les boutons */
}

.custom-title {
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 50px;
}

.menu-square {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 8px; /* Espace entre l'icône et le texte */
  cursor: pointer;
  background-color: #303649; /* Couleur de fond personnalisée */
  color: white; /* Couleur du texte */
  border-radius: 5px; /* Arrondir les bords des boutons */
  transition: background-color 0.3s; /* Animation pour le changement de couleur */
  height: 100px; /* Hauteur fixe pour assurer que tous les boutons aient la même taille */
}

.menu-square:hover {
  background-color: #475057; /* Couleur de fond lors du survol */
}

/* S'assurer que chaque bouton prend la même largeur sur mobile */
.column.is-half-mobile {
  padding: 10px; /* Pour ajouter de l'espace entre les colonnes sur mobile */
}

/* Pour ajuster l'affichage sur mobile */
@media (max-width: 768px) {
  .menu-horizontal {
    justify-content: center;
  }
}
</style>
