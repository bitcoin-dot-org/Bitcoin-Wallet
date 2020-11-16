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
  transactions = [{}]
  unconfirmedTransactions = [{}]
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
  setTransactions(txs: Transaction[]) {

    let tx = new Array()
    let bal = new BigNumber(0)

    for (var i = 0; i < txs.length; i++) {
      let amount = new BigNumber(txs[i].amount)
      bal = bal.plus(amount)
      tx.push({ 'blockHeight': new BigNumber(txs[i].height).toNumber(), 'amount': amount, 'unconfirmed': false, date: txs[i].time, hash: txs[i].hash })
    }

    this.transactions = tx
    this.balance = bal
  }

  @Mutation
  setUnconfirmedTransactions(txs: Transaction[]) {

    let utx = new Array()
    let ubal = new BigNumber(0)

    for (var i = 0; i < txs.length; i++) {
      let amount = new BigNumber(txs[i].amount)
      ubal = ubal.plus(amount)
      utx.push({ 'blockHeight': new BigNumber(txs[i].height).toNumber(), 'amount': amount, 'unconfirmed': true, date: txs[i].time, hash: txs[i].hash })

      // We want unconfirmed spends to take away from our main balance, because when a user has just sent a transaction
      // we don't want to keep showing the old but technically correct >=6 confirmations balance
      if (amount.lt(0)) {
        this.balance = this.balance.plus(amount)
      }

    }


    this.unconfirmedTransactions = utx
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
  async fetchTransactions(smallSync : boolean) {
    let newTransactions = await WalletDB.transactions.toArray()
    let newUnconfirmed = await WalletDB.unconfirmedTransactions.toArray()

    // We have some new transactions so maybe show a notification, but only during small syncs
    if(this.transactions.concat(this.unconfirmedTransactions).length < newTransactions.concat(newUnconfirmed).length && smallSync) {

      // We don't want the old transactions we already know about
       let notify = newTransactions.concat(newUnconfirmed).filter(tx => !this.transactions.concat(this.unconfirmedTransactions).includes(tx))

       // We only notify for incoming transactions
       let received = notify.filter((n) => !n.amount.includes('-'))

       // Just notify for the most recent incoming
       if(received.length > 0) {
          const options = { 
            body: this.currentLanguage.notification_title, 
            timeoutType: 'never',
            icon: 'bitcoin.png', 
          }
          new Notification("+" +  received.reverse()[0].amount +  ' BTC', options) 
       }
    }

    this.context.commit('setTransactions', newTransactions.reverse())
    this.context.commit('setUnconfirmedTransactions', newUnconfirmed.sort(function(tx1, tx2) {return tx1.time.getMilliseconds() - tx2.time.getMilliseconds()}))
  }

  @Action
  async fetchRates() {
    let request = await Axios.get("https://www.blockchain.com/ticker")

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
    await this.fetchTransactions(smallSync)
    if (!smallSync) {
      await this.fetchSettings()
    }
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
