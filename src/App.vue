<script setup lang="ts">
import Menu from './components/menu'
import Footer from "./components/footer/FooterRouter.vue";

</script>

<template>
  <Menu />
  <router-view />

  <Footer />
</template>

<style lang="scss" src="./styles/main.scss" scoped />