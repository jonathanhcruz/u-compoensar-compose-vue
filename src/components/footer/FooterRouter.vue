<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">Nexcent</div>
      <div class="footer-nav">
        <div class="col">
          <h4>Company</h4>
          <ul>
            <li><RouterLink to="/about">About us</RouterLink></li>
            <li><RouterLink to="/blog">Blog</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </ul>
        </div>
        <div class="col">
          <h4>Support</h4>
          <ul>
            <li><RouterLink to="/help">Help center</RouterLink></li>
            <li><RouterLink to="/terms">Terms of service</RouterLink></li>
            <li><RouterLink to="/privacy">Privacy policy</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="footer-copyright">© 2025 Nexcent. All rights reserved.</div>
    </div>
  </footer>
</template>

<style scoped >
@import './styles/footer.scss';
</style>

