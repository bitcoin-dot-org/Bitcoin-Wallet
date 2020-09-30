<template>
  <button class="btn-primary">
    <slot></slot>
  </button>
</template>

<style scoped>
  .btn-primary {
    padding: 8px 24px;
    background: #F7931A;
    border-radius: 2px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: #FFFFFF;
  }
</style>
