<template>
  <div id="onboard">
    <div id="button-container">
      <div class="spectrum-IllustratedMessage spectrum-IllustratedMessage--cta">
        <img src="../assets/wallet.svg" style="width: 64px;height: 64px;margin-bottom: 20px;" />
        <h2
          class="spectrum-Heading--pageTitle spectrum-IllustratedMessage-heading"
        >{{ lang.getting_started }}</h2>
        <p class="spectrum-Body--secondary spectrum-IllustratedMessage-description">
          <router-link to="/create" class="spectrum-link">{{ lang.create_new }}</router-link>
          {{ lang.to_start }}
          <br />
          {{lang.or }}
          <router-link to="/restore" class="spectrum-Link">{{ lang.restore_existing }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";

/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component
export default class Onboard extends Vue {
  @Prop() language!: Language;

  private lang = WalletHandlerModule.currentLanguage;

  mounted() {
    this.lang = this.language;
  }
}
</script>

<style scoped>
#onboard a {
  color: #fbaa16;
}

#onboard {
  height: 100%;
  display: flex;
  flex-flow: column;
}

#button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1 1 auto;
}

input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}

.helper-user-radio {
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin: 0;
}

button,
input {
  line-height: normal;
}

.helper-user-radio-title {
  margin: 15px 0 5px;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
}

.helper-user-radio-text {
  max-width: 50%;
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
  line-height: 22px;
}

.helper-user-radio-custom {
  padding: 20px;
  text-align: center;
  background: #ff9500;
  color: #ffffff;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  width: 400px;
}
</style>
