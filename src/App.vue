<script setup lang="ts">
import AppHeader from '@components/AppHeader.vue'
import AppFooter from '@components/AppFooter.vue'
import UpButton from "@components/UpButton.vue";
import 'primeicons/primeicons.css'
</script>

<template>
    <div class="layout-wrapper">
      <AppHeader />
      <main class="main-content">
        <RouterView />
        <UpButton />
      </main>
      <AppFooter />
    </div>
</template>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
