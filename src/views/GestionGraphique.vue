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
        
        // Transformer les données pour les regrouper par jour
        const ordersByDay = this.groupOrdersByDay(this.orders);

        // Initialiser le graphique avec les données des commandes par jour
        this.initChart(ordersByDay);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    },
    
    groupOrdersByDay(orders) {
      // Utiliser un objet pour stocker le nombre de commandes par jour
      const ordersByDay = {};

      orders.forEach(order => {
        const orderDate = new Date(order.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
        
        // Si la date existe déjà, on incrémente le nombre de commandes
        if (ordersByDay[orderDate]) {
          ordersByDay[orderDate]++;
        } else {
          ordersByDay[orderDate] = 1;
        }
      });

      // Retourner un tableau contenant les dates (labels) et les nombres de commandes (data)
      return {
        labels: Object.keys(ordersByDay), // Les dates
        data: Object.values(ordersByDay), // Le nombre de commandes par jour
      };
    },

    initChart(ordersByDay) {
      const ctx = document.getElementById('myChart').getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ordersByDay.labels, // Les jours où il y a des commandes
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
  