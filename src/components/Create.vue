<template>
  <Screen>
    <ScreenContent>
      <CreateStep1 v-if="!generated"/>
      <div v-if="generated">
        <CreateStep2/>

      
  <div class="ol_parent">
      <div class="ol_container">
        <OL class="list">
        <LI><span class="phrase">{{ mnemonic[0] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[1] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[2] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[3] }}</span></LI>
        </OL>
      </div>

      <div class="ol_container">
        <OL class="list" start="5">
        <LI><span class="phrase">{{ mnemonic[4] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[5] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[6] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[7] }}</span></LI>
        </OL>
      </div>

      <div class="ol_container">
        <OL class="list" start="9">
        <LI><span class="phrase">{{ mnemonic[8] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[9] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[10] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[11] }}</span></LI>
        </OL>
      </div>
      </div>

      </div>
    </ScreenContent>
    <Footer>
      <BackLink/>
      <div v-if="!loading">
        <Checkbox
          v-if="generated"
          class="seed-phrase-checkbox"
          v-model="seedPhraseSaved"
          :label="lang.have_saved"
        />
        <ButtonPrimary
          :disabled="generated && !seedPhraseSaved"
          :click="generatePressed"
        >
          {{ generated ? lang.wrote_it_down : lang.generate }}
      </ButtonPrimary>
      </div>
      <Loader v-if="loading" class="spiner"/>
    </Footer>
  </Screen>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import Screen from "@/components/Layout/Screen.vue";
import ScreenContent from "@/components/Layout/ScreenContent.vue";
import CreateStep1 from "@/components/CreateStep1.vue";
import CreateStep2 from "@/components/CreateStep2.vue";
import Footer from "@/components/Layout/Footer.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import BackLink from "@/components/Buttons/BackLink.vue";
import Checkbox from "@/components/Form/Checkbox.vue";
import OL from "@/components/List/OL.vue";
import LI from "@/components/List/LI.vue";
import Loader from "@/components/Loader.vue";

import * as bip39 from "bip39";

@Component({
  components: {
    Screen,
    ScreenContent,
    CreateStep1,
    CreateStep2,
    Footer,
    ButtonPrimary,
    BackLink,
    Checkbox,
    OL,
    LI,
    Loader,
  }
})
export default class Create extends Vue {
  private generated = false
  private loading = false
  private mnemonic: string[] = []
  private lang = WalletHandlerModule.currentLanguage
  private refreshButtonClass = ''

  data() {
    return {
      seedPhraseSaved: false,
    }
  }

  rotateIcon() {
    this.refreshButtonClass = 'rotate';
    setTimeout(() => {
      this.refreshButtonClass = '';
    }, 500);
  }
  
  backPressed(): void {
    this.$router.back();
  }
  
  async generatePressed() {
    this.loading = true;

    if (this.mnemonic.length > 0) {
      await WalletHandlerModule.createWallet(this.mnemonic.join(" "));
      this.$router.back();
      this.loading = false;
    } else {
      setTimeout(() => {
        this.mnemonic = bip39.generateMnemonic().split(" ");
        this.generated = true;
        this.loading = false;
      }, 2000);
    }
  }
}
</script>
<style scoped>
  .list {
    margin-top: 32px;
  }
  .refresh-button {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 8px auto 0;
    font-size: 14px;
    line-height: 20px;
    color: #7E858F;
    border: none;
    background: none;
    outline: none;
  }
  .refresh-button.rotate img {
    animation: rotate .5s linear;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .refresh-button__icon {
    margin-right: 10px;
    transition: all 0.3s linear;
  }
  .seed-phrase-checkbox {
    margin-right: 24px;
  }
  .spiner {
    width: 40px;
    height: 40px;
  }
</style>
