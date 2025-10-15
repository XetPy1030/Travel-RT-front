<template>
  <div class="featured-partners">
    <a
      v-for="(partner, index) in partners"
      :key="partner.id"
      :href="partner.url"
      target="_blank"
      rel="noopener noreferrer"
      class="featured-card"
      :style="{ '--index': index }"
      ref="cardsRef"
      :class="{ 'featured-card--visible': isVisible }"
    >
      <div class="featured-card__badge">
        <i class="pi pi-star-fill" />
        <span>Главный партнер</span>
      </div>

      <div class="featured-card__logo-wrapper">
        <img
          v-if="partner.logo"
          :src="partner.logo"
          :alt="partner.name"
          class="featured-card__logo"
        />
        <div v-else class="featured-card__logo-placeholder">
          <i class="pi pi-building" />
        </div>
      </div>

      <div class="featured-card__content">
        <h3 class="featured-card__name">{{ partner.name }}</h3>
        <p v-if="partner.description" class="featured-card__description">
          {{ partner.description }}
        </p>
        <div class="featured-card__link">
          <span>Перейти на сайт</span>
          <i class="pi pi-arrow-right" />
        </div>
      </div>

      <div class="featured-card__shine"></div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Partner } from '@/modules/partners'

defineProps<{ partners: Partner[] }>()

const cardsRef = ref<HTMLElement[]>([])
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!cardsRef.value.length) return
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        isVisible.value = true
        observer?.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })
  
  cardsRef.value.forEach(card => {
    if (card) observer!.observe(card)
  })
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.featured-partners {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.featured-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, var(--surface-card) 0%, var(--surface-50) 100%);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(30px) scale(0.95);
  opacity: 0;
  border: 2px solid transparent;
}

.featured-card--visible {
  animation: featuredSlideIn 0.8s ease forwards;
  animation-delay: calc(var(--index) * 0.15s);
}

@keyframes featuredSlideIn {
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.featured-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-600), var(--primary-color));
  background-size: 200% 100%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 0%; }
}

.featured-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.featured-card__badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.4);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.featured-card__badge i {
  font-size: 0.9rem;
  animation: starPulse 2s ease-in-out infinite;
}

@keyframes starPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.featured-card__logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  min-height: 120px;
}

.featured-card__logo {
  max-width: 180px;
  max-height: 120px;
  object-fit: contain;
  transition: all 0.4s ease;
  filter: grayscale(0.2);
}

.featured-card:hover .featured-card__logo {
  transform: scale(1.1) rotateY(5deg);
  filter: grayscale(0);
}

.featured-card__logo-placeholder {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  border-radius: 50%;
  color: var(--primary-color);
  font-size: 3.5rem;
  transition: all 0.4s ease;
}

.featured-card:hover .featured-card__logo-placeholder {
  transform: rotate(360deg) scale(1.1);
  background: linear-gradient(135deg, var(--primary-100) 0%, var(--primary-200) 100%);
}

.featured-card__content {
  text-align: center;
  z-index: 1;
}

.featured-card__name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 0.75rem 0;
  transition: color 0.3s ease;
}

.featured-card:hover .featured-card__name {
  color: var(--primary-color);
}

.featured-card__description {
  font-size: 0.95rem;
  color: var(--text-color-secondary);
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
  min-height: 3rem;
}

.featured-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.95rem;
  transition: gap 0.3s ease;
}

.featured-card:hover .featured-card__link {
  gap: 0.75rem;
}

.featured-card__link i {
  font-size: 0.85rem;
  transition: transform 0.3s ease;
}

.featured-card:hover .featured-card__link i {
  transform: translateX(4px);
}

.featured-card__shine {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.featured-card:hover .featured-card__shine {
  right: -200%;
  opacity: 1;
}

@media (max-width: 768px) {
  .featured-partners {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .featured-card {
    padding: 2rem 1.5rem;
  }

  .featured-card__badge {
    top: 1rem;
    right: 1rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.7rem;
  }

  .featured-card__logo {
    max-width: 150px;
    max-height: 100px;
  }

  .featured-card__logo-placeholder {
    width: 100px;
    height: 100px;
    font-size: 3rem;
  }

  .featured-card__name {
    font-size: 1.3rem;
  }

  .featured-card__description {
    font-size: 0.9rem;
    min-height: auto;
  }
}
</style>

