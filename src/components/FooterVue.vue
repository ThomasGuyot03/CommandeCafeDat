<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section about">
        <h2>A propos</h2>
        <p>
          Chez DAT, nous facilitons l'accès à une pause café parfaite grâce à des solutions innovantes. 
          Commandez facilement votre café ou autres boissons ainsi que vos accessoires via un simple QR code directement sur nos machines installées dans vos locaux.
        </p>
      </div>

      <div class="footer-section links">
        <h2>Liens rapide</h2>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/panier">Panier</router-link></li>
          <li><router-link to="/profil">Profil</router-link></li>
          <li><router-link to="/">Contact</router-link></li>
          <li><router-link to="/">Privacy Policy</router-link></li>
        </ul>
      </div>

      <div class="footer-section contact">
        <h2>Contact</h2>
        <p>Email: dat.cafe@orange.fr</p>
        <p>Phone: 05.34.48.00.59</p>
        <div class="socials">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="/CartView"><i class="fab fa-twitter"></i></a>
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
  position: relative;
  bottom: 0;
  left: 220px;
  width: calc(100% - 320px);
  padding: 10px 0;
  z-index: 999;
  margin-top: 5%;
  border-radius: 5px
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.footer-section h2 {
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #f7ca18;
}

.footer-section p,
.footer-section ul {
  font-size: 0.85em;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 5px;
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
  margin-top: 5px;
}

.footer-section .socials a {
  margin-right: 8px;
  color: #bbb;
  font-size: 1em;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section .socials a:hover {
  color: #f7ca18;
}

.footer-bottom {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #444;
  font-size: 0.85em;
  text-align: center;
}

@media (max-width: 768px) {
  .footer {
    width: 100%;
    left: 0;
    margin-top: 10%;
    position: relative;
  }

  .footer-content {
    flex-direction: column;
  }

  .footer-section {
    margin: 5px 0;
  }

  body {
    padding-bottom: 100px;
  }
}

.main-content {
  padding-bottom: 120px;
}
</style>
