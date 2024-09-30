<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import axios from 'axios'; // Utiliser axios pour récupérer les données

export default {
  name: 'OrdersChart',
  data() {
    return {
      orders: [], // Stocker les commandes récupérées
    };
  },
  mounted() {
    // Enregistrer Chart.js
    Chart.register(...registerables);

    // Appeler la fonction pour récupérer les commandes et initialiser le graphique
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        // Appel à votre API pour récupérer les commandes
        const response = await axios.get('/orders');
        this.orders = response.data;

        // Transformer les données pour les regrouper par jour et afficher les 7 derniers jours
        const ordersByDay = this.groupOrdersByDay(this.orders);

        // Initialiser le graphique avec les données des commandes par jour
        this.initChart(ordersByDay);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    },

    groupOrdersByDay(orders) {
      // Initialiser un objet pour stocker les commandes par jour
      const ordersByDay = {};

      // Récupérer les 7 derniers jours
      const now = new Date();
      const past7Days = [];

      for (let i = 6; i >= 0; i--) {
        const day = new Date(now);
        day.setDate(now.getDate() - i);
        const formattedDay = day.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
        past7Days.push(formattedDay);
        ordersByDay[formattedDay] = 0; // Initialiser à 0 commandes pour chaque jour
      }

      // Parcourir les commandes et compter celles de chaque jour
      orders.forEach(order => {
        const orderDate = new Date(order.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });

        // Si la date de la commande est dans les 7 derniers jours, on incrémente
        if (ordersByDay[orderDate] !== undefined) {
          ordersByDay[orderDate]++;
        }
      });

      // Retourner un tableau contenant les dates (labels) et les nombres de commandes (data)
      return {
        labels: past7Days, // Les 7 derniers jours
        data: Object.values(ordersByDay), // Le nombre de commandes pour chaque jour
      };
    },

    initChart(ordersByDay) {
      const ctx = document.getElementById('myChart').getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ordersByDay.labels, // Les 7 derniers jours
          datasets: [
            {
              label: 'Nombre de commandes',
              data: ordersByDay.data, // Le nombre de commandes pour chaque jour
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
canvas {
  width: 1200px; /* Largeur du canvas */
  height: 600px; /* Hauteur du canvas */
  max-width: 100%; /* S'assurer qu'il reste réactif */
  margin: auto auto auto 50px; /* Centrer le canvas */
}
</style>
