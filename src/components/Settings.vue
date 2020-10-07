<template>
  <Screen>
    <DashboardContent>
      <DashboardTitle class="settings__title">{{ language.settings }}</DashboardTitle>
      <Label class="settings-label">
        {{ language.currency }}
        <div>
          <sp-dropdown class="dropdown-wrapper" :label="module.settings.currency">
            <sp-menu>
              <sp-menu-item
                v-for="(currency, index) in currencies"
                :key="'cur' + index"
                v-on:click="currencySelected(index)"
              >{{ currency }}</sp-menu-item>
            </sp-menu>
          </sp-dropdown>
        </div>
      </Label>
      <Label class="settings-label">
        {{ language.language }}
        <div>
          <sp-dropdown class="dropdown-wrapper" :label="module.settings.language">
            <sp-menu>
              <sp-menu-item
                v-for="(lang, index) in languages"
                :key="'lang' + index"
                v-on:click="languageSelected(index)"
              >{{ lang }}</sp-menu-item>
            </sp-menu>
          </sp-dropdown>
        </div>
      </Label>
    </DashboardContent>

    <Footer>
      <ButtonSecondary :click="showSeed">{{ language.show_seed }}</ButtonSecondary>
      <ButtonSecondary class="exit-button" :click="closeWallet">
        <img src="../assets/images/exit.svg" alt="exit">
        {{language.exit_wallet }}
      </ButtonSecondary>
    </Footer>
  </Screen>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import DashboardTitle from "@/components/Text/DashboardTitle.vue";
import Label from "@/components/Form/Label.vue";
import DashboardContent from "@/components/Layout/DashboardContent.vue";
import Screen from "@/components/Layout/Screen.vue";
import Footer from "@/components/Layout/Footer.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import '@spectrum-web-components/styles/all-medium-darkest.css';

/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component({components: { DashboardTitle, Label, Screen, Footer, DashboardContent, ButtonSecondary }})
export default class Settings extends Vue {
  @Prop() language!: Language;

  // Probably should have these in a config file, but cba bothering to load it in, so just keep it here
  private currencies = [
    "USD",
    "AUD",
    "BRL",
    "CAD",
    "CHF",
    "CLP",
    "CNY",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "NZD",
    "PLN",
    "RUB",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
  ];
  private languages = ["English", "Español", "Français"];
  private module = WalletHandlerModule;

  async currencySelected(index: number) {
    await WalletHandlerModule.changeCurrency(this.currencies[index]);
    this.$emit("currency-changed");
  }

  async languageSelected(index: number) {
    await WalletHandlerModule.changeLanguage(this.languages[index]);
    this.$emit("language-changed");
  }

  closeWallet() {
    this.$emit("close");
  }

  showSeed() {
    this.$emit("show-seed");
  }
}
</script>

<style scoped>
  .dropdown-wrapper {
    width: 100%;
  }
  .settings-label + .settings-label {
    margin-top: 16px;
  }
  .dashboard__content {
    padding: 0;
  }
  .settings__title {
    margin-bottom: 40px;
  }
  button.exit-button {
    display: flex;
    align-items: center;
    color: #F7931A;
  }
  .exit-button img {
    margin-right: 8px;
  }
</style>
