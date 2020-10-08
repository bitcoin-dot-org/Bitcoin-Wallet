<template>
  <Screen>
    <ScreenContent>
      <CreateStep1 v-if="!generated"/>
      <div v-if="generated">
        <CreateStep2/>
        <OL class="list">
          <LI
            v-for="(word, index) in mnemonic"
            :key="index"
          >
            <span class="phrase">{{ word }}</span>
          </LI>
        </OL>
        <button class="refresh-button">Regenerate Phrase</button>
      </div>
    </ScreenContent>
    <Footer>
      <BackLink/>
      <div>
        <Checkbox
          v-if="generated"
          class="seed-phrase-checkbox"
          v-model="seedPhraseSaved"
          label="I have saved my seed phrase safely."
        />
        <ButtonPrimary
          v-if="!loading"
          :disabled="generated && !seedPhraseSaved"
          :click="generatePressed"
        >
          {{ generated ? lang.wrote_it_down : lang.generate }}
      </ButtonPrimary>
      </div>
      <img v-if="loading" src="../assets/tail-spin.svg" height="16" />
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
  }
})
export default class Create extends Vue {
  private generated = false
  private loading = false
  private mnemonic: string[] = []
  private lang = WalletHandlerModule.currentLanguage

  data() {
    return {
      seedPhraseSaved: false
    }
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
    display: block;
    padding: 0 0 0 24px;
    margin: 8px auto 0;
    font-size: 14px;
    line-height: 20px;
    color: #7E858F;
    border: none;
    background: url('../assets/images/refresh.svg') center left no-repeat;
  }
  .seed-phrase-checkbox {
    margin-right: 24px;
  }
</style>
