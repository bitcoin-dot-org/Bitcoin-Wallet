<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="balance">
        <div class="balance__row">
          <p class="balance__title">{{ lang.total_balance }}:</p>
          <button
            v-on:click="refresh()"
            :class="['refresh-button', refreshing ? 'spin' : '']"
          >
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.67007 6.70601C3.86284 5.98616 4.21408 5.31851 4.69809 4.75188C5.18211 4.18526 5.78666 3.73398 6.46753 3.43108C7.1484 3.12817 7.88837 2.98129 8.63331 3.00117C9.37826 3.02106 10.1093 3.20721 10.7731 3.54601C10.8316 3.57582 10.8955 3.5938 10.961 3.59893C11.0265 3.60405 11.0924 3.59623 11.1549 3.57589C11.2174 3.55555 11.2753 3.52311 11.3253 3.4804C11.3752 3.4377 11.4163 3.38558 11.4461 3.32701C11.4759 3.26844 11.4939 3.20457 11.499 3.13905C11.5041 3.07353 11.4963 3.00764 11.476 2.94515C11.4556 2.88266 11.4232 2.82478 11.3805 2.77483C11.3378 2.72487 11.2856 2.68382 11.2271 2.65401C9.964 2.00951 8.51348 1.83318 7.13279 2.1563C5.75209 2.47942 4.53045 3.2811 3.68455 4.41916C2.83864 5.55721 2.42313 6.95809 2.51173 8.37332C2.60032 9.78855 3.18729 11.1267 4.16852 12.1503C5.14975 13.174 6.46183 13.8171 7.87205 13.9655C9.28226 14.1139 10.6995 13.7581 11.8723 12.9611C13.0451 12.1641 13.8978 10.9775 14.2791 9.61169C14.6603 8.2459 14.5455 6.78922 13.9551 5.50001C13.8998 5.37933 13.7988 5.28557 13.6744 5.23934C13.5499 5.19311 13.4122 5.19821 13.2916 5.25351C13.1709 5.3088 13.0771 5.40977 13.0309 5.5342C12.9847 5.65863 12.9898 5.79633 13.0451 5.91701C13.3794 6.64646 13.5332 7.44566 13.4936 8.24709C13.454 9.04852 13.222 9.82865 12.8174 10.5216C12.4127 11.2145 11.8473 11.7998 11.1688 12.2282C10.4902 12.6565 9.71859 12.9152 8.91901 12.9825C8.11942 13.0498 7.31539 12.9237 6.57482 12.6148C5.83425 12.3059 5.17891 11.8233 4.66415 11.2077C4.14939 10.5922 3.79033 9.86181 3.61731 9.07828C3.44429 8.29474 3.46239 7.48107 3.67007 6.70601Z" fill="#7E858F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.64689 0.145996C8.74066 0.052261 8.86781 -0.000396729 9.00039 -0.000396729C9.13298 -0.000396729 9.26013 0.052261 9.35389 0.145996L11.8539 2.646C11.9005 2.69244 11.9374 2.74762 11.9626 2.80836C11.9878 2.86911 12.0008 2.93423 12.0008 3C12.0008 3.06576 11.9878 3.13088 11.9626 3.19163C11.9374 3.25238 11.9005 3.30755 11.8539 3.354L9.35389 5.854C9.30741 5.90042 9.25223 5.93723 9.19152 5.96233C9.1308 5.98743 9.06574 6.00032 9.00004 6.00027C8.93434 6.00023 8.8693 5.98724 8.80862 5.96206C8.74794 5.93687 8.69282 5.89998 8.64639 5.8535C8.55264 5.75961 8.50002 5.63233 8.50012 5.49964C8.50016 5.43395 8.51315 5.3689 8.53833 5.30822C8.56352 5.24754 8.60041 5.19242 8.64689 5.146L10.7929 3L8.64689 0.853996C8.60033 0.807551 8.56339 0.752375 8.53818 0.69163C8.51297 0.630885 8.5 0.565764 8.5 0.499996C8.5 0.434229 8.51297 0.369108 8.53818 0.308363C8.56339 0.247618 8.60033 0.192442 8.64689 0.145996Z" fill="#7E858F"/>
              </g>
              <defs>
              <clipPath id="clip0">
              <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
              </clipPath>
              </defs>
            </svg>

          </button>
        </div>
        <p class="balance__amount">
          <span class="balance__amount-large">{{ balance }}</span>
          <span class="balance__currency-abbr">BTC</span>
        </p>
        <p class="balance__amount">
          {{ btcToFiat(balance.toString()) }}
          <span class="balance__currency-abbr">{{ !btcToFiat(balance.toString()).includes(this.walletModule.settings.currency) ? this.walletModule.settings.currency : '' }}</span>
        </p>
      </div>
      <nav class="nav">
        <ul class="nav__list">
          <li>
            <button
              v-on:click="currentTab = 'Overview'"
              :class="['nav__btn nav__btn--overview', currentTab === 'Overview' && 'active']"
            >
              {{ lang.overview }}
            </button>
          </li>
          <li>
            <button
              v-on:click="currentTab = 'Send'"
              :class="['nav__btn nav__btn--send', currentTab === 'Send' && 'active']"
            >
              {{ lang.send }}
            </button>
          </li>
          <li>
            <button
              v-on:click="currentTab = 'Receive'"
              :class="['nav__btn nav__btn--receive', currentTab === 'Receive' && 'active']"
            >
              {{ lang.receive }}
            </button>
          </li>
          <li>
            <button
              v-on:click="currentTab = 'Settings'"
              :class="['nav__btn nav__btn--settings', currentTab === 'Settings' && 'active']"
            >
              {{ lang.settings }}
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <OverView
      :style="currentTab == 'Overview' ? '' : 'display: none;'"
      :language="lang"
      :transactions="allTransactions"
    ></OverView>
    <Receive
      :style="currentTab == 'Receive' ? '' : 'display: none;'"
      :language="lang"></Receive>
    <Send
      :style="currentTab == 'Send' ? '' : 'display: none;'"
      :language="lang"
      :currency="fiatName"
      @show-amount-modal="showModal()"
      @show-transaction-confirm="showTransaction"
    ></Send>
    <Settings
      :style="currentTab == 'Settings' ? '' : 'display: none;'"
      :language="lang"
      @show-seed="showSeed()"
      @close="close()"
      @currency-changed="switchCurrency()"
      @language-changed="switchLanguage()"
    ></Settings>

    <div class="modal-wrapper" hidden>
      <div class="modal-overlay"></div>
      <div class="modal modal--send">
        <button v-on:click="hideSeed()" class="modal__close">
          <img src="../assets/images/close.svg" alt="close">
        </button>
        <img class="send-modal-icon" src="./../assets/images/send-focus.svg" alt="send">
        <PageTitle>{{ lang.you_just_send }}</PageTitle>
        <PageSubtitle>0.0102327 BTC  ($119,27 USD)  to <br> 3Pv7sJ96vEdudHqJTq12x1UupGaeuqZHFB. </PageSubtitle>
        <br>
        <PageSubtitle>
          {{ lang.view_transaction }}
          <button
            v-on:click="currentTab = 'Overview'"
            class="link"
          > {{ lang.overview }}</button>
        </PageSubtitle>
      </div>
    </div>

    <div class="modal-wrapper" :style="this.seedModal ? '' : 'display: none;'">
      <div class="modal-overlay"></div>
      <div class="modal">
        <button v-on:click="hideSeed()" class="modal__close">
          <img src="../assets/images/close.svg" alt="close">
        </button>
        <PageTitle>{{ lang.seed_modal }}</PageTitle>
        <PageSubtitle>{{ lang.create_subtitle_2 }}</PageSubtitle>
          
    <div class="ol_parent">
      <div class="ol_container">
        <OL class="list">
        <LI><span class="phrase">{{ this.seed.split(' ')[0] }}</span></LI>
        <LI><span class="phrase">{{ this.seed.split(' ')[1] }}</span></LI>
        <LI><span class="phrase">{{ this.seed.split(' ')[2] }}</span></LI>
        <LI><span class="phrase">{{ this.seed.split(' ')[3] }}</span></LI>
        </OL>
      </div>

      <div class="ol_container">
        <OL class="list" start="5">
        <LI><span class="phrase">{{ this.seed.split(' ')[4] }}</span></LI>
        <LI><span class="phrase">{{ this.seed.split(' ')[5] }}</span></LI>
        <LI><span class="phrase">{{ this.seed.split(' ')[6] }}</span></LI>
        <LI><span class="phrase">{{ this.seed.split(' ')[7] }}</span></LI>
        </OL>
      </div>

      <div class="ol_container">
        <OL class="list" start="9">
        <LI><span class="phrase">{{ this.seed.split(' ')[8] }}</span></LI>
        <LI><span class="phrase">{{ this.seed.split(' ')[9] }}</span></LI>
        <LI><span class="phrase">{{ this.seed.split(' ')[10] }}</span></LI>
        <LI><span class="phrase">{{ this.seed.split(' ')[11] }}</span></LI>
        </OL>
      </div>
      </div>
      </div>
    </div>
