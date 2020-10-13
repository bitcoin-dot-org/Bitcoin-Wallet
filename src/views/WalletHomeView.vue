<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="balance">
        <div class="balance__row">
          <p class="balance__title">{{ lang.total_balance }}:</p>
          <button
            v-on:click="refresh()"
            v-if="!refreshing"
            class="refresh-button"
          >
            <img src="../assets/images/refresh.svg" alt="refresh">
          </button>
          <img v-if="refreshing" src="../assets/tail-spin.svg" height="16" />
        </div>
        <p class="balance__amount">
          <span class="balance__amount-large">109.82124293</span>
          <span class="balance__currency-abbr">mBTC</span>
        </p>
        <p class="balance__amount">
          $ 18.479,79
          <!-- {{ this.fiatSymbol + btcToFiat(balance.toString()) }} -->
          <span class="balance__currency-abbr">USD</span>
        </p>
      </div>
      <nav class="nav">
        <ul class="nav__list">
          <li>
            <button
              v-on:click="currentTab = 'Overview'"
              :class="['nav__btn', currentTab === 'Overview' && 'active']"
            >
              <img class="nav__icon nav__icon--inactive" src="../assets/images/collection.svg">
              <img class="nav__icon nav__icon--active" src="../assets/images/collection-active.svg" hidden>
              {{ lang.overview }}
            </button>
          </li>
          <li>
            <button
              v-on:click="currentTab = 'Send'"
              :class="['nav__btn', currentTab === 'Send' && 'active']"
            >
              <img class="nav__icon nav__icon--inactive" src="../assets/images/send.svg">
              <img class="nav__icon nav__icon--active" src="../assets/images/send-active.svg" hidden>
              {{ lang.send }}
            </button>
          </li>
          <li>
            <button
              v-on:click="currentTab = 'Receive'"
              :class="['nav__btn', currentTab === 'Receive' && 'active']"
            >
              <img class="nav__icon nav__icon--inactive" src="../assets/images/received.svg">
              <img class="nav__icon nav__icon--active" src="../assets/images/received-active.svg" hidden>
              {{ lang.receive }}
            </button>
          </li>
          <li>
            <button
              v-on:click="currentTab = 'Settings'"
              :class="['nav__btn', currentTab === 'Settings' && 'active']"
            >
              <img class="nav__icon nav__icon--inactive" src="../assets/images/gear.svg">
              <img class="nav__icon nav__icon--active" src="../assets/images/gear-active.svg" hidden>
              {{ lang.settings }}
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <OverView
      v-if="currentTab == 'Overview'"
      :language="lang"
      :transactions="allTransactions"
    ></OverView>
    <Receive v-if="currentTab == 'Receive'" :language="lang"></Receive>
    <Send
      v-if="currentTab == 'Send'"
      :language="lang"
      @show-amount-modal="showModal()"
      @show-transaction-confirm="showTransaction"
      :amount="btcAmount"
    ></Send>
    <Settings
      v-if="currentTab == 'Settings'"
      :language="lang"
      @show-seed="showSeed()"
      @close="close()"
      @currency-changed="switchCurrency()"
      @language-changed="switchLanguage()"
    ></Settings>

    <div class="modal-wrapper" :style="this.seedModal ? '' : 'display: none;'">
      <div class="modal-overlay"></div>
      <div class="modal">
        <button v-on:click="hideSeed()" class="modal__close">
          <img src="../assets/images/close.svg" alt="close">
        </button>
        <PageTitle>{{ lang.seed_modal }}</PageTitle>
        <PageSubtitle>{{ lang.create_subtitle_2 }}</PageSubtitle>
        <OL class="list">
          <LI v-for="(seedItem, index) in this.seed.split(' ')" :key="index">
            <span class="phrase">{{ seedItem }}</span>
          </LI>
        </OL>
      </div>
    </div>

    <div id="amountModal" :style="this.modalShowing? '' : 'display: none;'">
      <div class="spectrum-Dialog spectrum-Dialog--small is-open spectrum-CSSExample-dialog">
        <div class="spectrum-Dialog-header">
          <h2 class="spectrum-Dialog-title">{{ lang.amount_to_send }}</h2>
        </div>
        <div class="spectrum-Dialog-content">
          <h3>{{ fiatName }}</h3>
          <div
            class="spectrum-Textfield spectrum-Textfield--quiet"
            style="width: 120px; margin-bottom: 20px;"
          >
            <span style="margin-top: 5px;">{{ this.fiatSymbol }}</span>
            <input
              type="text"
              placeholder="0"
              v-on:keyup="fiatToBTC()"
              v-model="fiatAmount"
              class="spectrum-Textfield-input"
            />
          </div>
          <br />
          <h3>BTC</h3>
          <div class="spectrum-Textfield spectrum-Textfield--quiet" style="width: 120px;">
            <input
              type="text"
              placeholder="0"
              name="text"
              v-on:keyup="convertBtcToFiat()"
              v-model="btcAmount"
              class="spectrum-Textfield-input"
            />
          </div>

          <p class="notenoughbalance" v-if="notEnoughBalance">{{ lang.not_enough_balance }}</p>

          <div id="modalButtons">
            <button
              class="spectrum-Button spectrum-Button--primary spectrum-Button"
              v-on:click="sendMax()"
            >
              <span class="spectrum-Button-label">{{ lang.send_max }}</span>
            </button>

            <button
              class="spectrum-Button spectrum-Button--cta"
              v-on:click="hideModal()"
              :disabled="notEnoughBalance"
              style="margin-left: 10px;"
            >
              <span class="spectrum-Button-label">{{ lang.ok_button }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="amountModal" :style="this.transactionModalShowing? '' : 'display: none;'">
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
    </div>

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

  // Amount modal
  private modalShowing = false;

  // Transaction modal
  private transactionModalShowing = false;

  // Our refresh handler
  private timer = setInterval(this.refresh, 600000);

  // Transactions with >=6 confirmations
  private transactions = WalletHandlerModule.transactions;

  // Unconfirmed transactions
  private unconfirmedTransactions = WalletHandlerModule.unconfirmedTransactions;

  private allTransactions = this.unconfirmedTransactions.concat(
    this.transactions
  );
  private balance = WalletHandlerModule.balance;
  private refreshing = false;

  // Wallet stuff
  private seed = "";

  // Fiat / currency stuff
  private rates: any;
  private btcAmount = "0";
  private fiatName = "";
  private fiatSymbol = "";
  private fiatAmount = "0";
  private fiatRate = 0;

  private receivingAddress = "";
  private notEnoughBalance = false;
  private sending = false;

  @Prop() language!: Language;

  // Transaction details
  private hash = "";
  private amount = "";
  private fee = "";
  private total = "";
  private confirmationAmount = "";
  private hex = "";

  private lang = WalletHandlerModule.currentLanguage;

  async mounted() {
    // Let's first get fiat currency rates
    let request = await this.$http.get("https://www.blockchain.com/ticker");

    // Set the language
    this.lang = this.language;

    this.seed = WalletHandlerModule.wallet.seed;

    if (request.status == 200) {
      // The value of the fiat relative to BTC
      this.fiatRate = request.data[WalletHandlerModule.settings.currency].last;
      this.fiatSymbol =
        request.data[WalletHandlerModule.settings.currency].symbol;

      // Some currencies don't have symbols so fix the formatting:
      if (this.fiatSymbol.length > 1) {
        this.fiatSymbol = this.fiatSymbol + " ";
      }

      // Name of the currency
      this.fiatName = WalletHandlerModule.settings.currency;

      // Keep the rates because we want to have it ready when we switch currencies
      this.rates = request.data;
    }
  }

  showSeed() {
    this.seedModal = true;
  }

  hideSeed() {
    this.seedModal = false;
  }

  // Displays the amount/BTC picker modal
  async showModal() {
    this.fiatAmount = "0";
    this.btcAmount = "0";
    this.modalShowing = true;
  }

  // Displays the transaction confirmation modal with all the detaisl
  async showTransaction(details: any[]) {
    let transaction: any = details[0];
    let sendingMax: boolean = details[2];
    this.transactionModalShowing = true;
    this.fee = new BigNumber(transaction.getFee())
      .dividedBy(100000000)
      .toString();
    this.amount = this.btcAmount;
    this.receivingAddress = details[1];

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
    this.fiatRate = this.rates[settings.currency].last;
    this.fiatSymbol = this.rates[settings.currency].symbol;

    if (this.fiatSymbol.length > 1) {
      this.fiatSymbol = this.fiatSymbol + " ";
    }

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

    // Now let's change the displayed transactions
    this.allTransactions = this.unconfirmedTransactions.concat(
      this.transactions
    );

    // We're done sending
    this.sending = false;

    // Get rid of the modal now
    this.hideTransaction();
  }

  // Hides the amount/BTC picker modal
  hideModal() {
    this.modalShowing = false;
  }

  sendMax() {
    this.btcAmount = WalletHandlerModule.balance.toString();
    this.convertBtcToFiat();
  }

  convertBtcToFiat() {
    this.fiatAmount = this.btcToFiat(this.btcAmount);

    // Are we trying to send too much?
    if (new BigNumber(this.btcAmount).gt(WalletHandlerModule.balance)) {
      this.notEnoughBalance = true;
    } else {
      this.notEnoughBalance = false;
    }
  }

  btcToFiat(btc: string): string {
    let fiat = (parseFloat(btc) * this.fiatRate).toFixed(2);

    if (isNaN(parseFloat(fiat))) {
      fiat = "0";
    }

    if (new BigNumber(this.btcAmount).gt(WalletHandlerModule.balance)) {
      this.notEnoughBalance = true;
    } else {
      this.notEnoughBalance = false;
    }

    // NOTE: This formats the currency to the user's locale, so may use commas as decimals, need to fix up later
    return new Intl.NumberFormat(navigator.language).format(parseFloat(fiat));
  }

  fiatToBTC() {
    // We need to fix all the formatting
    let fiat = this.fiatAmount;

    // Determine the format
    let format = new Intl.NumberFormat(navigator.language).format(1.5);

    // Are we in commas as decimal land?
    let commasAsDecimal = format == "1,5";

    // Let's adjust our format
    if (commasAsDecimal) {
      fiat = fiat.replace(".", "");
      fiat = fiat.replace(",", ".");
    }

    // Now work with the fixed format
    this.btcAmount = (
      parseFloat(fiat.replace(/,/g, "")) / this.fiatRate
    ).toFixed(8);

    if (isNaN(parseFloat(this.btcAmount))) {
      this.btcAmount = "0";
    }

    if (new BigNumber(this.btcAmount).gt(WalletHandlerModule.balance)) {
      this.notEnoughBalance = true;
    } else {
      this.notEnoughBalance = false;
    }
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
      this.allTransactions = this.unconfirmedTransactions.concat(
        this.transactions
      );
      this.refreshing = false;
    } catch {
      this.refreshing = false;
    }

    // Get the current fiat rate
    let request = await this.$http.get("https://www.blockchain.com/ticker");
    if (request.status == 200) {
      this.fiatRate = request.data[WalletHandlerModule.settings.currency].last;
    }
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style>
.dashboard {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  flex-grow: 1;
  max-width: 180px;
  width: 100%;
  background: #090C14;
  border-right: 1px solid #1F232E;
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
  padding: 0;
  border: none;
  background: none;
}
.nav__list {
  padding: 0;
  list-style: none;
}
.nav__btn {
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 16px 13px;
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
.nav__icon {
  margin-right: 16px;
}
.nav__btn.active .nav__icon--inactive {
  display: none;
}
.nav__btn.active .nav__icon--active {
  display: block;
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
.modal ol.list {
  max-width: 609px;
  margin-top: 48px;
}
#amountModal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
