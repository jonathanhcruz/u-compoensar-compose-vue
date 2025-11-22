<script setup lang="ts">
import { RouterLink } from 'vue-router'

const { name, role, description, badges } = defineProps({
  name: { type: String, default: 'Tim Smith' },
  role: { type: String, default: 'British Dragon Boat Racing Association' },
  description: { type: String, default: 'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
  badges: { type: Array as () => string[], default: () => [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#7c3aed"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="#06b6d4"/></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 L22 22 H2 Z" fill="#10b981"/></svg>'
  ] }
})
</script>

<template>
  <section class="customer">
    <div class="customer__inner container">
      <div class="customer__media">
        <div class="customer__media-bg">
          <img src="../../assets/img/customers.png" :alt="name" class="customer__image"/>
        </div>
      </div>

      <div class="customer__content">
        <p class="customer__description">{{ description }}</p>

        <div class="customer__meta">
          <h3 class="customer__name">{{ name }}</h3>
          <div class="customer__role">{{ role }}</div>
        </div>

        <div class="customer__badges" v-if="badges && badges.length">
          <span v-for="(b, i) in badges" :key="i" class="customer__badge" v-html="b"></span>
        </div>

        <RouterLink to="/customers" class="customer__link">Meet all customers <span class="arrow">→</span></RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import './styles/customer.scss';
</style>
