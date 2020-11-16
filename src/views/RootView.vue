<template>
  <div id="root">
    <div id="loadingScreen" v-if="!this.loaded">
      <div class="loading">
        <Loader/>
      </div>
    </div>
    <WalletHomeView
      :language="lang"
      v-if="this.walletSetUp && this.loaded"
      v-on:close-wallet="closeWallet()"
      v-on:language-changed="changeLanguage()"
    ></WalletHomeView>
    <OnboardView :language="lang" v-if="!this.walletSetUp && this.loaded"></OnboardView>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OnboardView from "@/views/OnboardView.vue";
import WalletHomeView from "@/views/WalletHomeView.vue";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import Loader from "@/components/Loader.vue";

@Component({
  components: {
    OnboardView,
    WalletHomeView,
    Loader
  },
})
export default class Main extends Vue {
  private loaded = false;
  private walletSetUp = false;
  private lang = WalletHandlerModule.currentLanguage;
  private noConnection = false;

  async closeWallet() {
    await WalletHandlerModule.deleteAllWallets();
    this.walletSetUp = false;
  }

  changeLanguage() {
    this.lang = WalletHandlerModule.currentLanguage
  }

  async mounted() {
    // We want to check if there's already settings, if not, create some with reasonable defaults
    await WalletHandlerModule.createSettingsIfNotExist();

    // Get the language
    this.lang = WalletHandlerModule.currentLanguage;

    // Is there a wallet set up?
    try {

      // Get the settings
      await WalletHandlerModule.fetchSettings()

      // Attempt to grab the wallet
      await WalletHandlerModule.fetchWallet();

      // Yes we have a wallet
      this.walletSetUp = true;

      try {

        // Get the fiat rates
         await WalletHandlerModule.fetchRates()

        // Let's fetch the transations
        await WalletHandlerModule.fetchTransactions()

        // We've finished fetching
        this.loaded = true;
      } catch {
        // Something went wrong with the sync, likely no internet?
        this.noConnection = true;
      }
    } catch {
      // Means we don't have a wallet
      this.walletSetUp = false;

      // Done with the loading, show the onboard screen
      this.loaded = true;
    }
  }

  async trySyncAgain() {
    try {
      this.noConnection = false;

      // Let's sync it up
      await WalletHandlerModule.syncWallet(false);

      this.noConnection = false;

      // We've finished the syncing
      this.loaded = true;
    } catch {
      // Something went wrong with the sync, likely no internet?
      this.noConnection = true;
    }
  }
}
</script>

<style scoped>
#root {
  height: 100%;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

#loadingScreen {
  height: 100%;
  animation: fade-in 2s linear;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
