<template>
  <DashboardContent>
    <div id="overview">
      <DashboardTitle>{{ language.overview }}</DashboardTitle>
      <div class="overview__header-row">
        <p class="transactions-amount">{{ this.transactions.length }} transactions</p>
        <div class="pagination">
          <button
            class="pagination__button pagination__prev"
            v-on:click="previousPage()"
            :disabled="this.currentPage == 1"
          ></button>
          <p class="pagination__text">Page {{ this.currentPage }} of {{ this.totalPages > 0 ? this.totalPages : '1' }}</p>
          <button
            class="pagination__button pagination__next"
            v-on:click="nextPage()"
            :disabled="this.currentPage == this.totalPages || this.totalPages == 0"
          ></button>
        </div>
      </div>
      <OverviewTable v-if="transactions.length > 0" :transactions="displayedTransactions"></OverviewTable>
      <OverviewEmpty v-if="transactions.length == 0"></OverviewEmpty>
    </div>
  </DashboardContent>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import BigNumber from "bignumber.js";
import DashboardTitle from "@/components/Text/DashboardTitle.vue";
import OverviewEmpty from "@/components/OverviewEmpty.vue";
import OverviewTable from "@/components/OverviewTable.vue";
import DashboardContent from "@/components/Layout/DashboardContent.vue";

/* eslint-disable no-unused-vars */

import Language from "@/lang/langInterface";

/* eslint-enable no-unused-vars */

@Component({ components: { OverviewEmpty, DashboardTitle, OverviewTable, DashboardContent }})
export default class Overview extends Vue {
  @Prop() transactions!: [{}];
  @Prop() language!: Language;
  private zero = new BigNumber(0);
  private totalPages = 0;
  private currentPage = 1;
  private itemsPerPage = 5;

  mounted() {
    this.totalPages = Math.ceil(this.transactions.length / this.itemsPerPage);
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
  }


  get displayedTransactions() {

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

    return newDisplayed
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
    width: 32px;
    height: 32px;
  }
  .pagination__button:focus,
  .pagination__button:hover {
    background-color: #434854;
    border-radius: 2px;
    outline: none;
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
    .pagination__next:disabled {
    opacity: 0.2;
  }
</style>
