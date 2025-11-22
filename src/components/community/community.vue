<template>
  <section class="community">
    <div class="community__inner">
      <header class="community__header">
        <p class="community__eyebrow">Manage your entire community</p>
        <h2 class="community__title">In a single system</h2>
        <p class="community__subtitle">Who is this product suitable for?</p>
      </header>

      <div class="community__grid">
        <RouterLink to="/membership" class="community__card" aria-label="Membership Organisations">
          <div class="community__icon" aria-hidden="true">🏛️</div>
          <h3 class="community__card-title">Membership Organisations</h3>
          <p class="community__card-text">Our membership management software provides full automation of membership renewals and payments.</p>
        </RouterLink>

        <RouterLink to="/national" class="community__card" aria-label="National Associations">
          <div class="community__icon" aria-hidden="true">🌐</div>
          <h3 class="community__card-title">National Associations</h3>
          <p class="community__card-text">Our membership management software provides full automation of membership renewals and payments.</p>
        </RouterLink>

        <RouterLink to="/clubs" class="community__card" aria-label="Clubs And Groups">
          <div class="community__icon" aria-hidden="true">🤝</div>
          <h3 class="community__card-title">Clubs And Groups</h3>
          <p class="community__card-text">Our membership management software provides full automation of membership renewals and payments.</p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import './styles/community.scss';
</style>

