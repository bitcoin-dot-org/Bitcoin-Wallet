<template>
  <div id="box">
    <div id="inner">
      <div class="spectrum-Alert spectrum-Alert--warning">
        <svg
          class="spectrum-Icon spectrum-UIIcon-AlertMedium spectrum-Alert-icon"
          focusable="false"
          aria-hidden="true"
        >
          <use xlink:href="#spectrum-css-icon-AlertMedium" />
        </svg>
        <div class="spectrum-Alert-content">{{ lang.generate_notice }}</div>
      </div>
      <div class="spectrum-Tags" role="list" aria-label="list">
        <div
          class="spectrum-Tags-item"
          role="listitem"
          v-for="(word, index) in mnemonic"
          :key="index"
        >
          <span class="spectrum-Tags-itemLabel">{{ word }}</span>
        </div>
      </div>
    </div>
    <div id="navigation">
      <button class="spectrum-Button spectrum-Button--primary" v-on:click="backPressed()">
        <span class="spectrum-Button-label">{{ lang.back_button }}</span>
      </button>
      <button
        class="spectrum-Button spectrum-Button--cta"
        style="margin-left: 10px;"
        v-on:click="generatePressed()"
      >
        <span class="spectrum-Button-label">
          <span v-if="!loading">{{ generated ? lang.wrote_it_down : lang.generate }}</span>
          <img v-if="loading" src="../assets/tail-spin.svg" height="16" />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";

import * as bip39 from "bip39";

@Component
export default class Create extends Vue {
  private generated = false
  private loading = false
  private mnemonic: string[] = []
  private lang = WalletHandlerModule.currentLanguage

  backPressed(): void {
    this.$router.back();
  }

  async generatePressed() {
    this.loading = true;

    if (this.mnemonic.length > 0) {
      await WalletHandlerModule.createWallet(this.mnemonic.join(" "));
      this.$router.back();
      this.loading = false;
    } else {
      setTimeout(() => {
        this.mnemonic = bip39.generateMnemonic().split(" ");
        this.generated = true;
        this.loading = false;
      }, 2000);
    }
  }
}
</script>