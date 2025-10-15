<template>
  <button
      v-if="canGoBack"
      class="back-button"
      @click="goBack"
      aria-label="Назад"
  >
    <i class="pi pi-arrow-left"></i>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const canGoBack = ref(false)

const goBack = () => {
  router.back()
}

onMounted(() => {
  canGoBack.value = window.history.length > 1
})
</script>

<style scoped>
.back-button {
  position: fixed;
  top: 80px;
  left: 20px;
  background-color: var(--primary-color, #007bff);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  transition: all 0.25s ease;
  z-index: 999;
}

.back-button:hover {
  background-color: var(--primary-700, #0056b3);
  transform: translateY(-2px);
}

/* === 📱 Адаптив === */
@media (max-width: 900px) {
  .back-button {
    top: 70px;
    left: 15px;
    width: 44px;
    height: 44px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

@media (max-width: 600px) {
  .back-button {
    top: 65px;
    left: 10px;
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.18);
  }
  .back-button i {
    font-size: 1rem;
  }
}
</style>
