<template>
  <button
    @click="click"
    class="btn-secondary"
  >
    <slot/>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    click: {
      type: Function
    },
  }
}
</script>

<style scoped>
  .btn-secondary {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: #ACB2BB;
    padding: 8px 24px;
    border: 1px solid #434854;
    background: none;
    border-radius: 2px;
    -webkit-app-region: no-drag;
  }
  .btn-secondary:hover:not(:disabled) {
    border: 1px solid #ACB2BB;
  }
  .btn-secondary:active:not(:disabled) {
    background: #1F232E;
    border: 1px solid #434854;
  }
  .btn-secondary:focus:not(:disabled) {
    border: 1px solid #ACB2BB;
    outline: none;
  }
  .btn-secondary:disabled {
    opacity: 0.4;
  }
</style>
