<template>
  <div class="view language-view">
    <div class="language-view__main">
      <h1 class="page-title language-view__title">{{ lang.choose_language }}</h1>
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
    <div class="footer">
      <a class="back-link" @click="$router.go(-1)">{{ lang.back_button }}</a>
      <button class="btn-primary">{{ lang.save_button }}</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import WalletHandlerModule from "@/store/modules/WalletHandlerModule";

  @Component
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
    color: #F7931A;
  }
  .back-link {
    position: relative;
    padding: 8px 24px 8px 48px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: #DCE0E7;
    border: 1px solid #434854;
    border-radius: 2px;
  }
  .back-link::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 24px;
    width: 16px;
    height: 16px;
    transform: translateY(-50%);
    background: url('./../assets/images/arrow-left.svg') center no-repeat;
    background-size: contain;
  }
  .btn-primary {
    padding: 8px 24px;
    background: #F7931A;
    border-radius: 2px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: #FFFFFF;
  }
</style>
