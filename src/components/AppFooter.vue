<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">TravelRT</h3>
        <p class="footer-text">Ваш путеводитель по республике Татарстан</p>
      </div>
      <div class="footer-section">
        <h4 class="footer-subtitle">Контакты</h4>
        <p class="footer-text">Email: info@travelrt.com</p>
        <p class="footer-text">Телефон: +7 (XXX) XXX-XX-XX</p>
      </div>
      <div class="footer-section">
        <h4 class="footer-subtitle">Социальные сети</h4>
        <div class="social-links">
          <a href="#" class="social-link">
            <i class="pi pi-facebook"></i>
          </a>
          <a href="#" class="social-link">
            <i class="pi pi-instagram"></i>
          </a>
          <a href="#" class="social-link">
            <i class="pi pi-telegram"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="copyright">© 2024 TravelRT. Все права защищены.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1976D2 0%, #2196F3 100%);
  color: white;
  padding: 2rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.footer-subtitle {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.footer-text {
  margin: 0;
  opacity: 0.9;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  transition: opacity 0.3s;
}

.social-link:hover {
  opacity: 0.8;
}

.footer-bottom {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.copyright {
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
}
</style> 