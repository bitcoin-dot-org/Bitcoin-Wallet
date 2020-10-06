<template>
  <aside class="sidebar">
    <div class="balance">
      <div class="balance__row">
        <p class="balance__title">{{ lang.total_balance }}:</p>
        <button class="refresh-button">
          <img src="./../assets/images/refresh.svg" alt="refresh">
        </button>
      </div>
      <p class="balance__amount">
        <span class="balance__amount-large">109.82124293</span>
        <span class="balance__currency-abbr">mBTC</span>
      </p>
      <p class="balance__amount">
        $ 18.479,79
        <span class="balance__currency-abbr">USD</span>
      </p>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import Language from "@/lang/langInterface";

export default class Sidebar extends Vue {
  private lang = WalletHandlerModule.currentLanguage;
}
</script>

<style>
  .sidebar {
    background: #090C14;
  }
  .balance {
    padding: 24px 10px 8px;
    margin-bottom: 40px;
  }
  .balance__row {
    margin-bottom: 12px;
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
    border: none;
    background: none;
  }
</style>
