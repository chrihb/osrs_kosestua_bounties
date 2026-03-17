<template>
  <div class="osrs-scroll">
    <div class="osrs-scroll-top" />
    <div class="osrs-scroll-middle">
      <slot />
    </div>
    <div class="osrs-scroll-bottom" />
  </div>
</template>

<style scoped>
.osrs-scroll {
  display: flex;
  flex-direction: column;
}
</style>