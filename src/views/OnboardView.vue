<template>
  <Screen class="onboard-view">
    <h1 class="onboard-view__title">
      {{ lang.getting_started }}
    </h1>
    <div class="onboard-view__row">
      <router-link to="/create" class="onboarding-link">
        <img src="../assets/images/create.svg" />
        <h2 class="onboarding-link__title">{{ lang.create_new }}</h2>
        <p class="onboarding-link__text">{{ lang.create_subtext }}</p>
      </router-link>
      <router-link to="/restore" class="onboarding-link">
        <img src="../assets/images/restore.svg" />
        <h2 class="onboarding-link__title">{{ lang.restore_existing }}</h2>
        <p class="onboarding-link__text">{{ lang.restore_subtext }}</p>
      </router-link>
    </div>
    <div class="language-select">
      <p class="language-select__text">{{ lang.change_language }}</p>
      <router-link to="/language" class="language-select__link">English</router-link>
    </div>
  </Screen>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import Screen from "@/components/Layout/Screen.vue";
import PageSubtitle from "@/components/Text/PageSubtitle.vue";
/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component({ components: { Screen, PageSubtitle } })
export default class Onboard extends Vue {
  @Prop() language!: Language;

  private lang = WalletHandlerModule.currentLanguage;

  mounted() {
    this.lang = this.language;
  }
}
</script>



<style scoped>
  .onboard-view {
    align-items: center;
    justify-content: center;
    padding: 40px 30px 44px;
    text-align: center;
  }

  .onboard-view__title {
    margin-bottom: 16px;
    font-weight: normal;
    font-size: 40px;
    line-height: 56px;
    color: #fff;
  }
  .onboard-view__title span {
    color: #F7931A;
  }
  .onboard-view__subtitle {
    margin-bottom: 40px;
  }
  .onboard-view__row {
    display: flex;
  }
  .onboarding-link {
    padding: 40px 32px;
    background: linear-gradient(180deg, #1F232E 0%, #13161F 100%);
    border: 1px solid #2B2F3A;
    box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    text-decoration: none;
  }
  .onboarding-link:hover {
    border: 1px solid #F7931A;
  }
  .onboarding-link + .onboarding-link {
    margin-left: 16px;
  }
  .onboarding-link__title {
    margin: 16px 0 8px;
    font-weight: normal;
    font-size: 22px;
    line-height: 32px;
    color: #FFFFFF;
  }
  .onboarding-link__text {
    max-width: 236px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 20px;
    color: #ACB2BB;
  }
  .onboard-view__footer {
    display: flex;
  }
  .language-select {
    display: flex;
    align-items: center;
    margin-top: 56px;
  }
  .language-select__text {
    margin-right: 8px;
    font-size: 14px;
    line-height: 20px;
    color: #ACB2BB;
  }
  .language-select__link {
    padding: 1px 8px; 
    background: #F7931A;
    border-radius: 2px;
    text-decoration: none;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    color: #FFFFFF;
    text-transform: uppercase;
  }
  .language-select__link:hover {
    background: #FFA02D;
  }
  .language-select__link:active {
    background: #F38B0C;
  }
</style>
