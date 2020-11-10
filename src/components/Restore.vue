<template>
  <Screen class="restore-screen">
    <div class="restore__main">
      <PageTitle>Restore existing wallet</PageTitle>
      <PageSubtitle>{{ lang.restore_notice }}</PageSubtitle>

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
          <ButtonPrimary :click="nextPressed">
            <span v-if="!restoring">{{ lang.restore_button }}</span>
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

  async nextPressed() {
    this.restoring = true;
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


</style>
