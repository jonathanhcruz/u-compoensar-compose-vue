<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import type { CommunityProps } from './types/community-props'

const raw = defineProps<CommunityProps>()

const title = computed(() => raw.title)
const subTitle = computed(() => raw.subTitle)
const cardsList = computed(() => Array.isArray(raw.card) ? raw.card : [])
</script>

<template>
  <section class="community">
    <div class="community__inner">
      <header class="community__header">
        <h2 class="community__title">{{ title }}</h2>
        <p class="community__subtitle">{{ subTitle }}</p>
      </header>

      <div class="community__grid">
        <RouterLink v-for="card in cardsList" :key="card.id" :to="card.to || '/#'" class="community__card" :aria-label="card.ariaLabel || card.title">
          <div class="community__icon" aria-hidden="true">{{ card.icon ?? '🏛️' }}</div>
          <h3 class="community__card-title">{{ card.title }}</h3>
          <p class="community__card-text">{{ card.description }}</p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import './styles/community.scss';
</style>
