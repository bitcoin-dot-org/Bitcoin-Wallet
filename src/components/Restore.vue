<template>
  <Screen class="restore-screen">
    <div class="restore__main">
      <PageTitle>Restore existing wallet</PageTitle>
      <PageSubtitle>{{ lang.restore_notice }}</PageSubtitle>
      <OL class="list">
        <LI v-for="(seed, index) in words" :key="index">
          <Input v-model="words[index]"/>
        </LI>
      </OL>
    </div>
    <Footer>
      <BackLink>{{ lang.back_button }}</BackLink>
      <ButtonPrimary v-on:click="nextPressed()">
          <span v-if="!restoring">{{ lang.restore_button }}</span>
          <img v-if="restoring" src="../assets/tail-spin.svg" height="16" />
      </ButtonPrimary>
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
      Input
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
</style>
