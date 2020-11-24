<template>
  <div class="view">
    <slot/>
  </div>  
</template>
<style scoped>
  .view {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
  }
</style>
