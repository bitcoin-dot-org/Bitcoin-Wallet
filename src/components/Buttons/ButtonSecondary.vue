<template>
  <button
    @click="onClick"
    class="btn-secondary"
  >
    <slot/>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    onClick: {
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
  }
</style>
