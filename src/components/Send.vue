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
          v-model="address"
        />
      </Label>

      <div class="send-row">
        <div class="send-row__item">
          <Label>
            {{ language.amount_to_send }}
            <Input
            v-model="btcAmount"
            v-on:keyup="calculateFiat()"
            :placeholder="0"
            :style="notEnoughBalance ? 'border: 1px solid red;' : ''" />
            <p class="currency">BTC</p>
          </Label>
        </div>
        <button class="swap-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2189 11.469C15.2885 11.3992 15.3713 11.3437 15.4624 11.3059C15.5535 11.2681 15.6512 11.2487 15.7499 11.2487C15.8485 11.2487 15.9462 11.2681 16.0373 11.3059C16.1284 11.3437 16.2112 11.3992 16.2809 11.469L20.7809 15.969C20.8507 16.0387 20.9061 16.1214 20.9439 16.2125C20.9818 16.3037 21.0012 16.4013 21.0012 16.5C21.0012 16.5986 20.9818 16.6963 20.9439 16.7874C20.9061 16.8786 20.8507 16.9613 20.7809 17.031L16.2809 21.531C16.14 21.6718 15.949 21.7509 15.7499 21.7509C15.5507 21.7509 15.3597 21.6718 15.2189 21.531C15.078 21.3902 14.9989 21.1992 14.9989 21C14.9989 20.8008 15.078 20.6098 15.2189 20.469L19.1894 16.5L15.2189 12.531C15.149 12.4613 15.0936 12.3786 15.0558 12.2874C15.018 12.1963 14.9985 12.0986 14.9985 12C14.9985 11.9013 15.018 11.8037 15.0558 11.7125C15.0936 11.6214 15.149 11.5387 15.2189 11.469Z" fill="#7E858F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99988 16.5C2.99988 16.3011 3.07889 16.1103 3.21955 15.9697C3.3602 15.829 3.55096 15.75 3.74988 15.75H19.4999C19.6988 15.75 19.8896 15.829 20.0302 15.9697C20.1709 16.1103 20.2499 16.3011 20.2499 16.5C20.2499 16.6989 20.1709 16.8897 20.0302 17.0303C19.8896 17.171 19.6988 17.25 19.4999 17.25H3.74988C3.55096 17.25 3.3602 17.171 3.21955 17.0303C3.07889 16.8897 2.99988 16.6989 2.99988 16.5ZM8.78088 2.469C8.85072 2.53867 8.90614 2.62143 8.94394 2.71255C8.98175 2.80367 9.00122 2.90135 9.00122 3C9.00122 3.09865 8.98175 3.19633 8.94394 3.28745C8.90614 3.37857 8.85072 3.46133 8.78088 3.531L4.81038 7.5L8.78088 11.469C8.85061 11.5387 8.90592 11.6215 8.94366 11.7126C8.9814 11.8037 9.00082 11.9014 9.00082 12C9.00082 12.0986 8.9814 12.1963 8.94366 12.2874C8.90592 12.3785 8.85061 12.4613 8.78088 12.531C8.71114 12.6007 8.62836 12.656 8.53725 12.6938C8.44614 12.7315 8.34849 12.7509 8.24988 12.7509C8.15126 12.7509 8.05361 12.7315 7.9625 12.6938C7.87139 12.656 7.78861 12.6007 7.71888 12.531L3.21888 8.031C3.14903 7.96133 3.09362 7.87857 3.05581 7.78745C3.018 7.69633 2.99854 7.59865 2.99854 7.5C2.99854 7.40135 3.018 7.30367 3.05581 7.21255C3.09362 7.12143 3.14903 7.03867 3.21888 6.969L7.71888 2.469C7.78854 2.39915 7.87131 2.34374 7.96242 2.30593C8.05354 2.26812 8.15122 2.24866 8.24988 2.24866C8.34853 2.24866 8.44621 2.26812 8.53733 2.30593C8.62844 2.34374 8.71121 2.39915 8.78088 2.469Z" fill="#7E858F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 7.5C3.75 7.30109 3.82902 7.11032 3.96967 6.96967C4.11032 6.82902 4.30109 6.75 4.5 6.75H20.25C20.4489 6.75 20.6397 6.82902 20.7803 6.96967C20.921 7.11032 21 7.30109 21 7.5C21 7.69891 20.921 7.88968 20.7803 8.03033C20.6397 8.17098 20.4489 8.25 20.25 8.25H4.5C4.30109 8.25 4.11032 8.17098 3.96967 8.03033C3.82902 7.88968 3.75 7.69891 3.75 7.5Z" fill="#7E858F"/>
        </svg>
        </button>
        <div class="send-row__item">
          <button class="send-max" v-on:click="sendMax()">Send max</button>
          <Input
          v-model="fiatAmount"
          :placeholder="0"
          v-on:keyup="calculateBtc()"
          :style="notEnoughBalance ? 'border: 1px solid red;' : ''" />
          <p class="currency">{{ currency }}</p>
        </div>
      </div>
      
      <Label>Bitcoin Network Fee
      <div class="radio-row">
        <div
          class="radio"
          :style=" selectedFeeRate == 0 ? 'border: 1px solid #F7931A;' : ''"
        >
        <div class="radio-content" v-on:click="setSelectedFeeRate(0)">
          <h3 class="radio__title">{{ language.low_priority }}</h3>
          <p class="radio__text">{{ language.low_priority_desc }}</p>
        </div>
        </div>
        <div
          class="radio"
          :style=" selectedFeeRate == 1 ? 'border: 1px solid #F7931A;' : ''"
        >
        <div class="radio-content" v-on:click="setSelectedFeeRate(1)">
          <h3 class="radio__title">{{ language.standard }}</h3>
          <p class="radio__text">{{ language.standard_desc }}</p>
        </div>
        </div>
        <div
          class="radio"
          :style=" selectedFeeRate == 2 ? 'border: 1px solid #F7931A;' : ''"
        >
        <div class="radio-content" v-on:click="setSelectedFeeRate(2)">
          <h3 class="radio__title">{{ language.important }}</h3>
          <p class="radio__text">{{ language.important_desc }}</p>
          </div>
        </div>
      </div>
      </Label>
    </DashboardContent>
    <Footer class="send-footer">
      <div class="send-footer__info">
        <p v-if="this.cantSendAmountWithFee" class="send-footer__label">{{ language.not_enough}}</p>
        <p v-if="this.isSendingdust" class="send-footer__label">{{ language.dust_error}}</p>
        <div class="send-footer__item"  v-if="!this.cantSendAmountWithFee && !this.isSendingdust">
          <p class="send-footer__label">{{ language.bitcoin_network_fee }}</p>
          <p class="send-footer__amount">{{networkFeeBtc}} BTC</p>
          <p class="send-footer__amount-alt">{{ networkFeeFiat }}</p>
        </div>
        <div class="send-footer__item"  v-if="!this.cantSendAmountWithFee && !this.isSendingdust">
          <p class="send-footer__label">{{ language.total }}</p>
          <p class="send-footer__amount">{{ btcTotal }} BTC</p>
          <p class="send-footer__amount-alt">{{ btcTotalFiat }}</p>
        </div>
      </div>
      <ButtonPrimary
        :click="sendButtclicked"
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
import * as coinSelect from 'coinselect/accumulative'
import * as coinSelectSplit from 'coinselect/split'
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
import { Wallet } from '@/wallet/wallet';

