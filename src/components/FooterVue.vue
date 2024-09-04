<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h2>A propos</h2>
          <p>
            We are a company committed to delivering the best services. Our goal
            is to provide the highest level of customer satisfaction.
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
          <h2>Contact Us</h2>
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
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin: 20px 0;
}

.footer-section h2 {
  margin-bottom: 15px;
  font-size: 1.5em;
  color: #f7ca18;
}

.footer-section p,
.footer-section ul {
  font-size: 1em;
  line-height: 1.5;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
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
  margin-top: 10px;
}

.footer-section .socials a {
  margin-right: 15px;
  color: #bbb;
  font-size: 1.2em;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section .socials a:hover {
  color: #f7ca18;
}

.footer-bottom {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #444;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-section {
    margin: 10px 0;
  }
}
</style>
