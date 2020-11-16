import * as bitcoin from 'bitcoinjs-lib'
import * as bip39 from 'bip39'
import * as bip32 from 'bip32'
import * as ElectrumClient from '@keep-network/electrum-client-js'
import * as coinSelect from 'coinselect/accumulative'
import * as coinSelectSplit from 'coinselect/split'
import Axios from 'axios'
import Dexie from 'dexie'
import BigNumber from 'bignumber.js'

export class AddressLookup {
    index: number
    address: string
    balance: number
    isLookAhead: boolean

    constructor(i: number, a: string, b: number, look: boolean) {
        this.index = i
        this.address = a
        this.balance = b
        this.isLookAhead = look
    }
}

export class Transaction {
    hash: string
    amount: string
    height: number
    time : Date

    constructor(h: string, a: string, c: number, d : Date) {
        this.hash = h
        this.amount = a
        this.height = c
        this.time = d
    }
}

export class UnconfirmedTransaction {
    hash: string
    firstSeen : Date

    constructor(h: string, f : Date) {
        this.hash = h
        this.firstSeen = f
    }
}

export class WalletSettings {
    id: number
    language: string
    currency: string
    easyTransact: boolean

    constructor(i: number, l: string, c: string, e: boolean) {
        this.id = i
        this.language = l
        this.currency = c
        this.easyTransact = e
    }
}

interface IWallet {
    seed: string
    external: number
    internal: number
}


export class Wallet {

    seed: string
    external: number
    internal: number
    root!: bip32.BIP32Interface
    client!: any
    unconfirmedTransactions: Transaction[] = new Array()
    utxos = new Array()
    feeRates: number[] = new Array()
    setUpRoot = false
    setUpClient = false

    constructor(s: string, e: number, x: number) {
        this.seed = s
        this.external = e
        this.internal = x
    }

    getExternalAddress(index: number): string {

        if (!this.setUpRoot) {
            let seed = bip39.mnemonicToSeedSync(this.seed)
            this.root = bip32.fromSeed(seed)
            this.setUpRoot = true
        }

        let first = this.root.derivePath(`m/49'/0'/0'/0/${index}`)
        let p2wpkh = bitcoin.payments.p2wpkh({ pubkey: first.publicKey })
        let p2sh = bitcoin.payments.p2sh({ redeem: p2wpkh })
        let address = p2sh.address!
        return address
    }

    getInternalAddress(index: number): string {

        if (!this.setUpRoot) {
            let seed = bip39.mnemonicToSeedSync(this.seed)
            this.root = bip32.fromSeed(seed)
            this.setUpRoot = true
        }

        let first = this.root.derivePath(`m/49'/0'/0'/1/${index}`)
        let p2wpkh = bitcoin.payments.p2wpkh({ pubkey: first.publicKey })
        let p2sh = bitcoin.payments.p2sh({ redeem: p2wpkh })
        let address = p2sh.address!
        return address
    }

