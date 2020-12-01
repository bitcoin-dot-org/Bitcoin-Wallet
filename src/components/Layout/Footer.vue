<template>
  <footer :class="['footer', isMac ? 'less-padding' : '' ]">
    <slot/>
  </footer>  
</template>


<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";

@Component
export default class Footer extends Vue {
  private isMac = WalletHandlerModule.isMac
}
</script>

<style scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 32px;
    background: #13161F;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-bottom: 50px;
  }
  .less-padding {
    padding-bottom: 30px;
  }
</style>
