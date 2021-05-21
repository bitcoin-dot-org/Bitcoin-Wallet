<template>
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th>
          <button class="sort-button">{{ language.status }}</button>
        </th>
        <th>
          <button class="sort-button">{{ language.date }}</button>
        </th>
        <th>
          <button class="sort-button">{{ language.amount }}</button>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="tx in transactions" :key="tx.hash">
          <td>
            <img v-if="!zero.gt(tx.amount)" src="../assets/images/receive.svg" alt="Receive">
            <img v-if="zero.gt(tx.amount)" src="../assets/images/send.svg" alt="Send">
          </td>
          <td><p :class="'status status--' + getText(tx, false).toLowerCase()">{{ getText(tx) }}</p></td>
          <td>
            {{ dateHandler(tx.time).format('MMM. D, YYYY') }}
            <p class="transaction-time">{{ dateHandler(tx.time).format('h:mm A') }}</p>
          </td>
          <td>
            <p :class="'amount-' + (zero.gt(tx.amount) ? 'expense' : 'income') ">{{ tx.amount }} <span class="amount-currency">BTC</span></p>
            <p class="amount">{{ new Intl.NumberFormat(module.settings.language, { style: 'currency', currency: module.settings.currency }).format(parseFloat(zero.plus(tx.amount).multipliedBy(module.fiatRate).toFixed(2))) }} <span class="amount-currency">{{ module.settings.currency }}</span></p>
          </td>
          <td>
            <a v-on:click="openTransactionView('https://www.blockchain.com/btc/tx/' + tx.hash)" class="external-link">
            <img src="../assets/images/external-link.svg"/>
            </a>
        </td>
      </tr>

    </tbody>
  </table>
</template>

<script lang="ts">

declare global {
    interface Window {
        ipcRenderer:any;
    }
}


import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import BigNumber from "bignumber.js";
import moment from 'moment'
import 'moment/locale/es';
import 'moment/locale/ca';
import 'moment/locale/fr';
import 'moment/locale/ja';
import 'moment/locale/pt-br';
import 'moment/locale/zh-cn';

/* eslint-disable no-unused-vars */
import Language from "@/lang/langInterface";
import { Transaction } from '@/wallet/wallet.ts'
/* eslint-enable no-unused-vars */

@Component
export default class OverviewTable extends Vue {

@Prop() language!: Language;
@Prop() transactions! : Transaction[];
private module = WalletHandlerModule
private zero = new BigNumber(0);
private dateHandler = moment

  getText(tx: any, translate = true) {
    if (!tx.confirmed) {
      if (tx.height > 0) {
        return  translate ? this.language.processing : 'pending';
      } else {
        return translate ? this.language.unconfirmed : 'unconfirmed' ;
      }
    } else {
      return translate ? this.language.complete : 'complete';
    }
  }

  created() {
    this.setMomentLocale()
  }

  openTransactionView(link : string) {
    window.ipcRenderer.send('openLink', link)
  }

  @Watch('language')
  setMomentLocale() {
    if(this.module.settings.language != "en") {
      moment.locale(this.module.settings.language)
    }
    else {
      moment.locale('en-GB')
    }
  }

}

</script>

<style scoped>
  .table {
    width: 100%;
    border-collapse: separate; 
    border-spacing: 0 2px;
  }
  .sort-button {
    position: relative;
    padding: 0;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    text-transform: uppercase;
    color: #7E858F;
    border: none;
    background: none;
  }
  .sort-button:hover,
  .sort-button:focus {
    color: #fff;
    outline: none;
  }
  .sort-button--ascending,
  .sort-button--descending {
    padding-right: 20px;
  }
  .sort-button--ascending::after,
  .sort-button--descending::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 8px;
    height: 8px;
    transform: translateY(-50%);
    background: url('../assets/images/caret-up.svg') center no-repeat;
  }
  .sort-button--descending::after {
    transform: translateY(-50%) rotate(180deg);
  }
  .table th {
    text-align: left;
    padding-left: 16px;
    padding-right: 20px;
  }
  .table th:nth-child(4) {
    text-align: right;
  }
  .table td {
    padding: 10px 20px 11px 16px;
    font-size: 14px;
    line-height: 20px;
    color: #DCE0E7;
    vertical-align: middle;
    background: #090C14;
    border: none;
  }
  .table tbody tr:first-child td:first-child {
    border-top-left-radius: 3px;
  }
  .table tbody tr:last-child td:first-child {
    border-bottom-left-radius: 3px;
  }
  .table tbody tr:first-child td:last-child {
    border-top-right-radius: 3px;
  }
  .table tbody tr:last-child td:last-child {
    border-bottom-right-radius: 3px;
  }
  .status {
    position: relative;
    padding-left: 16px;
  }
  .status::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .status--pending::before {
    background: #F7931A;
  }
  .status--unconfirmed::before {
    background: #B34444;
  }
  .status--complete::before {
    background: #528C5B;
  }
  .transaction-time {
    font-size: 11px;
    line-height: 18px;
    color: #7E858F;
  }
  .amount-expense {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #B24444;
  }
  .amount-income {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #528C5B;
  }
  .amount {
    font-size: 11px;
    line-height: 18px;
    text-align: right;
    color: #ACB2BB;
  }
  .amount-currency {
    font-weight: normal;
    font-size: 11px;
    line-height: 18px;
    color: #7E858F;
  }
  .external-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin-left: auto;
    border-radius: 2px;
  }
  .external-link:focus,
  .external-link:hover {
    background: #434854;
    outline: none;
  }
  .external-link:active {
    background: transparent;
  }
</style>
