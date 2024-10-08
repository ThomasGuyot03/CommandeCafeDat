<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

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
        const response = await this.$http.get('/orders');
        this.orders = response.data;

        // Transformer les données pour les regrouper par jour et afficher les derniers jours
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

      // Déterminer le nombre de jours à afficher selon la taille de l'écran
      const daysToShow = window.innerWidth < 768 ? 3 : 7; // 3 jours pour mobile, 7 pour desktop

      // Récupérer les derniers jours en fonction de daysToShow
      const now = new Date();
      const pastDays = [];

      for (let i = daysToShow - 1; i >= 0; i--) {
        const day = new Date(now);
        day.setDate(now.getDate() - i);
        const formattedDay = day.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
        pastDays.push(formattedDay);
        ordersByDay[formattedDay] = 0; // Initialiser à 0 commandes pour chaque jour
      }

      // Parcourir les commandes et compter celles de chaque jour
      orders.forEach(order => {
        const orderDate = new Date(order.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });

        // Si la date de la commande est dans les derniers jours sélectionnés, on incrémente
        if (ordersByDay[orderDate] !== undefined) {
          ordersByDay[orderDate]++;
        }
      });

      // Retourner un tableau contenant les dates (labels) et les nombres de commandes (data)
      return {
        labels: pastDays, // Les derniers jours
        data: Object.values(ordersByDay), // Le nombre de commandes pour chaque jour
      };
    },

    initChart(ordersByDay) {
      const ctx = document.getElementById('myChart').getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ordersByDay.labels, // Les derniers jours
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
              beginAtZero: true,
              ticks: {
                // Ajuster la taille de la police pour le mobile
                font: {
                  size: window.innerWidth < 768 ? 10 : 14
                }
              }
            },
            x: {
              ticks: {
                font: {
                  size: window.innerWidth < 768 ? 10 : 14
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  size: window.innerWidth < 768 ? 10 : 14
                }
              }
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
  width: 100%; /* Largeur réactive */
  height: 60vh; /* Hauteur réactive à la taille de l'écran */
  max-width: 100%; /* S'assurer qu'il reste réactif */
  margin: auto; /* Centrer le canvas */
  display: block; /* S'assurer qu'il s'affiche correctement sur les petits écrans */
}
</style>
