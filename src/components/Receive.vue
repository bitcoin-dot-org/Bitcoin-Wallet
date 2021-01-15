<template>
  <DashboardContent>
    <div class="receive-view">
      <DashboardTitle>{{ language.receive }}</DashboardTitle>
      <DashboardSubtitle>
        {{ language.receive_only }} (BTC) {{ language.address_below }}
      </DashboardSubtitle>
      <Label>
        {{ language.wallet_address }}
        <div class="input-wrapper">
          <Input type="text" name="field" :value="this.address.split('bitcoin:')[1]" disabled />
          <button class="copy-button" v-on:click="copyAddress()">
            <img src="../assets/images/copy.svg" alt="Copy">
          </button>
        </div>
      </Label>
      <div class="qr-code-wrapper">
        <qrcode-vue :value="address" size="138" level="H"  foreground="#1F232E"></qrcode-vue>
      </div>
    </div>
  </DashboardContent>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import WalletHandlerModule from '@/store/modules/WalletHandlerModule'
import DashboardContent from "@/components/Layout/DashboardContent.vue";
import DashboardTitle from "@/components/Text/DashboardTitle.vue";
import DashboardSubtitle from "@/components/Text/DashboardSubtitle.vue";
import Input from "@/components/Form/Input.vue";
import Label from "@/components/Form/Label.vue";
import QrcodeVue from 'qrcode.vue'

/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

@Component({components: { QrcodeVue, DashboardTitle, DashboardSubtitle, Input, Label, DashboardContent }})
export default class Overview extends Vue {

  @Prop() language! : Language

  get address() {
    return 'bitcoin:' + WalletHandlerModule.nextFreeExternalAddress
  }

  copyAddress() {
    navigator.clipboard.writeText(this.address.split('bitcoin:')[1])
  }
}

</script>

<style scoped>
  .receive-view {
    max-width: 620px;
  }
  .input-wrapper {
    position: relative;
  }
  .copy-button {
    position: absolute;
    top: 50%;
    right: 16px;
    padding: 0;
    transform: translateY(-50%);
    width: 24px;
    display: flex;
    height: 24px;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
  }
  .copy-button:hover,
  .copy-button:focus {
    background: #434854;
    border-radius: 2px;
    outline: none;
  }
  .qr-code-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  .qr-code-wrapper > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 176px;
    height: 176px;
    background: linear-gradient(180deg, #1F232E 0%, #13161F 100%);
    border: 1px solid #2B2F3A;
    box-sizing: border-box;
    box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
  }
</style>
