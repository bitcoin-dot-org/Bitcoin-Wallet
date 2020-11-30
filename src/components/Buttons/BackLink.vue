<template>
  <a class="back-link" @click="$router.go(-1)">{{ lang.back_button }}</a>
</template>

<script lang="ts">
  import { Vue } from "vue-property-decorator";
  import WalletHandlerModule from "@/store/modules/WalletHandlerModule";

  export default class BackLink extends Vue {
    private lang = WalletHandlerModule.currentLanguage;
  }
</script>

<style>
  .back-link {
    position: relative;
    padding: 8px 24px 8px 48px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: #DCE0E7;
    border: 1px solid #434854;
    border-radius: 2px;
    -webkit-app-region: no-drag;
  }
  .back-link::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 24px;
    width: 16px;
    height: 16px;
    transform: translateY(-50%);
    background: url('./../../assets/images/arrow-left.svg') center no-repeat;
    background-size: contain;
    transition: all 0.1s linear;
  }
  .back-link:hover {
    border: 1px solid #ACB2BB;
  }
  .back-link:active {
    background: #1F232E;
    border: 1px solid #434854;
  }
  .back-link:hover::before {
    left: 20px;
  }
</style>
