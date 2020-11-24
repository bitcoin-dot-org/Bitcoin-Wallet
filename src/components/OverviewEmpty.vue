<template>
  <div class="overview-empty">
    <p class="overview-empty__text">
      {{ language.no_transactions }}. <br>
      {{ language.what_to_do }}
    </p>
    <div class="overview-empty__buttons">
      <ButtonPrimary :click="buyClicked">{{ language.buy_bitcoin }}</ButtonPrimary>
      <ButtonPrimary :click="receiveClicked">{{ language.receive }}</ButtonPrimary>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";

  /* eslint-disable no-unused-vars */
  import Language from "@/lang/langInterface";
  /* eslint-enable no-unused-vars */
  
  @Component({ components: { ButtonPrimary }})
  export default class OverviewEmpty extends Vue {
    @Prop() language!: Language;

    receiveClicked() {
      this.$emit('show-receive')
    }

    buyClicked() {
      window.ipcRenderer.send('openLink', 'https://bitcoin.org/en/buy')
    }
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
</style>
