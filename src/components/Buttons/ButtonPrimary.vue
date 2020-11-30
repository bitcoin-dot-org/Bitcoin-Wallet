<template>
  <button
    @click="click"
    class="btn-primary"
    :disabled="disabled"
  >
    <slot/>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    click: {
      type: Function,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

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
    -webkit-app-region: no-drag;
  }
  .btn-primary:hover:not(:disabled) {
    background: #FFA02D;
  }
  .btn-primary:active:not(:disabled) {
    background: #F38B0C;
  }
  .btn-primary:focus:not(:disabled) {
    background: #FFA02D;
    outline: none;
  }
  .btn-primary:disabled {
    opacity: 0.4;
  }
</style>
