<template>
  <div class="view">
    <slot></slot>
  </div>  
</template>
<style scoped>
  .view {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
