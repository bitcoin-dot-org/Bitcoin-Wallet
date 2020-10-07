<template>
  <input 
    class="input"
    type="text" 
    :value="value" 
    @input="$emit('change', $event.target.value)"
  />
</template>

<script>
export default {
  props: ['value'],
};
</script>

<style scoped>
  .input {
    width: 100%;
    height: 40px;
    padding: 10px 16px;
    background: #090C14;
    border: 1px solid #2B2F3A;
    border-radius: 2px;
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;
  }
  .input:focus {
    border: 1px solid #555B65;
    outline: none;
  }
</style>
