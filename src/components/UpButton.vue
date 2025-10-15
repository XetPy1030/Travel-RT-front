<script setup lang="ts">
import { ref, onMounted } from 'vue'
const isVisible = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const toggleVisibility = () => {
  isVisible.value = window.scrollY > 300;
}
onMounted(() => {
  window.addEventListener('scroll', toggleVisibility)
})
</script>

<template>
  <button
    v-if="isVisible"
    @click="scrollToTop"
    class="up-button"
    aria-label="Scroll to top"
  >
    <i class="pi pi-arrow-up"></i>
  </button>
</template>

<style scoped>
.up-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.up-button:hover {
  background-color: #0056b3;
}
</style>
