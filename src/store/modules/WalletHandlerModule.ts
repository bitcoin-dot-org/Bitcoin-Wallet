import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Wallet, WalletDB, WalletSettings } from '@/wallet/wallet'
import Axios from 'axios'
import en from '@/lang/en'
import es from '@/lang/es'
import fr from '@/lang/fr'
import ja from '@/lang/ja'
import ca from '@/lang/ca'
import store from '@/store'
import BigNumber from 'bignumber.js'

/* eslint-disable no-unused-vars */

import { Transaction } from '@/wallet/wallet'

/* eslint-enable no-unused-vars */

@Module({ name: 'wallet', store: store, namespaced: true, dynamic: true })
class WalletHandlerModule extends VuexModule {

  wallet = new Wallet('', 0, 0)
  transactions : Transaction[] = new Array()
  unconfirmedTransactions  : Transaction[] = new Array()
  synced = false
  balance = new BigNumber(0)
  unconfirmedBalance = new BigNumber(0)
  utxos = new Array()
  feeRates: number[] = new Array()
  fiatRate = 0
  rates : any = {}
  fiatSymbol = ''
  settings = new WalletSettings(1, 'en', 'USD', false)
  currentLanguage = en
  restoring = false


  @Mutation
  incrementExternal() {
    this.wallet.incrementExternalIndex()
  }

  @Mutation
  incrementInternal() {
    this.wallet.incrementExternalIndex()
  }

  @Mutation
  setWallet(w: Wallet) {
    this.wallet = w
  }

  @Mutation
  setRestoring(r : boolean) {
    this.restoring = r
  }

  @Mutation
  setTransactions(txs: Transaction[]) {

    let bal = new BigNumber(0)

    for (var i = 0; i < txs.length; i++) {
      let amount = new BigNumber(txs[i].amount)
      bal = bal.plus(amount)
    }

    this.transactions = txs
    this.balance = bal
  }

  @Mutation
  setUnconfirmedTransactions(txs: Transaction[]) {

    let ubal = new BigNumber(0)

    for (var i = 0; i < txs.length; i++) {
      let amount = new BigNumber(txs[i].amount)
      ubal = ubal.plus(amount)

      // We want unconfirmed spends to take away from our main balance, because when a user has just sent a transaction
      // we don't want to keep showing the old but technically correct >=6 confirmations balance
      if (amount.lt(0)) {
        this.balance = this.balance.plus(amount)
      }

    }


    this.unconfirmedTransactions = txs
    this.unconfirmedBalance = ubal

  }

  @Mutation
  setSettings(s: WalletSettings) {
    this.settings = s
  }

  @Mutation
  clearWallet() {
    this.wallet = new Wallet('', 0, 0)
  }

  @Mutation
  setUtxos(u: any[]) {
    this.utxos = u
  }

  @Mutation
  setFeeRates(fees: number[]) {
    this.feeRates = fees
  }

  @Mutation
  setFiatRate(rate : number) {
    this.fiatRate = rate
  }

  @Mutation
  setFiatSymbol(symbol : string) {
    this.fiatSymbol = symbol
  }

  @Mutation
  setFiatRates(fiatRates : any) {
    this.rates = fiatRates
  }

  @Mutation
  setCurrentLanguage(lang: string) {

    if (lang == "English" || lang == "en") {
      this.currentLanguage = en
    }

    if (lang == "Español" || lang == "es") {
      this.currentLanguage = es
    }

    if (lang == "Français" || lang == "fr") {
      this.currentLanguage = fr
    }
    
    if(lang == "日本語" || lang == "ja") {
      this.currentLanguage = ja 
    }
    
    if(lang == "Catalan" || lang == "ca") {
       this.currentLanguage = ca
    }

  }

  @Action
  async fetchWallet() {
    let w = await WalletDB.getWallet()
    this.context.commit('setWallet', w)
  }

  @Action
  async fetchSettings() {
    let s = await WalletDB.getSettings()
    this.context.commit('setCurrentLanguage', s.language)
    this.context.commit('setSettings', s)
  }

  @Action
  async createWallet(seed: string) {
    await WalletDB.create(seed)
    let w = await WalletDB.getWallet()
    this.context.commit('setWallet', w)
  }

  @Action
  async deleteAllWallets() {
    await WalletDB.clearAllWallets()
    this.context.commit('clearWallet')
  }

  @Action
  async fetchTransactions() {
    let newTransactions = await WalletDB.transactions.toArray()
    let newUnconfirmed = await WalletDB.unconfirmedTransactions.toArray()

    // We have some new transactions so maybe show a notification
    if((this.transactions.concat(this.unconfirmedTransactions).length > 0 && (this.transactions.concat(this.unconfirmedTransactions).length < newTransactions.concat(newUnconfirmed).length))) {

      // We don't want the old transactions we already know about: let's find only the new stuff
       let allNew = newUnconfirmed.concat(newTransactions)
       let allOld = this.transactions.concat(this.unconfirmedTransactions)
       let notify = allNew.filter(tx => !(allOld.filter(oldTx => oldTx.hash == tx.hash).length>0))

       // We only notify for incoming transactions
       let received = notify.filter((n) => !n.amount.includes('-'))

       const options = { 
        body: this.currentLanguage.notification_title, 
        timeoutType: 'never',
        icon: 'bitcoin.png', 
      }

       for(var x = 0; x<received.length; x++) {
        new Notification("+" +  received.reverse()[0].amount +  ' BTC', options) 
       }

    }

    this.context.commit('setTransactions', newTransactions)
    this.context.commit('setUnconfirmedTransactions', newUnconfirmed)
  }

  @Action
  async fetchRates() {
    let request = await Axios.get("https://www.blockchain.com/ticker?&cors=true")

    if (request.status == 200) {
      let rate = request.data[this.settings.currency].last
      let symbol = request.data[this.settings.currency].symbol

      // Some currencies don't have symbols so fix the formatting:
      if (symbol.length > 1) {
        symbol = symbol + " "
      }

      this.context.commit('setFiatRate', rate)
      this.context.commit('setFiatSymbol', symbol)
      this.context.commit('setFiatRates', request.data)


    }
  }

  @Action
  async syncWallet(smallSync: boolean) {
    await this.wallet.synchronize(smallSync)
    await this.fetchTransactions()
    await this.fetchSettings()
    await this.fetchRates()
    this.context.commit('setUtxos', this.wallet.utxos)
    this.context.commit('setFeeRates', this.wallet.feeRates)
  }

  @Action
  async broadcastTransaction(hex: string) {
    await this.wallet.broadcastTransaction(hex)
  }

  @Action
  async changeCurrency(c: string) {
    await WalletDB.changeCurrency(c)
    await this.fetchSettings()
    this.context.commit('setFiatRate', this.rates[c]['last'])
    this.context.commit('setFiatSymbol', this.rates[c]['symbol'])
  }

  @Action
  async changeLanguage(l: string) {
    await WalletDB.changeLanguage(l)
    await this.fetchSettings()
    this.context.commit('setCurrentLanguage', l)
  }

  @Action
  async createSettingsIfNotExist() {
    await WalletDB.createSettingsIfNotExist()
    await this.fetchSettings()
  }


  get nextFreeExternalAddress() {
    return this.wallet.getExternalAddress(this.wallet.external)
  }

  get nextFreeInternalAddress() {
    return this.wallet.getInternalAddress(this.wallet.internal)
  }

}

export default getModule(WalletHandlerModule)
