<template>
  <Screen>
    <ScreenContent>
      <CreateStep1 v-if="!generated"/>
      <div v-if="generated">
        <CreateStep2/>
        <ol class="phrases-list">
          <li
            class="phrases-list__item"
            v-for="(word, index) in mnemonic"
            :key="index"
          >
            <span>{{ word }}</span>
          </li>
        </ol>
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
          :onClick="generatePressed"
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
  .phrases-list {
    display: flex;
    flex-wrap: wrap;
    max-width: 676px;
    padding: 0;
    margin: 32px auto 8px;
  }
  .phrases-list__item {
    width: 33.3%;
    padding-left: 8px;
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 22px;
    color: #ACB2BB;
  }
  .phrases-list__item span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 164px;
    height: 40px;
    border: 1px solid #2B2F3A;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: #DCE0E7;
  }
  .refresh-button {
    display: block;
    padding: 0 0 0 24px;
    margin: 0 auto;
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
