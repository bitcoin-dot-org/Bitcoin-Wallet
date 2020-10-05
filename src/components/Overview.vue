<template>
  <div id="overview">
    <DashboardTitle>{{ language.overview }}</DashboardTitle>
    <div class="overview__header-row">
      <p class="transactions-amount">12 transactions</p>
      <div class="pagination">
        <button
          class="pagination__button pagination__prev"
          v-on:click="previousPage()"
          :disabled="this.currentPage == 1"
        ></button>
        <p class="pagination__text">Page 1 of 3</p>
        <button
          class="pagination__button pagination__next"
          v-on:click="nextPage()"
          :disabled="this.currentPage == this.totalPages"
        ></button>
      </div>
    </div>
    <OverviewTable></OverviewTable>
    <OverviewEmpty v-if="transactions.length !== 0"></OverviewEmpty>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import BigNumber from "bignumber.js";
import DashboardTitle from "@/components/Text/DashboardTitle.vue";
import OverviewEmpty from "@/components/OverviewEmpty.vue";
import OverviewTable from "@/components/OverviewTable.vue";

/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component({ components: { OverviewEmpty, DashboardTitle, OverviewTable }})
export default class Overview extends Vue {
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
  .overview__header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .transactions-amount {
    font-size: 14px;
    line-height: 20px;
    color: #ACB2BB;
  }
  .pagination {
    display: flex;
    align-items: center;
  }
  .pagination__text {
    margin: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #ACB2BB;
  }
  .pagination__button {
    border: none;
    width: 24px;
    height: 24px;
  }
  .pagination__prev {
    background: url('../assets/images/angle-right.svg') center no-repeat;
    transform: rotate(180deg);
  }
  .pagination__next {
    background: url('../assets/images/angle-right.svg') center no-repeat;
  }
  .pagination__prev:disabled {
    opacity: 0.2;
  }
</style>
