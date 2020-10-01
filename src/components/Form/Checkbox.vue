<template>
  <label class="checkbox">
    <input
      class="checkbox__input"
      type="checkbox"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
    />
    <span class="checkbox__label">{{label}}</span>
  </label>
</template>

<script>
export default {
  props: ['label', 'value']
}
</script>

<style>
  .checkbox__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  .checkbox__label {
    position: relative;
    padding-left: 24px;
    font-size: 14px;
    line-height: 20px;
    color: #DCE0E7;
  }
  .checkbox__label::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 1px;
  }
  .checkbox__input:checked + .checkbox__label::before {
    background: #F7931A url('../../assets/images/checkmark.svg') center no-repeat;
  }
</style>
