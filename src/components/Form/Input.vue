<template>
  <input 
    class="input"
    type="text" 
    :value="value"
    v-on:input="updateValue($event.target.value)"
    v-on:keyup="keyUp($event.target.value)"
  />
</template>

<script>
export default {
  props: ['value'],

  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    keyUp: function(value) {
      this.$emit('keyup', value)
    }
  }

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
    -webkit-app-region: no-drag;
  }
  .input:focus {
    border: 1px solid #555B65;
    outline: none;
  }
</style>
