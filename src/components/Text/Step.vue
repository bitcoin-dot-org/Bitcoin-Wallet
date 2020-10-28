<template>
  <p class="step">Step <span>{{ currentStep }}</span>/{{ maxSteps }}</p>
</template>

<script>
export default {
  props: ['currentStep', 'maxSteps']
}
</script>

<style>
  .step {
    font-size: 14px;
    line-height: 20px;
    color: #DCE0E7;  
    text-align: center;
  }
  .step span {
    color: #F7931A;
  }
</style>
