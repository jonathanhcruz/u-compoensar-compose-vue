<script setup lang="ts">
import { computed } from 'vue'
import type { HeroProps } from './types/hero-props'
import { resolveMediaSrc, resolveMediaAlt } from '../../helpers/media'

const raw = defineProps<HeroProps>()
const title = computed(() => raw.title ?? '')
const subTitle = computed(() => raw.subTitle ?? '')
const description = computed(() => raw.description ?? '')
const imageProp = computed(() => raw.image ?? null)

const imageSrc = computed(() => resolveMediaSrc(imageProp.value))
const imageAlt = computed(() => resolveMediaAlt(imageProp.value, title.value))
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__content">
        <p class="hero__eyebrow">{{ subTitle }}</p>
        <h1 class="hero__title">
          {{ title }}
        </h1>
        <p class="hero__subtitle">
          {{ description }}
        </p>
        <router-link to="/register" class="hero__cta">Register</router-link>
      </div>

      <div class="hero__figure" aria-hidden="true">
        <img v-if="imageSrc" :src="imageSrc" :alt="imageAlt" />
        <img v-else src="../../assets/img/hero-illustration.png" alt="Hero illustration" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import './styles/hero.scss';
</style>