<!-- 
    <div id="transactionModal" :style="this.transactionModalShowing? '' : 'display: none;'">
      <div class="spectrum-Dialog spectrum-Dialog--small is-open spectrum-CSSExample-dialog">
        <div class="spectrum-Dialog-header">
          <h2 class="spectrum-Dialog-title">Transaction details</h2>
        </div>
        <div class="spectrum-Dialog-content" style="text-align: left;">
          <h3>{{ lang.amount }}</h3>
          <p>{{ this.btcAmount + ' (BTC) ' + this.fiatSymbol + btcToFiat(this.btcAmount) }}</p>
          <br />
          <h3>{{ lang.miner_fee }}</h3>
          <p>{{ this.fee + ' (BTC) ' + this.fiatSymbol + btcToFiat(this.fee) }}</p>
          <br />
          <h3>{{ lang.total }}</h3>
          <p>{{ this.total + ' (BTC) ' + this.fiatSymbol + btcToFiat(this.total)}}</p>
          <br />

          <h3>
            <b>{{ lang.confirmation }}</b>
          </h3>
          <p>
            {{ lang.sending}} {{ this.confirmationAmount + ' (BTC) ' + this.fiatSymbol + btcToFiat(this.confirmationAmount) }} {{ lang.to }}
            <b>{{ this.receivingAddress }}</b>
          </p>
          <br />
          <div id="modalButtons" style="text-align:center;">
            <button
              class="spectrum-Button spectrum-Button--primary"
              v-on:click="hideTransaction()"
              style="margin-left: 10px;"
            >
              <span class="spectrum-Button-label">{{ lang.back_button }}</span>
            </button>
            <button
              class="spectrum-Button spectrum-Button--cta"
              v-on:click="sendTransaction()"
              style="margin-left: 10px;"
            >
              <span v-if="!this.sending" class="spectrum-Button-label">{{ lang.im_sure }}</span>
              <img v-if="this.sending" src="../assets/tail-spin.svg" height="16" />
            </button>
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PageTitle from "@/components/Text/PageTitle.vue";
import PageSubtitle from "@/components/Text/PageSubtitle.vue";
import OL from "@/components/List/OL.vue";
import LI from "@/components/List/LI.vue";
import OverView from "@/components/Overview.vue";
import Receive from "@/components/Receive.vue";
import Send from "@/components/Send.vue";
import Settings from "@/components/Settings.vue";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import BigNumber from "bignumber.js";

