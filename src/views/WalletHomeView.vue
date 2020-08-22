<template>
  <div>
    <div id="topbar">
      <div id="contain">
        <div id="balance">
          <a href="#" v-on:click="refresh()" style="font-size: 12px;margin-bottom: -10px;">
            {{ lang.refresh }}
            <img v-if="refreshing" src="../assets/tail-spin.svg" height="16" />
          </a>
          <br />
          <span>{{ this.fiatSymbol + btcToFiat(balance.toString()) }}</span>
        </div>
      </div>
    </div>
    <div class="spectrum-Tabs spectrum-Tabs--horizontal spectrum-Tabs--quiet">
      <div
        class="spectrum-Tabs-item"
        v-on:click="currentTab = 'Overview'"
        style="padding: 10px;"
        tabindex="0"
      >
        <span class="spectrum-Tabs-itemLabel">{{ lang.overview }}</span>
      </div>
      <div
        class="spectrum-Tabs-item"
        style="padding: 10px;"
        v-on:click="currentTab = 'Send'"
        tabindex="0"
      >
        <span class="spectrum-Tabs-itemLabel">{{ lang.send }}</span>
      </div>
      <div
        class="spectrum-Tabs-item"
        v-on:click="currentTab = 'Receive'"
        style="padding: 10px;"
        tabindex="0"
      >
        <span class="spectrum-Tabs-itemLabel">{{ lang.receive }}</span>
      </div>
      <div
        class="spectrum-Tabs-item"
        v-on:click="currentTab = 'Settings'"
        style="padding: 10px;"
        tabindex="0"
      >
        <span class="spectrum-Tabs-itemLabel">{{ lang.settings }}</span>
      </div>
    </div>

    <div id="amountModal" :style="this.seedModal ? '' : 'display: none;'">
      <div class="spectrum-Dialog spectrum-Dialog--small is-open spectrum-CSSExample-dialog">
        <div class="spectrum-Dialog-header">
          <h2 class="spectrum-Dialog-title">{{ lang.seed_modal }}</h2>
        </div>
        <div class="spectrum-Dialog-content">
          <p>{{ this.seed }}</p>

          <div id="modalButtons">
            <button class="spectrum-Button spectrum-Button--cta" v-on:click="hideSeed()">
              <span class="spectrum-Button-label">{{ lang.ok_button }}</span>
            </button>
          </div>
        </div>
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

    <OverView
      :style="currentTab == 'Overview' ? '' : 'display: none;'"
      :language="lang"
      :transactions="allTransactions"
    ></OverView>
    <Receive :style="currentTab == 'Receive' ? '' : 'display: none;'" :language="lang"></Receive>
    <Send
      :style="currentTab == 'Send' ? '' : 'display: none;'"
      :language="lang"
      @show-amount-modal="showModal()"
      @show-transaction-confirm="showTransaction"
      :amount="btcAmount"
    ></Send>
    <Settings
      :style="currentTab == 'Settings' ? '' : 'display: none;'"
      :language="lang"
      @show-seed="showSeed()"
      @close="close()"
      @currency-changed="switchCurrency()"
      @language-changed="switchLanguage()"
    ></Settings>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import OverView from "@/components/Overview.vue";
import Receive from "@/components/Receive.vue";
import Send from "@/components/Send.vue";
import Settings from "@/components/Settings.vue";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import BigNumber from "bignumber.js";

/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component({ components: { OverView, Receive, Send, Settings } })
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
#topbar {
  background-color: #090c14;
  color: #ffffff;
  padding: 5px;
}

#contain {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#balance {
  font-size: 30px;
  text-align: center;
  flex: 1;
}

.coin {
  position: relative;
  bottom: 15px;
  font-size: 13px;
}

#exit {
  padding: 20px;
  background-color: #ff9500;
  cursor: pointer;
}

#tabControl {
  margin: 20px;
}

#white-container {
  background: white;
  padding: 30px;
  margin: 20px;
  border-radius: 5px;
  width: 600px;
  border: 1px solid #cccccc;
  margin-left: auto;
  margin-right: auto;
}

#amountModal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}

#modalButtons {
  margin-top: 30px;
}

.notenoughbalance {
  font-size: 12px;
  margin: 5px;
  text-align: center;
  color: red;
}
</style>