<template>
  <div id="overview">
    <div
      id="empty-state"
      v-if="transactions.length == 0"
      style="width: 300px; margin: 0 auto; margin-top: 100px; color: grey;"
    >
      <div class="spectrum-IllustratedMessage spectrum-IllustratedMessage--cta">
        <img src="../assets/empty.svg" style="width: 100px;height: 100px;margin-bottom: 20px;" />
        <p
          class="spectrum-Body--secondary spectrum-IllustratedMessage-description"
        >{{ language.no_transactions }}</p>
      </div>
    </div>

    <div id="transactionsList" v-if="transactions.length > 0">
      <table
        class="spectrum-Table"
        style="margin: 0 auto;margin-top: 20px;border: 1px solid #d6d2d2;border-radius: 5px;border-bottom: none; width: 500px;"
      >
        <thead class="spectrum-Table-head">
          <tr>
            <th
              class="spectrum-Table-headCell is-sortable is-sorted-desc"
              aria-sort="descending"
              tabindex="0"
            >{{ language.block_height }}</th>
            <th class="spectrum-Table-headCell is-sortable" aria-sort="none">{{ language.amount }}</th>
            <th class="spectrum-Table-headCell">{{ language.status }}</th>
          </tr>
        </thead>
        <tbody class="spectrum-Table-body">
          <tr
            class="spectrum-Table-row"
            v-for="(tx, index) in displayedTransactions"
            :key="'conf' + index"
          >
            <td
              class="spectrum-Table-cell"
              tabindex="0"
            >{{ tx.blockHeight == 0 ? '?' : tx.blockHeight }}</td>
            <td class="spectrum-Table-cell" tabindex="0">
              <div :style="zero.gt(tx.amount) ? 'color: red;' : 'color: green;'">
                <span>{{ !zero.gt(tx.amount) ? '+' : '' }}</span>
                {{ tx.amount }}
              </div>
            </td>
            <td class="spectrum-Table-cell" tabindex="0">
              <div
                :class="'spectrum-StatusLight spectrum-StatusLight--' + getStatusLight(tx)"
              >{{ getText(tx) }}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="justify-content: center; margin-top:10px;">
        <button
          class="spectrum-Button spectrum-Button--primary spectrum-Button--quiet"
          v-on:click="previousPage()"
          :disabled="this.currentPage == 1"
        >
          <span class="spectrum-Button-label">{{ language.back_button }}</span>
        </button>
        <button
          class="spectrum-Button spectrum-Button--primary spectrum-Button--quiet"
          v-on:click="nextPage()"
          :disabled="this.currentPage == this.totalPages"
        >
          <span class="spectrum-Button-label">{{ language.next_button }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import BigNumber from "bignumber.js";

/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component
export default class Receive extends Vue {
  @Prop() transactions!: [{}];
  @Prop() language!: Language;
  private zero = new BigNumber(0);
  private totalPages = 0;
  private currentPage = 1;
  private itemsPerPage = 5;
  private displayedTransactions: any[] = new Array();

  mounted() {
    this.totalPages = Math.ceil(this.transactions.length / this.itemsPerPage);
    let newDisplayed: any[] = new Array();

    for (
      var i = (this.currentPage - 1) * this.itemsPerPage;
      i < (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage;
      i++
    ) {
      if (i < this.transactions.length) {
        newDisplayed.push(this.transactions[i]);
      }
    }

    this.displayedTransactions = newDisplayed;
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
    this.replaceDisplayedTransactions();
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.replaceDisplayedTransactions();
  }

  replaceDisplayedTransactions() {
    let newDisplayed: any[] = new Array();
    for (
      var i = (this.currentPage - 1) * this.itemsPerPage;
      i < (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage;
      i++
    ) {
      if (i < this.transactions.length) {
        newDisplayed.push(this.transactions[i]);
      }
    }
    this.displayedTransactions = newDisplayed;
  }

  getStatusLight(tx: any) {
    if (tx.unconfirmed) {
      if (tx.blockHeight > 0) {
        return "yellow";
      } else {
        return "fuchsia";
      }
    } else {
      return "celery";
    }
  }

  getText(tx: any) {
    if (tx.unconfirmed) {
      if (tx.blockHeight > 0) {
        return this.language.processing;
      } else {
        return this.language.unconfirmed;
      }
    } else {
      return this.language.complete;
    }
  }
}
</script>

<style scoped>
#overview .spectrum-Table-cell {
  padding: 10px;
}
</style>