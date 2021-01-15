import * as bitcoin from 'bitcoinjs-lib'
import * as bip39 from 'bip39'
import * as bip32 from 'bip32'
import * as ElectrumClient from 'electrum-client'
import * as coinSelect from 'coinselect/accumulative'
import * as coinSelectSplit from 'coinselect/split'
import Axios from 'axios'
import Dexie from 'dexie'
import BigNumber from 'bignumber.js'
const net = window.require('net')

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
    confirmed : boolean

    constructor(h: string, a: string, c: number, d : Date, confirm : boolean) {
        this.hash = h
        this.amount = a
        this.height = c
        this.time = d
        this.confirmed = confirm
    }
}

export class WalletSettings {
    id: number
    language: string
    currency: string
    multiDeviceSupport: boolean

    constructor(i: number, l: string, c: string, m: boolean) {
        this.id = i
        this.language = l
        this.currency = c
        this.multiDeviceSupport = m
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
    unconfirmedTransactions : Transaction[] = new Array()
    utxos = new Array()
    feeRates: number[] = new Array()
    setUpRoot = false
    setUpClient = false
    shouldFetchUtxos = false
    internalAddressesToFetchUtxosFor: AddressLookup[] = []
    externalAddressesToFetchUtxosFor: AddressLookup[] = []

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


    async connectToElectrum() {
        try {
            this.client = new ElectrumClient(net, false, 50001, "electrum1.bitcoin.org", 'tcp')
            await this.client.initElectrum({ client: 'Bitcoin Wallet', version: '1.4' });
            await this.client.connect()
            this.setUpClient = true
        }
        catch (e) {
            console.log(e)
        }
    }

    async fetchUtxos() {

        if (!this.setUpRoot) {
            let seed = bip39.mnemonicToSeedSync(this.seed)
            this.root = bip32.fromSeed(seed)
            this.setUpRoot = true
        }

        let request = await Axios.get('https://blockchain.info/latestblock?&cors=true')

        if (request.status == 200) {

            let newUtxos = new Array()

            let height = request.data.height

            let addresses = this.externalAddressesToFetchUtxosFor
            let externalAddresses = await WalletDB.getExternalAddresses()

            for (var i = 0; i < addresses.length; i++) {
                let utxo: any[] = await this.client.blockchainScripthash_listunspent(this.convertToElectrumScriptHash(addresses[i].address))
                for (var x = 0; x < utxo.length; x++) {
                    if ((height - utxo[x].height) >= 6) { // Only utxos with 6 confirmations if the address is EXTERNAL
                        if (!this.setUpRoot) {
                            let seedBuffer = await bip39.mnemonicToSeed(this.seed)
                            this.root = bip32.fromSeed(seedBuffer)
                            this.setUpRoot = true
                        }

                        let isExternal = externalAddresses.filter((a) => a.address == addresses[i].address).length > 0
                        let index = addresses[i].index
                        let path = this.root.derivePath(`m/49'/0'/0'/${isExternal ? '0' : '1'}/${index}`)
                        let p2wpkh = bitcoin.payments.p2wpkh({ pubkey: path.publicKey })
                        let p2sh = bitcoin.payments.p2sh({ redeem: p2wpkh })

                        newUtxos.push({ height: utxo[x].height, txId: utxo[x].tx_hash, value: utxo[x].value, vout: utxo[x].tx_pos, script: p2sh.output!, witnessUtxo: { script: p2sh.output!, value: utxo[x].value } })
                    }
                }
            }

            addresses = this.internalAddressesToFetchUtxosFor

            for (var i = 0; i < addresses.length; i++) {
                let utxo: any[] = await this.client.blockchainScripthash_listunspent(this.convertToElectrumScriptHash(addresses[i].address))
                for (var x = 0; x < utxo.length; x++) {

                    if (!this.setUpRoot) {
                        let seedBuffer = await bip39.mnemonicToSeed(this.seed)
                        this.root = bip32.fromSeed(seedBuffer)
                        this.setUpRoot = true
                    }

                    let isExternal = externalAddresses.filter((a) => a.address == addresses[i].address).length > 0
                    let index = addresses[i].index
                    let path = this.root.derivePath(`m/49'/0'/0'/${isExternal ? '0' : '1'}/${index}`)
                    let p2wpkh = bitcoin.payments.p2wpkh({ pubkey: path.publicKey })
                    let p2sh = bitcoin.payments.p2sh({ redeem: p2wpkh })

                    newUtxos.push({ height: utxo[x].height, txId: utxo[x].tx_hash, value: utxo[x].value, vout: utxo[x].tx_pos, script: p2sh.output!, witnessUtxo: { script: p2sh.output!, value: utxo[x].value } })

                }

            }

            this.utxos = newUtxos
        }
    }

    async fetchFeeRates() {
        const important = await this.client.blockchainEstimatefee(3)
        const standard = await this.client.blockchainEstimatefee(6)
        const low = await this.client.blockchainEstimatefee(9)
        this.feeRates = [Math.ceil(new BigNumber(low).multipliedBy(100000000).dividedBy(1000).toNumber()), Math.ceil(new BigNumber(standard).multipliedBy(100000000).dividedBy(1000).toNumber()), Math.ceil(new BigNumber(important).multipliedBy(100000000).dividedBy(1000).toNumber())]
    }

    async synchronize(smallSync: boolean) {

        // This will be set to true if any new transactions have occurred and we need to fetch utxos
        this.shouldFetchUtxos = false || !this.setUpClient

        // Let's initialize our client if we haven't done so already
        if (!this.setUpClient) {
            await this.connectToElectrum()
        }

        // First fetch the addresses we care about from the database
        let externalAddresses = await WalletDB.getExternalAddresses()
        let internalAddresses = await WalletDB.getInternalAddresses()

        // Get the settings too so we know if we want to support multiple devices
        let settings = await WalletDB.getSettings()

        // We don't want to poll lookahead addresses if it's a small sync
        if (smallSync && !settings.multiDeviceSupport) {
            externalAddresses = externalAddresses.filter((a) => !a.isLookAhead)
            internalAddresses = internalAddresses.filter((a) => !a.isLookAhead || a.balance > 0)
        }

        this.externalAddressesToFetchUtxosFor = externalAddresses.filter((a) => a.balance > 0)
        this.internalAddressesToFetchUtxosFor = internalAddresses.filter((a) => a.balance > 0)

        await this.processAddresses(externalAddresses, internalAddresses)

        // We need to fetch the utxos
        if (this.shouldFetchUtxos) {
            await this.fetchUtxos()
        }

        await this.fetchFeeRates()

    }

    // Fetches balance information and potential transactions for the given addresses
    async processAddresses(externalAddresses: AddressLookup[], internalAddresses: AddressLookup[]) {

        if (externalAddresses.length == 0 && internalAddresses.length == 0) {
            return
        }

        // Addresses that need further processing (for example they are added lookahead addresses)
        let externalsNeedLookup: AddressLookup[] = []
        let internalsNeedLookup: AddressLookup[] = []

        // We use this to keep track of and store newly observed transactions we don't yet know about
        let newTransactions: Transaction[] = new Array()

        let scriptHashToAddressLookup: { [key: string]: string } = {}
        let addressToBalanceLookup: { [key: string]: string } = {}
        let scripthashes = [];

        for (var i = 0; i < externalAddresses.length; i++) {
            let addressString = externalAddresses[i].address
            let scriptHash = this.convertToElectrumScriptHash(addressString)
            scripthashes.push(scriptHash)
            scriptHashToAddressLookup[scriptHash] = addressString
        }

        let chunks = this.splitIntoChunks(scripthashes, 50)

        for (var i = 0; i < chunks.length; i++) {
            let results = await this.client.blockchainScripthash_getBalanceBatch(chunks[i]);

            for (var x = 0; x < results.length; x++) {
                addressToBalanceLookup[scriptHashToAddressLookup[results[x].param]] = results[x].result.confirmed + results[x].result.unconfirmed
            }
        }

        let scriptHashToAddressLookupInternal: { [key: string]: string } = {}
        let addressToBalanceLookupInternal: { [key: string]: string } = {}
        let scripthashesInternal = [];

        for (var i = 0; i < internalAddresses.length; i++) {
            let addressString = internalAddresses[i].address
            let scriptHash = this.convertToElectrumScriptHash(addressString)
            scripthashesInternal.push(scriptHash)
            scriptHashToAddressLookupInternal[scriptHash] = addressString
        }

        chunks = this.splitIntoChunks(scripthashesInternal, 50)

        for (var i = 0; i < chunks.length; i++) {
            let results = await this.client.blockchainScripthash_getBalanceBatch(chunks[i]);

            for (var x = 0; x < results.length; x++) {
                addressToBalanceLookupInternal[scriptHashToAddressLookupInternal[results[x].param]] = results[x].result.confirmed + results[x].result.unconfirmed
            }
        }


        /* Cycle through the addresses and get the balance, if the address is a lookahead address,
        then we increment the external or internal trackers until we catch up fully, then we re-populate the addresses */

        for (var i = 0; i < externalAddresses.length; i++) {

            let balance: any = addressToBalanceLookup[externalAddresses[i].address]

            // Transactions that we don't know about have occurred
            if (balance != externalAddresses[i].balance) {

                let transactions: any[] = await this.client.blockchainScripthash_getHistory(this.convertToElectrumScriptHash(externalAddresses[i].address))

                if (transactions.length > 0) {
                    this.shouldFetchUtxos = true
                }

                // Our external index trackers are behind so we need to catch up
                if ((transactions.length > 0) && externalAddresses[i].index >= this.external) {
                    for (var j = 0; j <= externalAddresses[i].index - this.external; j++) {
                        await this.incrementExternalIndex()
                        let newAddress = await this.getExternalAddress(this.external + 20)
                        externalsNeedLookup.push(new AddressLookup(this.external + 20, newAddress, -1, true))
                    }
                }

                for (var j = 0; j < transactions.length; j++) {
                    // Make sure we haven't already saved the transaction or we don't already have it
                    let exists = await WalletDB.transactions.where('hash').equals(transactions[j].tx_hash).toArray()

                    if (exists.length == 0 && newTransactions.filter((tx) => tx.hash == transactions[j].tx_hash).length == 0) {

                        if (transactions[j].confirmations >= 6) {
                            newTransactions.push(new Transaction(transactions[j].tx_hash, '0', transactions[j].height, new Date(), true))
                        }

                        else {
                            newTransactions.push(new Transaction(transactions[j].tx_hash, '0', transactions[j].height, new Date(), false))
                        }
                    }
                }
            }

            // This is set when the wallet is first created to force look up of the history, we can set to 0 now that we have history
            if (externalAddresses[i].balance == -1) {
                await WalletDB.externalAddresses.where('address').equals(externalAddresses[i].address).modify({ 'balance': 0 })
            }

        }

        for (var i = 0; i < internalAddresses.length; i++) {
            let balance: any = addressToBalanceLookupInternal[internalAddresses[i].address]

            // Transactions that we don't know about have occurred
            if (balance != internalAddresses[i].balance) {

                let transactions: any[] = await this.client.blockchainScripthash_getHistory(this.convertToElectrumScriptHash(internalAddresses[i].address))

                if (transactions.length > 0) {
                    this.shouldFetchUtxos = true
                }

                // Our internal index trackers are behind so we need to catch up
                if ((transactions.length > 0) && internalAddresses[i].index >= this.internal) {
                    for (var j = 0; j <= internalAddresses[i].index - this.internal; j++) {
                        await this.incrementInternalndex()
                        let newAddress = await this.getInternalAddress(this.internal + 20)
                        internalsNeedLookup.push(new AddressLookup(this.internal + 20, newAddress, -1, true))
                    }
                }

                for (var j = 0; j < transactions.length; j++) {
                    // Make sure we haven't already saved the transaction or we don't already have it
                    let exists = await WalletDB.transactions.where('hash').equals(transactions[j].tx_hash).toArray()
                    if (exists.length == 0 && newTransactions.filter((tx) => tx.hash == transactions[j].tx_hash).length == 0) {
                        if (transactions[j].confirmations >= 6) {
                            newTransactions.push(new Transaction(transactions[j].tx_hash, '0', transactions[j].height, new Date(), true))
                        }
                        else {
                            newTransactions.push(new Transaction(transactions[j].tx_hash, '0', transactions[j].height, new Date(), false))
                        }
                    }
                }
            }

            // This is set when the wallet is first created to force look up of the history, we can set to 0 now that we have history
            if (internalAddresses[i].balance == -1) {
                await WalletDB.internalAddresses.where('address').equals(internalAddresses[i].address).modify({ 'balance': 0 })
            }

        }

        // Confirmed transactions (sorted by height)
        let confirmedTransactions = newTransactions.filter((tx) => tx.height > 0).sort((tx1, tx2) => tx1.height - tx2.height)

        // Unconfirmed transactions
        let unconfirmedTransactions = newTransactions.filter((tx) => tx.height == 0)

        await this.processTransactions(confirmedTransactions, externalAddresses, internalAddresses)
        await this.processTransactions(unconfirmedTransactions, externalAddresses, internalAddresses)
        await this.processAddresses(externalsNeedLookup, internalsNeedLookup)

    }

    async processTransactions(newTransactions: Transaction[], externalAddresses: AddressLookup[], internalAddresses: AddressLookup[]) {
        for (var i = 0; i < newTransactions.length; i++) {
            let transaction = await this.client.blockchainTransaction_get(newTransactions[i].hash, true)
            let amount = new BigNumber(0)

            // Read the inputs
            for (var j = 0; j < transaction.vin.length; j++) {

                // We need to fetch the referenced input transaction to get the addresses and amounts
                let inputTransaction = await this.client.blockchainTransaction_get(transaction.vin[j].txid, true)
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
                                            if (transaction.confirmations >= 6) {
                                                await WalletDB.externalAddresses.where('address').equals(externalAddresses[l].address).modify({ 'balance': 0 })
                                            }
                                        }
                                    }
                                }

                                // Need to update the balance of one of our internal addresses as we have spent from it
                                if (internalAddresses.filter((a) => a.address == address).length > 0) {
                                    for (var l = 0; l < internalAddresses.length; l++) {
                                        if (internalAddresses[l].address == address) {
                                            if (transaction.confirmations >= 6) {
                                                await WalletDB.internalAddresses.where('address').equals(internalAddresses[l].address).modify({ 'balance': 0 })
                                            }
                                            // We don't need to fetch UTXOs for this address anymore
                                            this.internalAddressesToFetchUtxosFor = this.internalAddressesToFetchUtxosFor.filter((a) => a.address != internalAddresses[l].address)
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
                                let currentAddress = await WalletDB.externalAddresses.where('address').equals(externalAddresses[l].address).toArray()
                                let currentBalance = currentAddress[0].balance
                                let newBalance = new BigNumber(currentBalance).plus(satoshi).toNumber()

                                // Let's adjust our balance if we have 6 confs and add it to our addressesses to get UTXOs for
                                if (transaction.confirmations >= 6) {
                                    await WalletDB.externalAddresses.where('address').equals(externalAddresses[l].address).modify({ 'balance': newBalance })
                                    this.externalAddressesToFetchUtxosFor.push(externalAddresses[l])
                                }

                            }
                        }
                    }

                    if (internalAddresses.filter((a) => a.address == address).length > 0) {
                        // See if this is one of our change outputs
                        for (var x = 0; x < internalAddresses.length; x++) {

                            // Yep address is change
                            if (internalAddresses[x].address == address) {

                                // Add back our change to the amount because we're obviously not spending it
                                amount = amount.plus(transaction.vout[j].value)

                                // Convert to satoshis which is the format of the balances
                                let satoshi = new BigNumber(transaction.vout[j].value).multipliedBy(100000000)

                                // We need to fetch the UTXO for this unspent change
                                this.internalAddressesToFetchUtxosFor.push(internalAddresses[x])

                                // Reduce the balance we have on record for this address by the amount spent only if the transaction has 6 confirmations
                                if (transaction.confirmations >= 6) {
                                    await WalletDB.internalAddresses.where('address').equals(internalAddresses[x].address).modify({ 'balance': satoshi.toNumber() })
                                }
                            }
                        }
                    }
                }
            }

            if (transaction.confirmations >= 6) {
                await WalletDB.transactions.put(new Transaction(newTransactions[i].hash, amount.toString(), newTransactions[i].height, new Date(transaction.time * 1000), true))
                               
                // Clear it from the unconfirmed transactions list
                await WalletDB.unconfirmedTransactions.where('hash').equals(newTransactions[i].hash).delete()

                // Remove the transaction from our list of unconfirmed transactions (<6 confs)
                this.unconfirmedTransactions = await WalletDB.unconfirmedTransactions.toArray()
            }

            else {

                // Check if we've seen it
                let weAlreadyHave = await WalletDB.unconfirmedTransactions.where('hash').equals(newTransactions[i].hash).limit(1).toArray()

                // We haven't seen this, so put it in
                if(weAlreadyHave.length == 0) {
                    await WalletDB.unconfirmedTransactions.put(new Transaction(newTransactions[i].hash, amount.toString(), transaction.confirmations > 0 ? newTransactions[i].height : 0, new Date(), false))

                }
                
                // Update the height
                else {
                    if (transaction.confirmations > 0) {
                        await WalletDB.unconfirmedTransactions.where('hash').equals(newTransactions[i].hash).modify({'height' : newTransactions[i].height})
                    }
                }

            }
        }
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

    splitIntoChunks(arr: string[], chunkSize: number): string[][] {
        const groups = [];
        let i;
        for (i = 0; i < arr.length; i += chunkSize) {
            groups.push(arr.slice(i, i + chunkSize));
        }
        return groups;
    }

}

