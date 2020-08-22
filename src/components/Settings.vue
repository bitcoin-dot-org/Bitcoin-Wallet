<template>
  <div id="white-container">
    <div id="dropdowns">
      <p>
        <strong>{{ language.currency }}:</strong>
      </p>
      <sp-dropdown :label="module.settings.currency">
        <sp-menu>
          <sp-menu-item
            v-for="(currency, index) in currencies"
            :key="'cur' + index"
            v-on:click="currencySelected(index)"
          >{{ currency }}</sp-menu-item>
        </sp-menu>
      </sp-dropdown>
      <p style="margin-top: 10px;">
        <strong>{{ language.language }}:</strong>
      </p>
      <sp-dropdown :label="module.settings.language">
        <sp-menu>
          <sp-menu-item
            v-for="(lang, index) in languages"
            :key="'lang' + index"
            v-on:click="languageSelected(index)"
          >{{ lang }}</sp-menu-item>
        </sp-menu>
      </sp-dropdown>
    </div>

    <div id="buttons">
      <button class="spectrum-Button spectrum-Button--secondary" v-on:click="showSeed()">
        <span class="spectrum-Button-label">{{ language.show_seed }}</span>
      </button>

      <button
        style="margin-left: 10px;"
        class="spectrum-Button spectrum-Button--warning"
        v-on:click="closeWallet()"
      >
        <span class="spectrum-Button-label">{{language.exit_wallet }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";

/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component
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
#dropdowns {
  margin-bottom: 10px;
}

#buttons {
  margin-top: 20px;
}
</style>