/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component({ components: { OverView, Receive, Send, Settings, PageTitle, PageSubtitle, OL, LI } })
export default class WalletHomeView extends Vue {
  private currentTab = "Overview";

  // Seed modal
  private seedModal = false;

  // Transaction modal
  private transactionModalShowing = false;

  // Our refresh handler
  private timer = setInterval(this.refresh, 600000);

  // Transactions with >=6 confirmations
  private transactions = WalletHandlerModule.transactions;

  // Unconfirmed transactions
  private unconfirmedTransactions = WalletHandlerModule.unconfirmedTransactions;
  
  private balance = WalletHandlerModule.balance;
  private refreshing = false;

  // Wallet stuff
  private seed = "";

  private fiatName = WalletHandlerModule.settings.currency;


  private sending = false;

  @Prop() language!: Language;

   get allTransactions() {
        return this.unconfirmedTransactions.concat(this.transactions);
    }

  // Transaction details
  private hash = "";
  private amount = "";
  private fee = "";
  private total = "";
  private confirmationAmount = "";
  private hex = "";

  private lang = WalletHandlerModule.currentLanguage;
  private walletModule = WalletHandlerModule

  async mounted() {
    
    // Set the language
    this.lang = this.language;

    this.seed = WalletHandlerModule.wallet.seed;

  }

