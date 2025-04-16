<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <RouterLink to="/" class="logo-link">
          <i class="pi pi-compass" style="font-size: 2rem"></i>
          <span class="logo-text">Путешествуем РТ</span>
        </RouterLink>
      </div>
      <nav class="nav">
        <RouterLink to="/" class="nav-link">
          <i class="pi pi-home"></i>
          <span>Главная</span>
        </RouterLink>
        <RouterLink to="/news" class="nav-link">
          <i class="pi pi-book"></i>
          <span>Новости</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
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

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style> 