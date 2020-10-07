<template>
  <button
    @click="onClick"
    class="btn-primary"
    :disabled="disabled"
  >
    <slot/>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    onClick: {
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
  }
  .btn-primary:disabled {
    background: gray;
  }
</style>