  showSeed() {
    this.seedModal = true;
  }

  hideSeed() {
    this.seedModal = false;
  }


  // Displays the transaction confirmation modal with all the detaisl
  async showTransaction(details: any[]) {
    let transaction: any = details[0];
    let sendingMax: boolean = details[2];
    this.transactionModalShowing = true;
    this.fee = new BigNumber(transaction.getFee())
      .dividedBy(100000000)
      .toString();
    // this.amount = this.btcAmount;
    // this.receivingAddress = details[1];

    // If we're sending max, take away the fee from the total, otherwise, add the fee to the amount
    this.total = sendingMax
      ? new BigNumber(this.amount).minus(this.fee).toString()
      : new BigNumber(this.amount).plus(this.fee).toString();

    // The amount the recipient of the transaction gets, maybe better way to display this?
    this.confirmationAmount = sendingMax
      ? new BigNumber(this.amount).minus(this.fee).toString()
      : this.amount;

    // The hex of the transaction, used for broadcast later
    this.hex = transaction.extractTransaction().toHex();
  }

  // Changes the displayed fiat currency
  async switchCurrency() {
    let settings = WalletHandlerModule.settings;
    this.fiatName = settings.currency;
  }

  switchLanguage() {
    this.lang = WalletHandlerModule.currentLanguage;
  }

  // Hide the transaction modal
  hideTransaction() {
    this.transactionModalShowing = false;
  }

  // Broadcasts the transaction to the Bitcoin network
  async sendTransaction() {
    // Set this so the loading indicator displays
    this.sending = true;

    // Broadcast the transaction
    await WalletHandlerModule.broadcastTransaction(this.hex);

    // Take away the total being spent by this transaction from our balance
    this.balance = this.balance.minus(new BigNumber(this.total));

    // Displays the new transaction on our table
    this.unconfirmedTransactions.push({
      blockHeight: 0,
      amount: new BigNumber(this.total),
      unconfirmed: true,
    });

    // We're done sending
    this.sending = false;

    // Get rid of the modal now
    this.hideTransaction();
  }


  btcToFiat(btc: string): string {
    let fiat = (parseFloat(btc) * WalletHandlerModule.fiatRate).toFixed(2);

    if (isNaN(parseFloat(fiat))) {
      fiat = "0";
    }

    return new Intl.NumberFormat(this.walletModule.settings.languageCode, { style: 'currency', currency: this.walletModule.settings.currency }).format(parseFloat(fiat));
  }

  close() {
    this.$emit("close-wallet");
  }

