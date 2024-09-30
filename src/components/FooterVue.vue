<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section about">
        <h2>A propos</h2>
        <p>
          We are committed to delivering the best services and customer satisfaction.
        </p>
      </div>

      <div class="footer-section links">
        <h2>Liens rapide</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>

      <div class="footer-section contact">
        <h2>Contact</h2>
        <p>Email: dat.cafe@orange.fr</p>
        <p>Phone: 05.34.48.00.59</p>
        <div class="socials">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      &copy; 2024 DAT Developpement | Designed by Guyot Thomas
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #303649;
  color: #fff;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5px 10px; /* Réduction du padding pour le footer */
}

.footer-section {
  flex: 1;
  min-width: 150px; /* Réduction de la largeur minimum */
  margin: 5px; /* Réduction des marges */
}

.footer-section h2 {
  margin-bottom: 5px; /* Réduction de la marge en bas des titres */
  font-size: 1.2em; /* Diminution de la taille des titres */
  color: #f7ca18;
}

.footer-section p,
.footer-section ul {
  font-size: 0.8em; /* Réduction de la taille de police */
  line-height: 1.2; /* Réduction de l'interligne */
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 5px; /* Réduction de la marge en bas des éléments de liste */
}

.footer-section ul li a {
  color: #bbb;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #f7ca18;
}

.footer-section .socials {
  margin-top: 5px; /* Réduction de la marge */
}

.footer-section .socials a {
  margin-right: 10px; /* Espacement entre les icônes */
  color: #bbb;
  font-size: 1.1em; /* Légère réduction de la taille des icônes */
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section .socials a:hover {
  color: #f7ca18;
}

.footer-bottom {
  margin-top: 5px; /* Réduction de la marge supérieure */
  padding-top: 5px; /* Réduction du padding */
  border-top: 1px solid #444;
  font-size: 0.8em; /* Réduction de la taille de police */
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-section {
    margin: 5px 0; /* Ajustement des marges */
  }
}
</style>
