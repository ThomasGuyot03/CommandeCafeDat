<template>
  <div class="columns is-8 is-gapless is-fullheight">
    <div class="column p-5">
      <h1 class="title custom-title">Menu Administrateur</h1>
      
      <!-- Les boutons alignés horizontalement et responsives -->
      <div class="menu-horizontal columns is-mobile is-multiline is-gapless">
        <div class="column is-one-quarter-desktop is-half-mobile">
          <router-link to="/gestion/produits">
            <div class="menu-square">
              <i class="fas fa-box"></i> 
              <span>Gestion Produits</span> <!-- Ajout d'un span autour du texte -->
            </div>
          </router-link>
        </div>
        <div class="column is-one-quarter-desktop is-half-mobile">
          <router-link to="/gestion/commandes">
            <div class="menu-square">
              <i class="fas fa-receipt"></i> 
              <span>Gestion Commandes</span>
            </div>
          </router-link>
        </div>
        <div class="column is-one-quarter-desktop is-half-mobile">
          <router-link to="/gestion/utilisateurs">
            <div class="menu-square">
              <i class="fas fa-users"></i> 
              <span>Gestion Utilisateurs</span>
            </div>
          </router-link>
        </div>
        <div class="column is-one-quarter-desktop is-half-mobile">
          <router-link to="/gestion/graphique">
            <div class="menu-square">
              <i class="fas fa-chart-line"></i> 
              <span>Graphique</span>
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

.column.p-5 {
  margin-left: 220px; /* Décale le contenu de 220px pour laisser de la place à la navbar */
}

.menu-horizontal {
  margin-top: 20px; /* Espace entre le titre et les boutons */
}

.custom-title {
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 50px;
}

.menu-square {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centre les éléments horizontalement */
  justify-content: center; /* Centre les éléments verticalement */
  padding: 20px;
  gap: 8px; /* Espace entre l'icône et le texte */
  cursor: pointer;
  background-color: #303649; /* Couleur de fond personnalisée */
  color: white; /* Couleur du texte */
  border-radius: 5px; /* Arrondir les bords des boutons */
  transition: background-color 0.3s; /* Animation pour le changement de couleur */
  height: 100px; /* Hauteur fixe pour assurer que tous les boutons aient la même taille */
  margin: 10px; /* Espace externe pour espacer les boutons */
  text-align: center; /* Centre le texte à l'intérieur des boutons */
}

.menu-square i {
  font-size: 24px; /* Taille de l'icône */
}

.menu-square:hover {
  background-color: #475057; /* Couleur de fond lors du survol */
}

/* S'assurer que chaque bouton prend la même largeur sur mobile */
.column.is-half-mobile {
  padding: 10px; /* Espace autour des colonnes */
}

/* Pour ajuster l'affichage sur mobile */
@media (max-width: 768px) {
  .column.p-5 {
    margin-left: 0px; /* Supprimer la marge sur mobile */
  }

  .menu-horizontal {
    justify-content: center; /* Centrer les boutons horizontalement sur mobile */
  }

  .menu-square {
    height: 80px; /* Ajuster la hauteur des boutons sur mobile */
    padding: 10px; /* Diminuer l'espacement interne pour mobile */
  }

  .menu-square i {
    font-size: 20px; /* Réduire la taille de l'icône pour mobile */
  }

  .menu-square span {
    font-size: 14px; /* Ajuster la taille du texte sur mobile */
  }
}
</style>
