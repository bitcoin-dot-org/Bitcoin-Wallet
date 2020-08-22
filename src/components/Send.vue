<template>
  <div id="white-container">
    <p>{{ language.enter_address }}</p>
    <div class="spectrum-Textfield spectrum-Textfield--quiet" style="width: 320px;">
      <input
        type="text"
        :placeholder="language.address"
        :style="addressError ? 'border-bottom: 1px solid red;' : ''"
        v-on:keyup="verifyAddress()"
        v-model="address"
        class="spectrum-Textfield-input"
      />
    </div>

    <div
      class="spectrum-Textfield spectrum-Textfield--quiet"
      style="width: 120px;margin-left: 20px;"
    >
      <input
        type="text"
        :placeholder="language.amount"
        v-on:keyup="enableSend()"
        v-on:click="showModal()"
        name="field"
        :value="amount"
        class="spectrum-Textfield-input"
      />
    </div>
    <div class="divider" />
    <div id="flex">
      <div
        id="feebox"
        v-on:click="setSelectedFeeRate(0)"
        :style=" selectedFeeRate == 0 ? 'border: 1px solid orange;' : ''"
      >
        <h1>{{ language.low_priority }}</h1>
        <p>{{ language.low_priority_desc }}</p>
      </div>
      <div
        id="feebox"
        v-on:click="setSelectedFeeRate(1)"
        :style=" selectedFeeRate == 1 ? 'border: 1px solid orange;' : ''"
      >
        <h1>{{ language.standard }}</h1>
        <p>{{ language.standard_desc }}</p>
      </div>
      <div
        id="feebox"
        v-on:click="setSelectedFeeRate(2)"
        :style=" selectedFeeRate == 2 ? 'border: 1px solid orange;' : ''"
      >
        <h1>{{ language.important }}</h1>
        <p>{{ language.important_desc }}</p>
      </div>
    </div>

    <button
      class="spectrum-Button spectrum-Button--cta"
      v-on:click="sendButtonClicked()"
      :disabled="this.sendDisabled"
    >
      <span class="spectrum-Button-label">{{ language.send }}</span>
    </button>

    <div id="error" v-if="dustError">{{ language.dust_error }}</div>
    <div id="error" v-if="transactionError">{{ language.not_enough }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import BigNumber from "bignumber.js";
import * as bitcoin from "bitcoinjs-lib";

/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component
export default class Send extends Vue {
  private address = "";
  private selectedFeeRate = 1;
  private addressError = false;
  private transactionError = false;
  private dustError = false;
  private sendDisabled = true;

  @Prop() amount!: string;
  @Prop() language!: Language;

  showModal() {
    this.$emit("show-amount-modal");
  }

  setSelectedFeeRate(r: number) {
    this.selectedFeeRate = r;
  }

  @Watch("amount")
  onPropertyChanged() {
    this.transactionError = false;

    if (parseFloat(this.amount) > 0 && !this.addressError && this.address != "") {
      this.sendDisabled = false;
    } else {
      this.sendDisabled = true;
    }
  }

  verifyAddress() {
    this.transactionError = false;

    if (this.address == "") {
      this.addressError = false;
      this.sendDisabled = true;
      return;
    }

    try {
      bitcoin.address.toOutputScript(this.address);
      this.addressError = false;

      if (parseFloat(this.amount) > 0) {
        this.sendDisabled = false;
      }
    } catch {
      this.addressError = true;
      this.sendDisabled = true;
    }
  }

  async sendButtonClicked() {
    let sendingMax = false;
    this.addressError = false;
    this.dustError = false;

    if (this.amount == WalletHandlerModule.balance.toString()) {
      sendingMax = true;
    }

    // Are they trying to send dust?
    if (new BigNumber(this.amount).multipliedBy(100000000).toNumber() <= 800) {
      this.dustError = true;
      return;
    }

    let fee = Math.ceil(WalletHandlerModule.feeRates[this.selectedFeeRate]);

    try {
      let psbt = await WalletHandlerModule.wallet.createTransaction(
        new BigNumber(this.amount).multipliedBy(100000000).toNumber(),
        this.address,
        fee,
        sendingMax
      );
      this.$emit("show-transaction-confirm", [psbt, this.address, sendingMax]);
    } catch {
      this.transactionError = true;
    }
  }
}
</script>

<style scoped>
.divider {
  border: 0.2px solid #d2caca;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

#flex {
  display: flex;
}

#feebox {
  width: 300px;
  border: 1px solid #d8d8d8;
  font-size: 11px;
  text-align: center;
  padding: 10px;
  background-color: whitesmoke;
  cursor: pointer;
  margin: 5px;
}

#feebox:hover {
  border: 1px solid orange;
}

#feebox h1 {
  font-size: 12px;
}

#error {
  margin: 0 auto;
  font-size: 12px;
  color: red;
  width: 320px;
}
</style>