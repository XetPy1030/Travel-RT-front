<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">Путешествуем РТ</h3>
        <p class="footer-text">Ваш путеводитель по республике Татарстан</p>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Контакты</h4>
        <p class="footer-text">info@travelrt.com</p>
        <p class="footer-text">+7 (999) 999-99-99</p>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Мы в сети</h4>
        <div class="social-links">
          <a href="#" class="social-link" aria-label="Facebook">
            <i class="pi pi-facebook"></i>
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <i class="pi pi-instagram"></i>
          </a>
          <a href="#" class="social-link" aria-label="Telegram">
            <i class="pi pi-telegram"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="copyright">© 2024 Путешествуем РТ — Все права защищены</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, var(--primary-color, #1976d2) 0%, var(--primary-600, #2196f3) 100%);
  color: #fff;
  padding: 2.5rem 1rem 1.25rem;
  margin-top: auto;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.15);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2.5rem;
  padding: 0 1.5rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.footer-subtitle {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.footer-text {
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
  line-height: 1.5;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.social-link {
  color: white;
  font-size: 1.6rem;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.social-link:hover {
  opacity: 0.9;
  transform: translateY(-2px) scale(1.1);
}

.footer-bottom {
  text-align: center;
  margin-top: 2.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.copyright {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.85;
}

/* === 📱 Адаптив === */
@media (max-width: 900px) {
  .footer-content {
    gap: 2rem;
    padding: 0 1rem;
  }
  .footer-title {
    font-size: 1.4rem;
  }
  .footer-subtitle {
    font-size: 1.1rem;
  }
  .footer-text {
    font-size: 0.95rem;
  }
}

@media (max-width: 600px) {
  .footer {
    padding: 2rem 0.75rem 1rem;
  }
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.75rem;
  }
  .footer-section {
    align-items: center;
  }
  .social-links {
    justify-content: center;
  }
  .footer-title {
    font-size: 1.35rem;
  }
  .footer-text {
    font-size: 0.9rem;
  }
  .copyright {
    font-size: 0.85rem;
  }
}
</style>