    async synchronize(smallSync: boolean) {

        // This will be set to true if any new transactions have occurred and we need to fetch utxos
        let fetchUtxos = false

        // Clear out the unconfirmed transactions after every refresh
        this.unconfirmedTransactions = new Array()

        // Let's initialize our client if we haven't done so already
        if (!this.setUpClient) {
            this.client = new ElectrumClient('electrum1.bitcoin.org', 50002, 'wss')
            this.setUpClient = true
        }

        // First fetch the addresses we care about from the database
        let externalAddresses = await WalletDB.getExternalAddresses()
        let internalAddresses = await WalletDB.getInternalAddresses()

        // We don't want to poll lookahead addresses because we're not doing a full sync
        if (smallSync) {
            externalAddresses = externalAddresses.filter((a) => !a.isLookAhead)
            internalAddresses = internalAddresses.filter((a) => !a.isLookAhead)
        }

        // This is a full sync (at launch) so we're going to want to fetch utxos
        else {
            fetchUtxos = true
        }

        // Connect to electrum
        await this.client.connect()

        // We use this to keep track of and store newly observed transactions we don't yet know about
        let newTransactions: Transaction[] = new Array()

        /* Cycle through the addresses and get the balance, if the address is a lookahead address,
        then we increment the external or internal trackers until we catch up fully, then we re-populate the addresses */

        for (var i = 0; i < externalAddresses.length; i++) {
            let balance: any = await this.client.blockchain_scripthash_getBalance(this.convertToElectrumScriptHash(externalAddresses[i].address))
            let unconfirmed = balance.unconfirmed
            let confirmed = balance.confirmed

            // Transactions that we don't know about have occurred
            if ((confirmed + unconfirmed) != externalAddresses[i].balance) {

                let transactions: any[] = await this.client.blockchain_scripthash_getHistory(this.convertToElectrumScriptHash(externalAddresses[i].address))

                // Our external index trackers are behind so we need to catch up
                if ((transactions.length > 0) && externalAddresses[i].index >= this.external) {
                    for (var j = 0; j <= externalAddresses[i].index - this.external; j++) {
                        this.incrementExternalIndex()
                        externalAddresses.push(new AddressLookup(this.external + 20, this.getExternalAddress(this.external + 20), -1, true))
                    }
                }

                for (var j = 0; j < transactions.length; j++) {
                    // Make sure we haven't already saved the transaction or we don't already have it
                    let exists = await WalletDB.transactions.where('hash').equals(transactions[j].tx_hash).toArray()
                    if (exists.length == 0 && newTransactions.filter((tx) => tx.hash == transactions[j].tx_hash).length == 0) {

                        // Gotta update the utxos now that we have a new transaction with 6 confirmations
                        if (transactions[j].confirmations >= 6) {
                            fetchUtxos = true
                        }

                        newTransactions.push(new Transaction(transactions[j].tx_hash, '0', transactions[j].height, new Date()))
                    }
                }
            }

            // This is set when the wallet is first created to force look up of the history, we can set to 0 now that we have history
            if (externalAddresses[i].balance == -1) {
                await WalletDB.externalAddresses.where('address').equals(externalAddresses[i].address).modify({ 'balance': 0 })
            }

            
        }

        for (var i = 0; i < internalAddresses.length; i++) {
            let balance: any = await this.client.blockchain_scripthash_getBalance(this.convertToElectrumScriptHash(internalAddresses[i].address))
            let unconfirmed = balance.unconfirmed
            let confirmed = balance.confirmed

            // Transactions that we don't know about have occurred
            if ((confirmed + unconfirmed) != internalAddresses[i].balance) {

                let transactions: any[] = await this.client.blockchain_scripthash_getHistory(this.convertToElectrumScriptHash(internalAddresses[i].address))

                // Our external index trackers are behind so we need to catch up
                if ((transactions.length > 0) && internalAddresses[i].index >= this.internal) {
                    for (var j = 0; j <= internalAddresses[i].index - this.internal; j++) {
                        this.incrementInternalndex()
                        internalAddresses.push(new AddressLookup(this.internal + 20, this.getInternalAddress(this.internal + 20), -1, true))
                    }
                }

                for (var j = 0; j < transactions.length; j++) {
                    // Make sure we haven't already saved the transaction or we don't already have it
                    let exists = await WalletDB.transactions.where('hash').equals(transactions[j].tx_hash).toArray()
                    if (exists.length == 0 && newTransactions.filter((tx) => tx.hash == transactions[j].tx_hash).length == 0) {

                        // Gotta update the utxos now that we have a new transaction with 6 confirmations
                        if (transactions[j].confirmations >= 6) {
                            fetchUtxos = true
                        }

                        newTransactions.push(new Transaction(transactions[j].tx_hash, '0', transactions[j].height, new Date()))
                    }
                }
            }

            // This is set when the wallet is first created to force look up of the history, we can set to 0 now that we have history
            if (internalAddresses[i].balance == -1) {
                await WalletDB.internalAddresses.where('address').equals(internalAddresses[i].address).modify({ 'balance': 0 })
            }

        }

        // Sort transactions by their height in the blockchain
        newTransactions = newTransactions.sort((tx1, tx2) => tx1.height - tx2.height)

        // Now we need to fetch information for the new transactions 
        for (var i = 0; i < newTransactions.length; i++) {
            let transaction = await this.client.blockchain_transaction_get(newTransactions[i].hash, true)
            let amount = new BigNumber(0)

            // Read the inputs
            for (var j = 0; j < transaction.vin.length; j++) {

                // We need to fetch the referenced input transaction to get the addresses and amounts
                let inputTransaction = await this.client.blockchain_transaction_get(transaction.vin[j].txid, true)
                for (var k = 0; k < inputTransaction.vout.length; k++) {
                    if (transaction.vin[j].vout == inputTransaction.vout[k].n) {
                        for (var x = 0; x < inputTransaction.vout[k].scriptPubKey.addresses.length; x++) {
                            let address: string = inputTransaction.vout[k].scriptPubKey.addresses[x]
                            if (externalAddresses.filter((a) => a.address == address).length > 0 || internalAddresses.filter((a) => a.address == address).length > 0) {
                                amount = amount.minus(inputTransaction.vout[k].value)

                                // Spent from an external address so update our balance
                                if (externalAddresses.filter((a) => a.address == address).length > 0) {
                                    for (var l = 0; l < externalAddresses.length; l++) {
                                        if (externalAddresses[l].address == address) {
                                            let satoshis = new BigNumber(inputTransaction.vout[k].value).multipliedBy(100000000)
                                            let current = new BigNumber(externalAddresses[l].balance)
                                            let newBalance = current.minus(satoshis)

                                            if(newBalance.lt(0)) {
                                                newBalance = new BigNumber(0)
                                            }
                                            if (transaction.confirmations >= 6) {
                                                await WalletDB.externalAddresses.where('address').equals(externalAddresses[l].address).modify({ 'balance': newBalance.toNumber() })
                                            }
                                        }
                                    }
                                }

                                // Need to update the balance of one of our internal addresses as we have spent from it
                                if (internalAddresses.filter((a) => a.address == address).length > 0) {
                                    for (var l = 0; l < internalAddresses.length; l++) {
                                        if (internalAddresses[l].address == address) {
                                            let satoshis = new BigNumber(inputTransaction.vout[k].value).multipliedBy(100000000)
                                            let current = new BigNumber(internalAddresses[l].balance)
                                            let newBalance = current.minus(satoshis)
                                            if (transaction.confirmations >= 6) {
                                                await WalletDB.internalAddresses.where('address').equals(internalAddresses[l].address).modify({ 'balance': newBalance.toNumber() })
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }


            // Read the outputs
            for (var j = 0; j < transaction.vout.length; j++) {
                for (var k = 0; k < transaction.vout[j].scriptPubKey.addresses.length; k++) {
                    let address: string = transaction.vout[j].scriptPubKey.addresses[k]

                    // If we've received to an external address, credit the amount
                    if (externalAddresses.filter((a) => a.address == address).length > 0) {
                        amount = amount.plus(transaction.vout[j].value)

                        // Find the external address
                        for (var l = 0; l < externalAddresses.length; l++) {

                            // We got it
                            if (externalAddresses[l].address == address) {

                                // Convert to satoshis
                                let satoshi = new BigNumber(transaction.vout[j].value).multipliedBy(100000000)

                                // Calculate the new balance
                                let newBalance = new BigNumber(externalAddresses[l].balance).plus(satoshi).toNumber()

                                // Let's adjust our balance if we have 6 confs
                                if (transaction.confirmations >= 6) {
                                    await WalletDB.externalAddresses.where('address').equals(externalAddresses[l].address).modify({ 'balance': newBalance })
                                }

                            }
                        }
                    }

                    // See if this is one of our change outputs
                    for (var x = 0; x < internalAddresses.length; x++) {

                        // Yep address is change
                        if (internalAddresses[x].address == address) {

                            // Add back our change to the amount because we're obviously not spending it
                            amount = amount.plus(transaction.vout[j].value)

                            // Convert to satoshis which is the format of the balances
                            let satoshi = new BigNumber(transaction.vout[j].value).multipliedBy(100000000)

                            // Compute the new balance for this change address
                            let newBalance = new BigNumber(internalAddresses[x].balance).plus(satoshi).toNumber()

                            // Reduce the balance we have on record for this address by the amount spent only if the transaction has 6 confirmations
                            if (transaction.confirmations >= 6) {
                                await WalletDB.internalAddresses.where('address').equals(internalAddresses[x].address).modify({ 'balance': newBalance })
                            }

                            if((internalAddresses[x].index == 0 && this.internal == 0)) {
                                this.incrementInternalndex()
                                internalAddresses.push(new AddressLookup(this.internal + 20, this.getInternalAddress(this.internal + 20), -1, true))
                            }

                            // Oops, internal addresses indexes are behind, so let's catch up
                            if (internalAddresses[x].isLookAhead) {
                                for (var j = 0; j <= internalAddresses[i].index - this.internal; j++) {
                                    this.incrementInternalndex()
                                    internalAddresses.push(new AddressLookup(this.internal + 20, this.getInternalAddress(this.internal + 20), -1, true))
                                }
                            }
                        }
                    }
                }
            }


            // We only add transactions to our database if they have 6 or more confirmations, as we don't want to deal with re-orgs
            if (transaction.confirmations >= 6) {

                // Remove the transaction from our list of unconfirmed transactions (<6 confs)
                this.unconfirmedTransactions = this.unconfirmedTransactions.filter((tx) => tx.hash != newTransactions[i].hash)

                // Put it in the database
                await WalletDB.transactions.put(new Transaction(newTransactions[i].hash, amount.toString(), newTransactions[i].height, new Date(transaction.time * 1000)))

                // Clear it from the unconfirmed transactions list
                await WalletDB.unconfirmedTransactions.where('hash').equals(newTransactions[i].hash).delete()
            }

            // It's a new unconfirmed transaction (< 6 confirmations)
            else {
                // Check if we've seen it
                let weAlreadyHave = await WalletDB.unconfirmedTransactions.where('hash').equals(newTransactions[i].hash).limit(1).toArray()

                // We have already seen this before
                if(weAlreadyHave.length > 0) {
                    this.unconfirmedTransactions.push(new Transaction(newTransactions[i].hash, amount.toString(), newTransactions[i].height, weAlreadyHave[0].firstSeen))
                }

                // Otherwise save the transaction hash and the current date for future reference
                else {
                    await WalletDB.unconfirmedTransactions.put(new UnconfirmedTransaction(newTransactions[i].hash, new Date()))
                    this.unconfirmedTransactions.push(new Transaction(newTransactions[i].hash, amount.toString(), newTransactions[i].height, new Date()))
                }
            }

        }

        // We need to fetch the utxos, so first make a call to get the current block height
        // TO DO: Use something other than blockchain.info
        if (fetchUtxos) {
            let request = await Axios.get('https://blockchain.info/latestblock?&cors=true')
            if (request.status == 200) {

                let newUtxos = new Array()

                let height = request.data.height

                // Obviously we're only interested in addresses with a balance
                let externals = await WalletDB.externalAddresses.where('balance').above(0).toArray()
                let internals = await WalletDB.internalAddresses.where('balance').above(0).toArray()
                let addresses = externals.concat(internals)

                for (var i = 0; i < addresses.length; i++) {
                    let utxo: any[] = await this.client.blockchain_scripthash_listunspent(this.convertToElectrumScriptHash(addresses[i].address))
                    for (var x = 0; x < utxo.length; x++) {
                        if ((height - utxo[x].height) >= 6) { // Only utxos with 6 confirmations

                            if (!this.setUpRoot) {
                                let seed = await bip39.mnemonicToSeed(this.seed)
                                this.root = bip32.fromSeed(seed)
                                this.setUpRoot = true
                            }

                            let isExternal = externalAddresses.filter((a) => a.address != addresses[i].address).length > 0
                            let index = addresses[i].index

                            let path = this.root.derivePath(`m/49'/0'/0'/${isExternal ? '0' : '1'}/${index}`)
                            let p2wpkh = bitcoin.payments.p2wpkh({ pubkey: path.publicKey })
                            let p2sh = bitcoin.payments.p2sh({ redeem: p2wpkh })

                            newUtxos.push({ height: utxo[x].height, txId: utxo[x].tx_hash, value: utxo[x].value, vout: utxo[x].tx_pos, script: p2sh.output!, witnessUtxo: { script: p2sh.output!, value: utxo[x].value } })
                        }

                    }

                }

                this.utxos = newUtxos
            }

        }

        // Get the current fee rates
        let important = await this.client.blockchainEstimatefee(3)
        let standard = await this.client.blockchainEstimatefee(6)
        let low = await this.client.blockchainEstimatefee(9)

        this.feeRates = [Math.ceil(new BigNumber(low).multipliedBy(100000000).dividedBy(1000).toNumber()), Math.ceil(new BigNumber(standard).multipliedBy(100000000).dividedBy(1000).toNumber()), Math.ceil(new BigNumber(important).multipliedBy(100000000).dividedBy(1000).toNumber())]

        // Close our connection to the server, we probably won't sychronize again until 10 mins, or until user presses
        // the refresh button, so better to just close our connection as we've done our job, no need to keep it open
        await this.client.close()

    }

    // Creates a Bitcoin transaction to a destination address

    async createTransaction(satoshis: number, destination: string, feeRate: number, sendMax: boolean): Promise<bitcoin.Psbt> {

        if (!this.setUpRoot) {
            let seed = bip39.mnemonicToSeedSync(this.seed)
            this.root = bip32.fromSeed(seed)
            this.setUpRoot = true
        }

        let target = undefined
        let select = coinSelect

        if (sendMax) {
            target = [{ address: destination }]
            select = coinSelectSplit
        }

        else {
            target = [{ address: destination, value: satoshis }]
        }

        let psbt = new bitcoin.Psbt()
        let { inputs, outputs, fee } = select(this.utxos, target, feeRate)

        if (!inputs || !outputs || fee == 0) {
            return Promise.reject()
        }


        let externalAddresses = await WalletDB.getExternalAddresses()
        let internalAddresses = await WalletDB.getInternalAddresses()

        let keys: { index: number, key: any }[] = new Array()

        for (var i = 0; i < inputs.length; i++) {

            let address = bitcoin.address.fromOutputScript(inputs[i].witnessUtxo.script)
            let isExternal = true
            let index = 0

            for (var x = 0; x < externalAddresses.length; x++) {
                if (externalAddresses[x].address == address) {
                    isExternal = true
                    index = externalAddresses[x].index
                }
            }

            for (var x = 0; x < internalAddresses.length; x++) {
                if (internalAddresses[x].address == address) {
                    isExternal = false
                    index = internalAddresses[x].index
                }
            }

            let path = this.root.derivePath(`m/49'/0'/0'/${isExternal ? '0' : '1'}/${index}`)
            let p2wpkh = bitcoin.payments.p2wpkh({ pubkey: path.publicKey })
            let keyPair = bitcoin.ECPair.fromWIF(path.toWIF())

            psbt.addInput({ hash: inputs[i].txId, index: inputs[i].vout, witnessUtxo: inputs[i].witnessUtxo, redeemScript: p2wpkh.output })
            keys.push({ index: i, key: keyPair })
        }

        for (var i = 0; i < outputs.length; i++) {

            let isChange = !outputs[i].address
            let shouldAdd = true

            // This is a change output so we need to fill in a change address
            if (isChange) {
                outputs[i].address = this.getInternalAddress(this.internal)

                // Not worth collecting this dust as change, so skip it
                if (outputs[i].value <= 800) {
                    shouldAdd = false
                }
            }

            if (shouldAdd) {
                psbt.addOutput({ address: outputs[i].address, value: outputs[i].value })
            }
        }

        for (var i = 0; i < keys.length; i++) {
            psbt.signInput(keys[i].index, keys[i].key)
        }

        return psbt.finalizeAllInputs()

    }

    async broadcastTransaction(hex: string) {
        await this.client.connect()
        await this.client.blockchain_transaction_broadcast(hex)
        await this.client.close()
    }

    // Increments the external index 
    async incrementExternalIndex() {
        this.external += 1
        await WalletDB.wallet.where('external').equals(this.external - 1).modify({ 'external': this.external })
        await WalletDB.externalAddresses.where('index').equals(this.external).modify({ 'isLookAhead': false })
        await WalletDB.externalAddresses.put(new AddressLookup(this.external + 20, this.getExternalAddress(this.external + 20), 0, true))
    }

    // Increments the internal index 
    async incrementInternalndex() {
        this.internal += 1
        await WalletDB.wallet.where('internal').equals(this.internal - 1).modify({ 'internal': this.internal })
        await WalletDB.internalAddresses.where('index').equals(this.internal).modify({ 'isLookAhead': false })
        await WalletDB.internalAddresses.put(new AddressLookup(this.internal + 20, this.getInternalAddress(this.internal + 20), 0, true))
    }

    convertToElectrumScriptHash(address: string): string {
        let script = bitcoin.address.toOutputScript(address)
        let hash = bitcoin.crypto.sha256(script)
        let reverse = Buffer.from(hash.reverse())
        return reverse.toString('hex')
    }

}

export class WalletDatabase extends Dexie {

    wallet!: Dexie.Table<IWallet, number>
    externalAddresses!: Dexie.Table<AddressLookup, number>
    internalAddresses!: Dexie.Table<AddressLookup, number>
    transactions!: Dexie.Table<Transaction, number>
    unconfirmedTransactions!: Dexie.Table<UnconfirmedTransaction, number>
    settings!: Dexie.Table<WalletSettings, number>

    constructor() {
        super("Wallet")

        this.version(1).stores({ wallet: "++id, seed, external, internal" })
        this.version(1).stores({ externalAddresses: "index, address, balance, isLookAhead" })
        this.version(1).stores({ internalAddresses: "index, address, balance, isLookAhead" })
        this.version(1).stores({ transactions: "++id, hash, amount, height, time" })
        this.version(1).stores({ settings: "++id, language, currency, easyTransact" })
        this.version(1).stores({ unconfirmedTransactions: "hash, firstSeen" })

        this.wallet.mapToClass(Wallet)
        this.externalAddresses.mapToClass(AddressLookup)
        this.internalAddresses.mapToClass(AddressLookup)
        this.transactions.mapToClass(Transaction)
        this.unconfirmedTransactions.mapToClass(UnconfirmedTransaction)
        this.settings.mapToClass(WalletSettings)
    }

    async create(seed: string) {

        const wallet = new Wallet(seed, 0, 0)
        const iWallet: IWallet = { seed: seed, external: 0, internal: 0 }

        await this.wallet.put(iWallet)

        for (var i = 0; i < 21; i++) {
            if (i > 0) {
                await this.externalAddresses.put(new AddressLookup(i, wallet.getExternalAddress(i), -1, true))
            }
            else {
                await this.externalAddresses.put(new AddressLookup(i, wallet.getExternalAddress(i), -1, false))
            }
        }

        for (var i = 0; i < 21; i++) {
            if (i > 0) {
                await this.internalAddresses.put(new AddressLookup(i, wallet.getInternalAddress(i), 0, true))
            }
            else {
                await this.internalAddresses.put(new AddressLookup(i, wallet.getInternalAddress(i), 0, false))
            }
        }

    }

    async createSettingsIfNotExist() {
        let s = await this.settings.toArray()

        if (s.length == 0) {

            // Let's set the language initially as their locale language
            let language = navigator.language.split('-')[0]

            if (language == "en" || language == "es" || language == "fr" || language == "ja" || language == "ca") {
                await this.settings.put(new WalletSettings(1, language, 'USD', false))
            }

            else {
                await this.settings.put(new WalletSettings(1, "en", 'USD', false))
            }
        }
    }

    async getWallet(): Promise<Wallet> {
        let storedWallets = await this.wallet.toArray()
        return new Promise<Wallet>((resolve, reject) => {

            if (storedWallets.length > 0) {
                resolve(new Wallet(storedWallets[0].seed, storedWallets[0].external, storedWallets[0].internal))
            }
            else {
                reject()
            }
        })
    }

    async getSettings(): Promise<WalletSettings> {
        let s = await this.settings.toArray()

        return new Promise<WalletSettings>((resolve, reject) => {
            if (s.length > 0) {
                resolve(s[0])
            }
            else {
                reject()
            }
        })
    }

    async changeLanguage(language: string) {
        let existingSettings = await this.settings.toArray()
        await this.settings.update(existingSettings[0].id, { 'language': language })
    }

    async changeCurrency(currency: string) {
        let existingSettings = await this.settings.toArray()
        await this.settings.update(existingSettings[0].id, { 'currency': currency })
    }

    async getExternalAddresses(): Promise<AddressLookup[]> {
        return this.externalAddresses.toArray()
    }

    async getInternalAddresses(): Promise<AddressLookup[]> {
        return this.internalAddresses.toArray()
    }


    async clearAllWallets(): Promise<void[]> {
        return Promise.all([this.wallet.clear(), this.transactions.clear(), this.unconfirmedTransactions.clear(), this.externalAddresses.clear(), this.internalAddresses.clear()])
    }
}

export var WalletDB = new WalletDatabase()
