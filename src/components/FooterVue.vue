<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section about">
        <h2 class="section-title">À propos</h2>
        <p class="about-text">
          Chez DAT, nous facilitons l'accès à une pause café parfaite grâce à des solutions innovantes.
          Commandez facilement votre café ou autres boissons ainsi que vos accessoires via un simple QR code directement sur nos machines installées dans vos locaux.
        </p>
      </div>

      <div class="footer-section links">
        <h2 class="section-title">Liens rapides</h2>
        <ul class="links-list">
          <li><router-link to="/" class="footer-link">Accueil</router-link></li>
          <li><router-link to="/panier" class="footer-link">Panier</router-link></li>
          <li><router-link to="/profil" class="footer-link">Profil</router-link></li>
          <li><router-link to="/" class="footer-link">Contact</router-link></li>
          <li><router-link to="/" class="footer-link">Politique de confidentialité</router-link></li>
        </ul>
      </div>

      <div class="footer-section contact">
        <h2 class="section-title">Contact</h2>
        <div class="contact-info">
          <div class="contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <a href="mailto:dat.cafe@orange.fr" class="contact-link">dat.cafe@orange.fr</a>
          </div>
          <div class="contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <a href="tel:0534480059" class="contact-link">05.34.48.00.59</a>
          </div>
        </div>
        <div class="socials">
          <a href="#" class="social-link" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="bottom-content">
        <p class="copyright">&copy; 2024 DAT Développement. Tous droits réservés.</p>
        <p class="designer">Conçu par Guyot Thomas</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: #ecf0f1;
  position: relative;
  bottom: 0;
  left: 220px;
  width: calc(100% - 320px);
  padding: 48px 0 0;
  z-index: 999;
  margin-top: 80px;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px 40px;
}

.footer-section {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
  position: relative;
  padding-bottom: 12px;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.footer-section:hover .section-title::after {
  width: 60px;
}

.about-text {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #bdc3c7;
  text-align: justify;
}

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-list li {
  margin-bottom: 12px;
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.links-list li:hover {
  transform: translateX(5px);
}

.footer-link {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
}

.footer-link::before {
  content: '›';
  margin-right: 8px;
  font-size: 1.2rem;
  transition: margin-right 0.3s ease;
}

.footer-link:hover {
  color: #3498db;
}

.footer-link:hover::before {
  margin-right: 12px;
}

.contact-info {
  margin-bottom: 24px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

.icon {
  width: 20px;
  height: 20px;
  color: #3498db;
  flex-shrink: 0;
}

.contact-link {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #3498db;
}

.socials {
  display: flex;
  gap: 16px;
  margin-top: 20px;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link svg {
  width: 18px;
  height: 18px;
}

.social-link:hover {
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

.footer-bottom {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright,
.designer {
  font-size: 0.9rem;
  color: #95a5a6;
  margin: 0;
}

.designer {
  font-style: italic;
}

@media (max-width: 768px) {
  .footer {
    width: 100%;
    left: 0;
    margin-top: 60px;
    padding: 32px 0 0;
    border-radius: 12px 12px 0 0;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 24px 32px;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .bottom-content {
    flex-direction: column;
    text-align: center;
    padding: 0 24px;
    gap: 8px;
  }

  .about-text {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .socials {
    gap: 12px;
  }

  .social-link {
    width: 36px;
    height: 36px;
  }

  .social-link svg {
    width: 16px;
    height: 16px;
  }
}
</style>
