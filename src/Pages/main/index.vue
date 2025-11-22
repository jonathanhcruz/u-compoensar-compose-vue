<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import store from '../../store'
import DynamicPageRenderer from '../template-dynamic-page/DynamicPageRenderer.vue'

const componentsData = computed(() => {
  const getter = (store.getters as any)['dataPage/getComponents']
  return Array.isArray(getter) ? getter : []
})

onBeforeMount(() => {
  const page = (store.getters as any)['dataPage/getPage']
  if (!page) {
    store.dispatch('dataPage/fetchHomePage').catch((e: any) => console.error('Error fetching page', e))
  }
})
</script>

<template>
  <div>
    <main class="page-main">
      <DynamicPageRenderer :components="componentsData" />
    </main>
  </div>
</template>