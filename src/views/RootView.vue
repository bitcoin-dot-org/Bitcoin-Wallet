<template>
  <div id="root">
    <div id="loadingScreen" v-if="!this.loaded">
      <div class="loading">
        <Loader/>
      </div>
      <!-- <img class="loading" src="../assets/ball-triangle.svg" v-if="!noConnection" /> -->
      <div class="loading" v-if="noConnection">
        <div class="spectrum-Alert spectrum-Alert--warning">
          <div class="spectrum-Alert-content">{{ lang.something_wrong }}</div>
        </div>
        <button class="spectrum-Button spectrum-Button--cta" v-on:click="trySyncAgain()">
          <span class="spectrum-Button-label">
            <span>{{ lang.try_again }}</span>
          </span>
        </button>
      </div>
    </div>
    <WalletHomeView
      :language="lang"
      v-if="this.walletSetUp && this.loaded"
      v-on:close-wallet="closeWallet()"
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

  async mounted() {
    // We want to check if there's already settings, if not, create some with reasonable defaults
    await WalletHandlerModule.createSettingsIfNotExist();

    // Get the language
    this.lang = WalletHandlerModule.currentLanguage;

    // Is there a wallet set up?
    try {
      // Attempt to grab the wallet
      await WalletHandlerModule.fetchWallet();

      // Yes we have a wallet
      this.walletSetUp = true;

      try {
        // Let's sync it up
        await WalletHandlerModule.syncWallet(false);

        // We've finished the syncing
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
