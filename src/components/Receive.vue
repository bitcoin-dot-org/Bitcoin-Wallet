<template>
<div id="white-container">

  <p>{{ language.receive_only }} (<b>BTC</b>) {{ language.address_below }}</p>

<div class="spectrum-Textfield spectrum-Textfield--quiet" style="width: 320px; margin-bottom: 20px; margin-top:15px;">
  <input type="text" name="field" :value="address" class="spectrum-Textfield-input" disabled>
</div>

<button class="spectrum-Button spectrum-Button--primary spectrum-Button--quiet" style="margin-top: 20px; margin-left: 10px;" v-on:click="copyAddress()">
  <span class="spectrum-Button-label">{{ language.copy_button }}</span>
</button>
    <qrcode-vue :value="address" size="120" level="H"></qrcode-vue>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import WalletHandlerModule from '@/store/modules/WalletHandlerModule'
import QrcodeVue from 'qrcode.vue'

/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

@Component({components: {QrcodeVue}})
export default class Overview extends Vue {

    @Prop() language! : Language

    private address = WalletHandlerModule.nextFreeExternalAddress

    copyAddress() {
      navigator.clipboard.writeText(this.address)
    }

}

</script>

<style scoped>


</style>
