<script setup lang="ts">
import { ref, computed } from 'vue';
import store from '../../store'

const showMobile = ref(false);

const devices = computed(() => (store as any)?.state?.device?.type ?? null);
const isMobile = computed(() => devices.value === 'mobile');
</script>

<template>
  <section class="menu">
    <div class="menu__container">
      <div class="menu__logo">
        <RouterLink to="/">
        <img src="../../assets/img/logo.png" alt="U Compensar Logo">
        </RouterLink>
      </div>

      <div v-if="isMobile" class="menu__mobile-nav" @click="showMobile = !showMobile">
        <span class="menu__mobile-nav__item1"></span>
        <span class="menu__mobile-nav__item2"></span>
        <span class="menu__mobile-nav__item3"></span>
      </div>

      <nav class="menu__nav" :class="{ 'menu__nav--active': showMobile }">
        <ul class="menu__list">
          <li class="menu__item">
            <RouterLink to="/page1" class="menu__link">Menu Item 1</RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink to="/page2" class="menu__link">Menu Item 2</RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink to="/page3" class="menu__link">Menu Item 3</RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink to="/page4" class="menu__link menu__link--contact">Menu Item 5</RouterLink></li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import './styles/menu.scss';
</style>
