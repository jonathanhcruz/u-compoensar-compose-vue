<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import type { CustomerProps } from './types/customer-props'
import { resolveMediaSrc, resolveMediaAlt } from '../../helpers/media'

const raw = defineProps<CustomerProps>()

const title = computed(() => raw.title)
const description = computed(() => raw.description)
const subTitle = computed(() => raw.subTitle)
const linkText = computed(() => raw.linkText)
const linkUrl = computed(() => raw.link)
const blank = raw.blank ?? false

const image = computed(() => raw.image ?? null)
const imageSrc = computed(() => resolveMediaSrc(image.value))
const imageAlt = computed(() => resolveMediaAlt(image.value, title.value))
</script>

<template>
  <section class="customer">
    <div class="customer__inner container">
      <div class="customer__media">
        <div class="customer__media-bg">
          <img v-if="imageSrc" :src="imageSrc" :alt="imageAlt" class="customer__image"/>
          <img v-else src="../../assets/img/customers.png" :alt="title" class="customer__image"/>
        </div>
      </div>

      <div class="customer__content">
        <header class="customer__header">
          <p class="customer__eyebrow">{{ subTitle }}</p>
          <h2 class="customer__title">{{ title }}</h2>
        </header>

        <p class="customer__description">{{ description }}</p>

        <div class="customer__link-wrap">
          <a v-if="blank" :href="linkUrl" target="_blank" rel="noopener noreferrer" class="customer__link">{{ linkText }}</a>
          <RouterLink v-else :to="linkUrl" class="customer__link">{{ linkText }}</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import './styles/customer.scss';
</style>
