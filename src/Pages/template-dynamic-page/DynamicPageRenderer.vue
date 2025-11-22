<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import store from '../../store'
import HeroSection from '../../components/hero/HeroSection.vue'
import Community from '../../components/community/community.vue'
import Customer from '../../components/customer/Customer.vue'
import type { PropType } from 'vue'

const props = defineProps({
  components: { type: Array as PropType<any[] | null>, default: null },
  getter: { type: String, default: 'dataPage/getComponents' },
  fetchAction: { type: String, default: 'dataPage/fetchHomePage' },
  registry: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
})

const componentsFromProp = computed(() => {
  return Array.isArray(props.components) ? props.components : null
})

const componentsFromGetter = computed(() => {
  const getter = (store.getters as any)[props.getter]
  return Array.isArray(getter) ? getter : []
})

const componentsData = computed(() => {
  return componentsFromProp.value ?? componentsFromGetter.value
})

// Default registry - can be extended/overridden via prop
const defaultRegistry: Record<string, any> = {
  'general.hero': HeroSection,
  'general.community': Community,
  'general.customer': Customer,
}

const finalRegistry = { ...defaultRegistry, ...(props.registry || {}) }

const renderItems = computed(() => {
  return componentsData.value.map((item: any, idx: number) => {
    const compKey = item?.['__component'] ?? null
    const Comp = compKey ? finalRegistry[compKey] : null
    const { __component, id, ...props } = item ?? {}
    return {
      key: item?.id ?? idx,
      component: Comp,
      props,
      raw: item,
    }
  })
})

onBeforeMount(() => {
  if (componentsFromProp.value && Array.isArray(componentsFromProp.value)) return

  if (props.fetchAction && store && typeof store.dispatch === 'function') {
    store.dispatch(props.fetchAction).catch((e: any) => {
      console.error('Error fetching data for dynamic page', e)
    })
  }
})
</script>

<template>
  <div class="dynamic-page-renderer">
    <div v-if="renderItems.length === 0">No hay componentes cargados aún.</div>

    <div v-for="item in renderItems" :key="item.key">
      <component v-if="item.component" :is="item.component" v-bind="item.props" />

      <div v-else class="component-fallback">
        <strong>Componente no mapeado:</strong>
        <pre>{{ JSON.stringify(item.raw, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>


