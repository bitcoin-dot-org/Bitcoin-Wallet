<template>
  <Screen class="language-view">
    <div class="language-view__main">
      <PageTitle class="language-view__title">{{ lang.choose_language }}</PageTitle>
      <ul class="lang-list">
        <li class="lang-list__item">
          <button class="lang-button">Bahasa Indonesia</button>
        </li>
        <li class="lang-list__item">
          <button class="lang-button">Polski</button>
        </li>
        <li class="lang-list__item">
          <button class="lang-button">Dansk</button>
        </li>
        <li class="lang-list__item">
          <button class="lang-button">türkçe</button>
        </li>
        <li class="lang-list__item">
          <button class="lang-button">Deutsch</button>
        </li>
        <li class="lang-list__item">
          <button class="lang-button">Русский</button>
        </li>
        <li class="lang-list__item">
          <button class="lang-button lang-button--active">English</button>
        </li>
        <li class="lang-list__item">
          <button class="lang-button">简体中文</button>
        </li>
      </ul>
    </div>
    <Footer>
      <BackLink />
      <ButtonPrimary :click="() => {}">{{ lang.save_button }}</ButtonPrimary>
    </Footer>
  </Screen>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
  import PageTitle from "@/components/Text/PageTitle.vue";
  import Screen from "@/components/Layout/Screen.vue";
  import Footer from "@/components/Layout/Footer.vue";
  import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
  import BackLink from "@/components/Buttons/BackLink.vue";

  @Component({ components: { PageTitle, Screen, Footer, ButtonPrimary, BackLink } })
  export default class ChooseLanguage extends Vue {
    private lang = WalletHandlerModule.currentLanguage;
  }
</script>

<style scoped>
  .language-view__main {
    flex-grow: 1;
    padding: 40px 30px;
    text-align: center;
  }
  .language-view__title {
    margin-bottom: 32px;
    text-transform: capitalize;
  }
  .lang-list {
    display: flex;
    flex-wrap: wrap;
    max-width: 360px;
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }
  .lang-list__item {
    width: 50%;
    margin-bottom: 8px;
  }
  .lang-button {
    width: 100%;
    height: 40px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: #ACB2BB;
    border: none;
    border-radius: 3px;
    background: transparent;
  }
  .lang-button--active {
    background: #2B2F3A;
  }
</style>
