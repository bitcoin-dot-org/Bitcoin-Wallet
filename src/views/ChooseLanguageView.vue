<template>
  <Screen class="language-view">
    <div class="language-view__main">
      <PageTitle class="language-view__title">{{ lang.choose_language }}</PageTitle>
      <ul class="lang-list">
        <li class="lang-list__item"
        v-for="(language, index) in languages"
        :key="language+index">
          <button v-on:click="selectedIndex = index" v-bind:class="['lang-button', index == selectedIndex ? 'lang-button--active' : '' ]">{{ language }}</button>
        </li>
      </ul>
    </div>
    <Footer>
      <BackLink />
      <ButtonPrimary :click="saveButtonClicked">{{ lang.save_button }}</ButtonPrimary>
    </Footer>
  </Screen>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
  import PageTitle from "@/components/Text/PageTitle.vue";
  import Screen from "@/components/Layout/Screen.vue";
  import Utils from "@/Utils/utils.ts"
  import Footer from "@/components/Layout/Footer.vue";
  import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
  import BackLink from "@/components/Buttons/BackLink.vue";

  @Component({ components: { PageTitle, Screen, Footer, ButtonPrimary, BackLink } })
  export default class ChooseLanguage extends Vue {
    private lang = WalletHandlerModule.currentLanguage;
    private languages = ["English", "Español", "Catalan", "Français", 'Português Brasil', "日本語"]
    private selectedIndex = this.languages.findIndex((l) => l == Utils.languageBigName(WalletHandlerModule.settings.language))

    saveButtonClicked() {
      WalletHandlerModule.changeLanguage(Utils.languageShortCode(this.languages[this.selectedIndex]))
      this.$router.go(-1)
    }

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
    -webkit-app-region: no-drag;
  }
  .lang-button:not(.lang-button--active):hover {
    color: #F7931A;
  }
  .lang-button:not(.lang-button--active):focus {
    color: #F7931A;
    outline: none;
  }
  .lang-button--active {
    background: #2B2F3A;
  }

  .lang-button--active:focus {
    outline: none;
  }
</style>
