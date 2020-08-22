<template>
  <div id="box">
    <div class="spectrum-Alert spectrum-Alert--info">
      <div class="spectrum-Alert-content">{{ lang.restore_notice }}</div>
    </div>
    <div id="inner">
      <div id="restore" v-for="(seed, index) in words" :key="index">
        <div class="spectrum-Textfield">
          <input
            type="text"
            :placeholder="index + 1 + '.'"
            v-model="words[index]"
            class="spectrum-Textfield-input"
          />
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
        v-on:click="nextPressed()"
      >
        <span class="spectrum-Button-label">
          <span v-if="!restoring">{{ lang.restore_button }}</span>
          <img v-if="restoring" src="../assets/tail-spin.svg" height="16" />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";

@Component
export default class Restore extends Vue {
  private words = ["", "", "", "", "", "", "", "", "", "", "", ""];
  private restoring = false;
  private lang = WalletHandlerModule.currentLanguage;

  backPressed() {
    this.$router.back();
  }

  async nextPressed() {
    this.restoring = true;
    await WalletHandlerModule.createWallet(this.words.join(" "));
    this.$router.back();
    this.restoring = false;
  }
}
</script>

<style scoped>
#restore input {
  margin: 10px;
  width: 80%;
}
</style>