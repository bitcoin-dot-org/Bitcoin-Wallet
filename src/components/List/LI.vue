<template>
  <li class="li">
    <slot/>
  </li>  
</template>
<style scoped>
  .li {
    padding-left: 8px;
    margin-left: 16px;
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 22px;
    color: #ACB2BB;
  }
  .li:nth-child(3n) {
    margin-right: 0;
  }
</style>
