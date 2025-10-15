<template>
  <a 
    :href="partner.url" 
    target="_blank" 
    rel="noopener noreferrer"
    class="partner-card"
    ref="cardRef"
    :class="{ 'partner-card--visible': isVisible }"
  >
    <div class="partner-card__logo-wrapper">
      <img 
        v-if="partner.logo" 
        :src="partner.logo" 
        :alt="partner.name"
        class="partner-card__logo"
      />
      <div v-else class="partner-card__logo-placeholder">
        <i class="pi pi-building" />
      </div>
    </div>
    <div class="partner-card__content">
      <h4 class="partner-card__name">{{ partner.name }}</h4>
      <i class="pi pi-external-link partner-card__icon" />
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Partner } from '../composables/usePartners'

defineProps<{ partner: Partner }>()

const cardRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!cardRef.value) return
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        isVisible.value = true
        observer?.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })
  observer.observe(cardRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.partner-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--surface-card, #fff);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(20px);
  opacity: 0;
  min-height: 180px;
  position: relative;
  overflow: hidden;
}

.partner-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent 0%, var(--primary-color) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.partner-card--visible {
  transform: translateY(0);
  opacity: 1;
}

.partner-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.partner-card:hover::before {
  opacity: 0.03;
}

.partner-card__logo-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.partner-card__logo {
  max-width: 120px;
  max-height: 80px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.partner-card:hover .partner-card__logo {
  transform: scale(1.1);
}

.partner-card__logo-placeholder {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: 50%;
  color: #999;
  font-size: 2rem;
  transition: all 0.3s ease;
}

.partner-card:hover .partner-card__logo-placeholder {
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  color: var(--primary-color);
  transform: rotate(360deg);
}

.partner-card__content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.partner-card__name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
  margin: 0;
  transition: color 0.3s ease;
}

.partner-card:hover .partner-card__name {
  color: var(--primary-color);
}

.partner-card__icon {
  font-size: 0.85rem;
  color: var(--text-color-secondary);
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.partner-card:hover .partner-card__icon {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 768px) {
  .partner-card {
    padding: 1.25rem;
    min-height: 160px;
  }

  .partner-card__logo {
    max-width: 100px;
    max-height: 70px;
  }

  .partner-card__logo-placeholder {
    width: 70px;
    height: 70px;
    font-size: 1.75rem;
  }

  .partner-card__name {
    font-size: 0.9rem;
  }
}
</style>