export class WalletDatabase extends Dexie {

    wallet!: Dexie.Table<IWallet, number>
    externalAddresses!: Dexie.Table<AddressLookup, number>
    internalAddresses!: Dexie.Table<AddressLookup, number>
    transactions!: Dexie.Table<Transaction, number>
    unconfirmedTransactions!: Dexie.Table<Transaction, number>
    settings!: Dexie.Table<WalletSettings, number>

    constructor() {
        super("Wallet")

        this.version(1).stores({ wallet: "++id, seed, external, internal" })
        this.version(1).stores({ externalAddresses: "index, address, balance, isLookAhead" })
        this.version(1).stores({ internalAddresses: "index, address, balance, isLookAhead" })
        this.version(1).stores({ transactions: "++id, hash, amount, height, time, confirmed" })
        this.version(1).stores({ settings: "++id, language, currency, multiDeviceSupport" })
        this.version(1).stores({ unconfirmedTransactions: "++id, hash, amount, height, time, confirmed" })

        this.wallet.mapToClass(Wallet)
        this.externalAddresses.mapToClass(AddressLookup)
        this.internalAddresses.mapToClass(AddressLookup)
        this.transactions.mapToClass(Transaction)
        this.unconfirmedTransactions.mapToClass(Transaction)
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
                await this.internalAddresses.put(new AddressLookup(i, wallet.getInternalAddress(i), -1, true))
            }
            else {
                await this.internalAddresses.put(new AddressLookup(i, wallet.getInternalAddress(i), -1, false))
            }
        }

    }

    async createSettingsIfNotExist() {
        let s = await this.settings.toArray()

        if (s.length == 0) {

            // Let's set the language initially as their locale language
            let language = navigator.language.split('-')[0]

            if (language == "en" || language == "es" || language == "fr" || language == "ja" || language == "ca" || language == "it") {
                await this.settings.put(new WalletSettings(1, language, 'USD', false))
            }

            else if(navigator.language == "pt-br") {
                await this.settings.put(new WalletSettings(1, "pt-br", 'USD', false))
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

    async changeMultiDeviceSupport(enabled: boolean) {
        let existingSettings = await this.settings.toArray()
        await this.settings.update(existingSettings[0].id, { 'multiDeviceSupport': enabled })
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
