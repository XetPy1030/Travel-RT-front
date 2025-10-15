<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const lastScrollY = ref(0)
const isHidden = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  const currentScroll = window.scrollY
  isHidden.value = currentScroll > lastScrollY.value && currentScroll > 100;
  lastScrollY.value = currentScroll
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header class="header" :class="{ hidden: isHidden }">
    <div class="header-content">
      <RouterLink to="/" class="logo-link">
        <i class="pi pi-compass logo-icon"></i>
        <span class="logo-text">Путешествуем РТ</span>
      </RouterLink>

      <!-- Бургер кнопка для мобильных -->
      <button class="burger" @click="toggleMenu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>

      <nav class="nav" :class="{ open: menuOpen }">
        <RouterLink
            to="/"
            class="nav-link"
            :class="{ active: route.path === '/' }"
            @click="menuOpen = false"
        >
          <i class="pi pi-home"></i>
          <span>Главная</span>
        </RouterLink>
        <RouterLink
            to="/news"
            class="nav-link"
            :class="{ active: route.path === '/news' }"
            @click="menuOpen = false"
        >
          <i class="pi pi-book"></i>
          <span>Новости</span>
        </RouterLink>
        <RouterLink
            to="/places"
            class="nav-link"
            :class="{ active: route.path === '/places' }"
            @click="menuOpen = false"
        >
          <i class="pi pi-map-marker"></i>
          <span>Интересные места</span>
        </RouterLink>
        <RouterLink
            to="/routers"
            class="nav-link"
            :class="{ active: route.path === '/routers' }"
            @click="menuOpen = false"
        >
          <i class="pi pi-directions"></i>
          <span>Маршруты</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
  background: rgba(25, 118, 210, 0.9);
  padding: 0.75rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, opacity 0.3s ease;
}

.header.hidden {
  transform: translateY(-100%);
  opacity: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.8rem;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: white;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.nav-link.active {
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 10%;
  width: 80%;
  height: 2px;
  background: #fff;
  border-radius: 2px;
}

/* Бургер кнопка */
.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.burger span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.burger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger span.open:nth-child(2) {
  opacity: 0;
}

.burger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* === 📱 Адаптив === */
@media (max-width: 700px) {
  .header-content {
    justify-content: space-between;
  }

  .burger {
    display: flex;
    z-index: 1100;
  }

  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(25, 118, 210, 0.95);
    flex-direction: column;
    display: none;
    padding: 1rem 2rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  .nav.open {
    display: flex;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 0.8rem 0;
    font-size: 1rem;
    border-radius: 0;
  }

  .nav-link.active::after {
    left: 0;
    width: 20%;
  }

  /* Бургер превращается в крестик */
  .burger span.open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .burger span.open:nth-child(2) {
    opacity: 0;
  }
  .burger span.open:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
}
</style>
