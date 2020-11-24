<template>
  <ol class="ol">
    <slot/>
  </ol>  
</template>
<style scoped>
  .ol {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 676px;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
  }
</style>