/* eslint-enable no-unused-vars */

@Component({components: { DashboardTitle, DashboardSubtitle, DashboardContent, Input, Label, Screen, Footer, ButtonPrimary }})
export default class Send extends Vue {
  private address = "";
  private btcAmount = ''
  private fiatAmount = ''
  private selectedFeeRate = 1;
  private addressError = false;

  @Prop() currency!: string;
  @Prop() language!: Language;

  showModal() {
    this.$emit("show-amount-modal");
  }

  setSelectedFeeRate(r: number) {
    this.selectedFeeRate = r;
  }

calculateBtc() {

    if(this.fiatAmount == '') {
      this.btcAmount = ''
      return
    }

    let fiat = this.fiatAmount;

    // Determine the format
    let format = new Intl.NumberFormat(WalletHandlerModule.settings.languageCode).format(1.5);

    // Are we in commas as decimal land?
    let commasAsDecimal = format == "1,5";

    // Let's adjust our format
    if (commasAsDecimal) {
      fiat = fiat.replace(".", "");
      fiat = fiat.replace(",", ".");
    }

    this.btcAmount = (
      parseFloat(fiat.replace(/,/g, "")) / WalletHandlerModule.fiatRate
    ).toFixed(8).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");

    if (isNaN(parseFloat(this.btcAmount))) {
      this.btcAmount = "0";
    }

}

get sendDisabled() {
  return this.cantSendAmountWithFee || this.addressError || this.address == '' || this.notEnoughBalance || this.isSendingdust || isNaN(parseFloat(this.btcAmount)) || parseFloat(this.btcAmount) <= 0
}

get isSendingdust() {
  if(this.btcAmount != '' && parseFloat(this.btcAmount) > 0 && !isNaN(parseFloat(this.btcAmount))) {
    return new BigNumber(this.btcAmount).multipliedBy(100000000).toNumber() <= 800
  }
  else {
    return false
  }
}

get cantSendAmountWithFee() {
  return this.networkFeeBtc == 'x'
}

get notEnoughBalance() {
  return new BigNumber(this.btcAmount).gt(WalletHandlerModule.balance)
}

get sendingMax() {
  return this.btcAmount == WalletHandlerModule.balance.toString()
}

get networkFeeBtc() {

    let networkFee = '0'

    if(!this.notEnoughBalance && parseFloat(this.btcAmount) > 0 && !this.isSendingdust && !isNaN(parseFloat(this.btcAmount))) {

    let target = undefined
    let select = coinSelect
    let utxos = WalletHandlerModule.utxos

      if (this.sendingMax) {
          target = [{ address: "3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd" }]
          select = coinSelectSplit
      }

      else {
          target = [{ address: "3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd", value: new BigNumber(this.btcAmount).multipliedBy(100000000).toNumber() }]
      }

      let { inputs, outputs, fee } = select(utxos, target, WalletHandlerModule.feeRates[this.selectedFeeRate])

      if (!inputs || !outputs || fee == 0) {
        networkFee = 'x'
      }

      else {
        networkFee =  this.sendingMax ? new BigNumber(fee).dividedBy(100000000).negated().toFixed(8) :  new BigNumber(fee).dividedBy(100000000).toFixed(8)
      }

      return networkFee
  }

  return '0'
}

get networkFeeFiat() {
    let fiat = (new BigNumber(this.networkFeeBtc).multipliedBy(WalletHandlerModule.fiatRate)).toFixed(2);

    if (isNaN(parseFloat(fiat))) {
      fiat = "0";
    }

    return new Intl.NumberFormat(WalletHandlerModule.settings.languageCode, { style: 'currency', currency: WalletHandlerModule.settings.currency }).format(parseFloat(fiat));
}

get btcTotal() {
  if (parseFloat(this.btcAmount) > 0 && !this.notEnoughBalance) {
    return new BigNumber(this.btcAmount).plus(this.networkFeeBtc).toFixed(8)
  }
  else {
    return '0'
  }
}

get btcTotalFiat() {
    let fiat = (parseFloat(this.btcTotal) * WalletHandlerModule.fiatRate).toFixed(2);

    if (isNaN(parseFloat(fiat))) {
      fiat = "0";
    }

    return new Intl.NumberFormat(WalletHandlerModule.settings.languageCode, { style: 'currency', currency: WalletHandlerModule.settings.currency }).format(parseFloat(fiat));
}

@Watch('currency') 
  currencyChanged() {
    this.calculateFiat()
  }

