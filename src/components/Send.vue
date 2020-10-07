<template>
  <Screen class="send">
    <DashboardContent class="send-view">
      <DashboardTitle>{{ language.send }}</DashboardTitle>
      <DashboardSubtitle>{{ language.send_to }}.</DashboardSubtitle>
      <Label>
        {{ language.bitcoin_address }}
        <Input
          :placeholder="language.address"
          :style="addressError ? 'border: 1px solid red;' : ''"
          v-on:keyup="verifyAddress()"
          v-model="address"
        />
      </Label>

      <div class="send-row">
        <div class="send-row__item">
          <Label>
            {{ language.amount_to_send }}
            <Input />
            <p class="currency">BTC</p>
          </Label>
        </div>
        <button class="swap-btn">
          <img src="../assets/images/swap.svg">
        </button>
        <div class="send-row__item">
          <button class="send-max">Send max</button>
          <Input />
          <p class="currency">USD</p>
        </div>
      </div>
      
      <!-- <div
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
      </div> -->
      <div class="radio-row">
        <div
          class="radio"
          v-on:click="setSelectedFeeRate(0)"
          :style=" selectedFeeRate == 0 ? 'border: 1px solid #F7931A;' : ''"
        >
          <h3 class="radio__title">{{ language.low_priority }}</h3>
          <p class="radio__text">{{ language.low_priority_desc }}</p>
        </div>
        <div
          class="radio"
          v-on:click="setSelectedFeeRate(1)"
          :style=" selectedFeeRate == 1 ? 'border: 1px solid #F7931A;' : ''"
        >
          <h3 class="radio__title">{{ language.standard }}</h3>
          <p class="radio__text">{{ language.standard_desc }}</p>
        </div>
        <div
          class="radio"
          v-on:click="setSelectedFeeRate(2)"
          :style=" selectedFeeRate == 2 ? 'border: 1px solid #F7931A;' : ''"
        >
          <h3 class="radio__title">{{ language.important }}</h3>
          <p class="radio__text">{{ language.important_desc }}</p>
        </div>
      </div>
      <div id="error" v-if="dustError">{{ language.dust_error }}</div>
      <div id="error" v-if="transactionError">{{ language.not_enough }}</div>
    </DashboardContent>
    <Footer class="send-footer">
      <div class="send-footer__info">
        <div class="send-footer__item">
          <p class="send-footer__label">{{ language.bitcoin_network_fee }}</p>
          <p class="send-footer__amount">0.00023271 BTC</p>
          <p class="send-footer__amount-alt">$2.32 USD</p>
        </div>
        <div class="send-footer__item">
          <p class="send-footer__label">{{ language.total }}</p>
          <p class="send-footer__amount">0.00 BTC</p>
          <p class="send-footer__amount-alt">$0.00 USD</p>
        </div>
      </div>
      <ButtonPrimary
        :onClick="sendButtonClicked"
        :disabled="this.sendDisabled"
      >
        {{ language.send }}
      </ButtonPrimary>
    </Footer>
  </Screen>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import DashboardContent from "@/components/Layout/DashboardContent.vue";
import DashboardTitle from "@/components/Text/DashboardTitle.vue";
import DashboardSubtitle from "@/components/Text/DashboardSubtitle.vue";
import Input from "@/components/Form/Input.vue";
import Label from "@/components/Form/Label.vue";
import Screen from "@/components/Layout/Screen.vue";
import Footer from "@/components/Layout/Footer.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import BigNumber from "bignumber.js";
import * as bitcoin from "bitcoinjs-lib";

/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component({components: { DashboardTitle, DashboardSubtitle, DashboardContent, Input, Label, Screen, Footer, ButtonPrimary }})
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
  .send-view {
    max-width: 620px;
  }
  .swap-btn {
    margin: 0 28px 6px;
    padding: 0;
    border: none;
    background: none;
  }
  .send-row {
    display: flex;
    align-items: flex-end;
    margin: 24px 0 32px;
  }
  .send-row__item {
    position: relative;
    width: 100%;
  }
  .currency {
    position: absolute;
    bottom: 10px;
    right: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #555B65;
  }
  .send-max {
    width: 72px;
    height: 22px;
    display: block;
    padding: 0;
    margin: 0 0 8px auto;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    text-transform: uppercase;
    color: #DCE0E7;
    border: none;
    background: #2B2F3A;
    border-radius: 2px;
  }
  .radio-row {
    display: flex;
  }
  .radio {
    padding: 16px;
    background: linear-gradient(180deg, #1F232E 0%, #13161F 100%);
    border: 1px solid #2B2F3A;
    box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    cursor: pointer;
  }
  .radio + .radio {
    margin-left: 10px;
  }
  .radio__title {
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: #DCE0E7;
  }
  .radio__text {
    font-size: 11px;
    line-height: 18px;
    color: #ACB2BB;
  }
  .send-footer {
    display: flex;
    justify-content: space-between;
  }
  .send-footer__info {
    max-width: 333px;
    width: 100%;
  }
  .send-footer__label {
    font-size: 11px;
    line-height: 18px;
    color: #7E858F;
  }
  .send-footer__amount {
    display: flex;
    align-items: center;
  }
  .send-footer__amount {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #DCE0E7;
    margin-right: 48px;
    margin-left: auto;
  }
  .send-footer__amount-alt {
    font-size: 11px;
    line-height: 18px;
    text-align: right;
    color: #7E858F;
  }
  .send-footer__item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .send-footer__item + .send-footer__item {
    margin-top: 2px;
  } 
</style>
