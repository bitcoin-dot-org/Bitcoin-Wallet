## Bitcoin Wallet

![](https://i.imgur.com/B5TA5AS.png "Screenshot")

## Goals
Bitcoin Wallet is a desktop wallet meant for new users to get started using Bitcoin. The wallet is explicity designed and focused around providing a better interface and more simple way of engaging with Bitcoin than most other desktop wallets. Most Bitcoin beginners when looking for a desktop wallet are recommended either Electrum, or Core, and while these wallets are both excellent, the feature set is far beyond what an average user will ever need, and both wallets look dated aesthetically.

## Features
- All addresses by default are Segwit (P2WPKH-nested-in-P2SH)
- Hierarchical deterministic keys
- BIP-39 mnemonic 12 word seed
- ElectrumX backend for quick sync
- Adjust fees between 3 built-in levels
- Ability to use fiat amounts to transact

## Want to add a new feature?
The philosophy of this wallet is simplicity! Rather than adding new features, you are strongly urged to remove existing features where possible instead. When adding a new feature, you should ask yourself whether it's something which would benefit the average user of the wallet. In this way, rather than the wallet growing more complex with time, it will hopefully become more simpler.

PR's or issues discussing adding features like Multi-sig, or Lightning, or RBF, and other such things will immediately be closed. It's understandable the types of people that contribute to Bitcoin software on Github are "power users", but having a wallet with a gazillion features isn't in line with the philosophy here.

## Adding or updating languages
Adding a language is simple, you need to create a new file in this directory https://github.com/bitcoin-dot-org/Bitcoin-Wallet/tree/master/src/lang with the name <language_code>.ts, for example es.ts currently contains the Spanish translations. When translating, keep in mind there are layout concerns, so try to make sure the text isn't too long, otherwise it might cause things to appear strange. This is a bigger concern in languages in which simple English words have really long equivalents.

Updating a language is as easy as updating the file with the translations in it. Some non-English translation files may have English text in some parts, this is because there may be new words or phrases added to the wallet that haven't had the chance to be translated yet. You may want to periodically look through translation files for languages you want to translate to see if any new words need to be translated.

We appreciate all translators and may from time to time reward contributions with BTC, so make sure to leave your Bitcoin address in your Github profile if you're regularly making translation contributions to this project.

## Project Setup
```
yarn install
```

### Compiles and serves a development build
```
yarn electron:serve
```

### Compiles and builds for production
Generated binaries are placed in dist_electron folder
```
yarn electron:build
```

### Lints and fixes files
```
yarn lint
```
