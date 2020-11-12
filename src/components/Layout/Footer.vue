<template>
  <footer class="footer">
    <slot/>
  </footer>  
</template>
<style scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 32px;
    background: #13161F;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-bottom: 50px;
  }
</style>
