<template>
  <Screen class="restore-screen">
    <div class="restore__main">
      <PageTitle>{{ lang.restore_existing }}</PageTitle>
      <PageSubtitle v-if="!this.invalidWords">{{ lang.restore_notice }}</PageSubtitle>

  <div class="warning" v-if="this.invalidWords">
      <span>{{ lang.warning }}</span>
      {{ lang.restore_warning }}
    </div>

  <div class="ol_parent">
      <div class="ol_container">
        <OL class="list">
        <LI><Input v-model="words[0]"/></LI>
        <LI><Input v-model="words[1]"/></LI>
        <LI><Input v-model="words[2]"/></LI>
        <LI><Input v-model="words[3]"/></LI>
        </OL>
      </div>

      <div class="ol_container">
        <OL class="list" start="5">
        <LI><Input v-model="words[4]"/></LI>
        <LI><Input v-model="words[5]"/></LI>
        <LI><Input v-model="words[6]"/></LI>
        <LI><Input v-model="words[7]"/></LI>
        </OL>
      </div>

      <div class="ol_container">
        <OL class="list" start="9">
        <LI><Input v-model="words[8]"/></LI>
        <LI><Input v-model="words[9]"/></LI>
        <LI><Input v-model="words[10]"/></LI>
        <LI><Input v-model="words[11]"/></LI>
        </OL>
      </div>
      </div>
      
    </div>
    <Footer>
        <BackLink>{{ lang.back_button }}</BackLink>
        <div v-if="!restoring">
          <ButtonPrimary :click="nextPressed" :disabled="!this.allWordsFilled || this.invalidWords">
            <span>{{ lang.restore_button }}</span>
          </ButtonPrimary>
        </div>
      <Loader v-if="restoring" class="spiner"/>
    </Footer>
  </Screen>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import PageTitle from "@/components/Text/PageTitle.vue";
import PageSubtitle from "@/components/Text/PageSubtitle.vue";
import Screen from "@/components/Layout/Screen.vue";
import Footer from "@/components/Layout/Footer.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import BackLink from "@/components/Buttons/BackLink.vue";
import OL from "@/components/List/OL.vue";
import LI from "@/components/List/LI.vue";
import Input from "@/components/Form/Input.vue";
import Loader from "@/components/Loader.vue";
import * as bip39 from "bip39";

@Component({
  components:
    {
      PageTitle,
      PageSubtitle,
      Screen, 
      Footer,
      ButtonPrimary,
      BackLink,
      OL,
      LI,
      Input,
      Loader
    }
})
export default class Restore extends Vue {
  private words = ["", "", "", "", "", "", "", "", "", "", "", ""];
  private restoring = false;
  private lang = WalletHandlerModule.currentLanguage;

  get invalidWords() {
    return this.allWordsFilled && !bip39.validateMnemonic(this.words.join(" "))
  }

  get allWordsFilled() {
    return this.words.filter((w) => w.length > 0).length == this.words.length
  }

  async nextPressed() {
    this.restoring = true;
    WalletHandlerModule.setRestoring(true)
    await WalletHandlerModule.createWallet(this.words.join(" "));
    this.$router.back();
    this.restoring = false;
  }
}
</script>

<style scoped>
  .restore-screen {
    padding-top: 40px;
  }
  .restore__main {
    flex-grow: 1;
    padding: 40px 30px;
  }
  .list {
    margin-top: 40px;
  }

  .spiner {
    width: 40px;
    height: 40px;
  }

  .warning {
    max-width: 544px;
    margin: 16px auto 0;
    padding: 8px 24px 8px 56px;
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;
    border: 1px solid #8F3F07;
    border-radius: 2px;
    background: rgba(212, 116, 18, 0.2) url('./../assets/images/warning.svg') no-repeat;
    background-position: 24px 8px;
  }
  .warning span {
    font-weight: bold;
    color: #F7931A;
  }


</style>