  @Watch("address")
  verifyAddress() {
    
    if (this.address == "") {
      this.addressError = false;
      return;
    }

    try {
      bitcoin.address.toOutputScript(this.address);
      this.addressError = false;
    } catch {
      this.addressError = true;
    }
  }

  calculateFiat() {

    if(this.btcAmount == '') {
      this.fiatAmount = ''
      return
    }

    let fiat = (parseFloat(this.btcAmount) * WalletHandlerModule.fiatRate).toFixed(2);

    if (isNaN(parseFloat(fiat))) {
      fiat = "0"
    }

     this.fiatAmount = new Intl.NumberFormat(WalletHandlerModule.settings.languageCode).format(parseFloat(fiat))

  }

  sendMax() {
    this.btcAmount = WalletHandlerModule.balance.toFixed(8)
    this.calculateFiat()
  }


  async sendButtclicked() {

    let fee = WalletHandlerModule.feeRates[this.selectedFeeRate];

    try {
      let psbt = await WalletHandlerModule.wallet.createTransaction(
        new BigNumber(this.btcAmount).multipliedBy(100000000).toNumber(),
        this.address,
        fee,
        this.sendingMax
      );
      this.$emit("show-transaction-confirm", [psbt, this.address, this.sendingMax]);
    } catch {
      console.log("Trigger some error here")
    }
  }
}
</script>

<style scoped>
  .send-view {
    max-width: 620px;
  }
  .swap-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin: 0 28px 6px;
    padding: 0;
    border: none;
    background: none;
    cursor: default;
  }
  .swap-btn:active, .swap-btn:focus {
    outline: none;
  }
  .send-row {
    display: flex;
    align-items: flex-end;
    margin: 24px 0 20px;
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
  .send-max:hover {
    background: #434854;
  }
  .send-max:focus {
    background: #434854;
    outline: none;
  }
  .send-max:active {
    background: #1F232E;
  }
  .radio-row {
    display: flex;
    text-transform: none;
  }
  .radio {
    background: linear-gradient(180deg, #1F232E 0%, #13161F 100%);
    border: 1px solid #2B2F3A;
    box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    cursor: pointer;
  }
  .radio-content {
    padding: 16px;
  }
  .radio:focus, .radio:active {
    outline: none;
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
    text-align: left;
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
    width: 50px;
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
