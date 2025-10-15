<template>
  <div class="partners-scroller" ref="scrollerRef">
    <div class="partners-scroller__track" :style="{ animationPlayState: isPaused ? 'paused' : 'running' }">
      <!-- Первый набор партнеров -->
      <div 
        v-for="partner in duplicatedPartners" 
        :key="`first-${partner.id}`"
        class="partners-scroller__item"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
      >
        <PartnerCard :partner="partner" />
      </div>
      <!-- Дубликат для бесшовного скролла -->
      <div 
        v-for="partner in duplicatedPartners" 
        :key="`second-${partner.id}`"
        class="partners-scroller__item"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
      >
        <PartnerCard :partner="partner" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PartnerCard from './PartnerCard.vue'
import type { Partner } from '../composables/usePartners'

const props = defineProps<{ partners: Partner[] }>()

const scrollerRef = ref<HTMLElement | null>(null)
const isPaused = ref(false)

// Дублируем партнеров для бесшовного скролла
const duplicatedPartners = computed(() => props.partners)
</script>

<style scoped>
.partners-scroller {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 1rem 0;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.partners-scroller::before,
.partners-scroller::after {
  content: '';
  position: absolute;
  top: 0;
  width: 100px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.partners-scroller::before {
  left: 0;
  background: linear-gradient(to right, var(--surface-section) 0%, transparent 100%);
}

.partners-scroller::after {
  right: 0;
  background: linear-gradient(to left, var(--surface-section) 0%, transparent 100%);
}

.partners-scroller__track {
  display: flex;
  gap: 1.5rem;
  animation: scroll 60s linear infinite;
  width: fit-content;
}

.partners-scroller__track:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.partners-scroller__item {
  flex-shrink: 0;
  width: 280px;
  transition: transform 0.3s ease;
}

.partners-scroller__item:hover {
  transform: scale(1.05);
  z-index: 10;
}

@media (max-width: 768px) {
  .partners-scroller__track {
    gap: 1rem;
    animation: scroll 40s linear infinite;
  }

  .partners-scroller__item {
    width: 240px;
  }
}

@media (max-width: 480px) {
  .partners-scroller__item {
    width: 200px;
  }

  .partners-scroller__track {
    gap: 0.75rem;
    animation: scroll 30s linear infinite;
  }
}
</style>

