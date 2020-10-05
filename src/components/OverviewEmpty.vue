<template>
  <div class="overview-empty">
    <p class="overview-empty__text">
      {{ lang.no_transactions }}. <br>
      {{ lang.what_to_do }}
    </p>
    <div class="overview-empty__buttons">
      <ButtonPrimary class="button-send">{{ lang.send }}</ButtonPrimary>
      <ButtonPrimary class="button-receive">{{ lang.receive }}</ButtonPrimary>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
  import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
  /* eslint-disable no-unused-vars */
  import Language from "@/lang/langInterface";
  /* eslint-enable no-unused-vars */
  
  @Component({ components: { ButtonPrimary }})
  export default class OverviewEmpty extends Vue {
    private lang = WalletHandlerModule.currentLanguage;
  }
</script>
<style scoped>
  .overview-empty {
    margin-top: 112px;
  }
  .overview-empty__text {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #7E858F;
  }
  .overview-empty__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }
  .overview-empty__buttons > * + * {
    margin-left: 16px;
  }
  .button-send {
    padding-left: 48px;
    background-image: url('../assets/images/send-arrow.svg');
    background-repeat: no-repeat;
    background-position: 24px center;
  }
  .button-receive {
    padding-left: 48px;
    background-image: url('../assets/images/receive-arrow.svg');
    background-repeat: no-repeat;
    background-position: 24px center;
  }
</style>
