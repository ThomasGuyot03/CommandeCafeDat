<template>
  <div class="admin-home">
    <h1 class="title">Menu Administrateur</h1>

    <div class="menu-grid">
      <router-link to="/gestion/produits" class="menu-card">
        <i class="fas fa-box"></i>
        <span>Gestion Produits</span>
      </router-link>

      <router-link to="/gestion/commandes" class="menu-card">
        <i class="fas fa-receipt"></i>
        <span>Gestion Commandes</span>
      </router-link>

      <router-link to="/gestion/utilisateurs" class="menu-card">
        <i class="fas fa-users"></i>
        <span>Gestion Utilisateurs</span>
      </router-link>

      <router-link to="/gestion/graphique" class="menu-card">
        <i class="fas fa-chart-line"></i>
        <span>Graphique</span>
      </router-link>
    </div>

    <!-- Contenu du gestionnaire -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "GestionAdmin",
};
</script>

<style scoped>
.admin-home {
  padding: 50px 20px 20px 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  color: #1a1f2e;
}

/* Grid responsive des cartes */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-bottom: 40px;
}

/* Cartes */
.menu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #1a1f2e;
  width: 180px;
  height: 120px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 15px;
  text-align: center;
}

.menu-card i {
  font-size: 28px;
  margin-bottom: 10px;
  color: #3498db;
  transition: transform 0.3s ease, color 0.3s ease;
}

.menu-card span {
  font-size: 1rem;
}

/* Hover effects */
.menu-card:hover {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.2);
}

.menu-card:hover i {
  color: #2ecc71;
  transform: scale(1.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  .menu-card {
    width: 150px;
    height: 100px;
  }

  .menu-card i {
    font-size: 24px;
  }

  .menu-card span {
    font-size: 0.9rem;
  }
}
</style>
