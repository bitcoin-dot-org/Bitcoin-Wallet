<template>
  <div class="warning">
    <p class="warning__title">{{ lang.warning }}</p>
    <p class="warning__text">{{ lang.warning_text }}</p>
    <ul class="warning-list">
      <li class="warning-list__item">
        <img src="./../assets/images/write_it_down.svg">
        <p class="warning-list__text">{{ lang.write_it_down }}</p>
      </li>
      <li class="warning-list__item">
        <img src="./../assets/images/keep_it_safe.svg">
        <p class="warning-list__text">{{ lang.keep_it_safe }}</p>
      </li>
      <li class="warning-list__item">
        <img src="./../assets/images/do_not_loose_it.svg">
        <p class="warning-list__text">{{ lang.do_not_loose_it }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";

export default class CreateWarning extends Vue {
  private lang = WalletHandlerModule.currentLanguage
}
</script>

<style scoped>
  .warning {
    max-width: 544px;
    margin: 40px auto 0;
    padding: 16px 24px 32px;
    border: 1px solid #8F3F07;
    border-radius: 2px;
    background: rgba(212, 116, 18, 0.2);
  }
  .warning__title {
    position: relative;
    margin-bottom: 8px;
    padding-left: 32px;
    font-size: 20px;
    line-height: 28px;
    color: #F7931A;
  }
  .warning__title::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background: url('./../assets/images/warning.svg') center no-repeat;
    background-size: contain;
  }
  .warning__text {
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;
  }
  .warning-list {
    display: flex;
    justify-content: space-around;
    padding: 0;
    list-style: none;
  }
  .warning-list__item {
    text-align: center;
  }
  .warning-list__item {
    margin-top: 16px;
    font-weight: 600;
    font-size: 17px;
    line-height: 24px;
    color: #FFFFFF;
  }
</style>