  async refresh() {
    if (this.refreshing || this.sending || this.transactionModalShowing) {
      return;
    }

    this.refreshing = true;

    try {
      // Sync the wallet
      await WalletHandlerModule.syncWallet(true);
      this.transactions = WalletHandlerModule.transactions;
      this.unconfirmedTransactions = WalletHandlerModule.unconfirmedTransactions;
      this.refreshing = false;
    } catch {
      this.refreshing = false;
    }

  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  flex-grow: 1;
  max-width: 180px;
  width: 100%;
  background: #090C14;
  border-right: 1px solid #2f3442;
}
.balance {
  padding: 24px 10px 8px;
  margin-bottom: 40px;
}
.balance__title {
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  text-transform: uppercase;
  color: #7E858F;
}
.balance__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.balance__amount + .balance__amount {
  margin-top: 2px;
}
.balance__amount {
  display: flex;
  align-items: center;
  font-size: 11px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: #7E858F;
}
.balance__amount-large {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #FFFFFF;
}
.balance__currency-abbr {
  margin-left: 4px;
  font-size: 11px;
  line-height: 18px;
  color: #555B65;
}
.refresh-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
}
.refresh-button:focus {
  outline: none;
}
.refresh-button.spin {
  animation:spin 1s linear infinite;
  background: none;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.nav__list {
  padding: 0;
  list-style: none;
}
.nav__btn {
  position: relative;
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 16px 13px 16px 48px;
  font-weight: 600;
  font-size: 17px;
  line-height: 24px;
  color: #7E858F;
  border: none;
  border-left: 3px solid transparent;
  background: none;
  outline: none;
}
.nav__btn.active {
  color: #FFFFFF;
  background: #13161F;
  border-left: 3px solid #F7931A;
}
.nav__btn:hover,
.nav__btn:focus {
  color: #F7931A;
  outline: none;
}
.nav__btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
}
.nav__btn.active {
  color: #FFFFFF;
  background: #13161F;
  border-left: 3px solid #F7931A;
}
.nav__btn--overview::before {
  background: url('../assets/images/collection.svg') center no-repeat;
}
.nav__btn--overview:hover::before,
.nav__btn--overview:focus::before {
  background: url('../assets/images/collection-focus.svg') center no-repeat;
}
.nav__btn--overview.active::before {
  background: url('../assets/images/collection-active.svg') center no-repeat;
}
.nav__btn--send::before {
  background: url('../assets/images/send.svg') center no-repeat;
}
.nav__btn--send:hover::before,
.nav__btn--send:focus::before {
  background: url('../assets/images/send-focus.svg') center no-repeat;
}
.nav__btn--send.active::before {
  background: url('../assets/images/send-active.svg') center no-repeat;
}
.nav__btn--receive::before {
  background: url('../assets/images/received.svg') center no-repeat;
}
.nav__btn--receive:hover::before,
.nav__btn--receive:focus::before {
  background: url('../assets/images/received-focus.svg') center no-repeat;
}
.nav__btn--receive.active::before {
  background: url('../assets/images/received-active.svg') center no-repeat;
}
.nav__btn--settings::before {
  background: url('../assets/images/gear.svg') center no-repeat;
}
.nav__btn--settings:hover::before,
.nav__btn--settings:focus::before {
  background: url('../assets/images/gear-focus.svg') center no-repeat;
}
.nav__btn--settings.active::before {
  background: url('../assets/images/gear-active.svg') center no-repeat;
}
#topbar {
  background-color: #090c14;
  color: #ffffff;
  padding: 5px;
}
.modal-overlay {
  background: #03050B;
  opacity: 0.8;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #03050B;
  opacity: 0.8;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 716px;
  width: 100%;
  padding: 40px 32px;
  transform: translate(-50%, -50%);
  background: linear-gradient(360deg, #090C14 0%, #13161F 100%);
  border: 1px solid #1F232E;
  z-index: 10;
}
.modal__close {
  position: absolute;
  top: 8px;
  right: 10px;  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
}
.modal__close:hover,
.modal__close:focus {
  background: #434854;
  outline: none;
  border-radius: 2px;
}
.modal ol.list {
  max-width: 609px;
  margin-top: 48px;
}
#transactionModal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.link {
  font-size: 16px;
  line-height: 22px;
  border: none;
  background: none;
  text-decoration: underline;
  color: #fff;
}
.modal--send {
  width: 568px;
  padding: 44px 32px 65px;
}
.send-modal-icon {
  width: 24px;
  height: 24px;
  margin: 0 auto;
  display: block;
}
</style>
