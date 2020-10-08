/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var en = <Language> {
    // Initial page
    getting_started: 'Getting Started',
    welcome: 'Welcome to',
    onboard_subtitle: 'You are just few steps away from using Bitcoin wallet. Please read the next sreens for your own safety.',
    create_new: 'Create new wallet',
    to_start: 'to start using Bitcoin',
    or: 'or',
    restore_existing: 'Restore existing wallet',
    something_wrong: 'Something went wrong with the connection',
    try_again: 'Try again',
    change_language: 'Change language',

    // Choose language page
    choose_language: 'Choose Language',

    // Create page
    seed_phrase: "Seed phrase",
    create_subtitle_1: "We will generate for you a 12 word seed phrase.",
    create_subtitle_2: "Your wallet generation seed phrase is:",
    generate_notice: "We will generate for you a 12 word seed phrase. It's very important that you write down each word in the correct order and store it securely.",
    wrote_it_down: 'I wrote it down',
    generate: 'Generate',
    warning: 'Warning',
    warning_text_1: 'With this seed phrase you can always get your key back. Write the seed phrase down and keep it safe, offline. If you loose your seed phrase you will be not able to recover your wallet.',
    warning_text_2: 'This seed will alow you to recover your wallet.  Write the seed phrase down and keep it safe, offline.',
    write_it_down: 'Write it down',
    keep_it_safe: 'Keep it safe',
    do_not_loose_it: 'Don’t loose it',

    // Restore page
    restore_notice: 'Please enter 12 word seed phrase to restore your wallet.',

    // Wallet home
    refresh: 'Refresh',
    overview: 'Overview',
    send: 'Send',
    receive: 'Receive',
    settings: 'Settings',
    amount_to_send: 'Amount to send',
    not_enough_balance: 'Not enough balance to send that amount',
    send_max: 'Send max',
    amount: 'Amount',
    miner_fee: 'Miner fee',
    total: 'Total',
    confirmation: 'Confirmation',
    sending: 'You are sending',
    to: 'to',
    im_sure: "I'm sure, send",
    seed_modal: 'Seed phrase',

    // Overview
    total_balance: "Total Balance",
    no_transactions: "You  have not made any transactions yet",
    what_to_do: "What would you like to do?",
    block_height: 'Block Height',
    status: 'Status',
    processing: 'Processing',
    unconfirmed: 'Unconfirmed',
    complete: 'Complete',

    // Send
    send_to: 'Send only to Bitcoin (BTC) addresses',
    bitcoin_address: 'Bitcoin address',
    address: 'Address',
    enter_address: 'Enter address to send too and amount:',
    low_priority: 'Low priority',
    standard: 'Standard',
    important: 'Important',
    low_priority_desc: "You pay less in fees, but you consider this a low-priority transaction and you don't mind possibly waiting longer for confirmation.",
    standard_desc: "This will use a moderate fee, during times of high congestion this may lead to longer confirmation time, but these are rare.",
    important_desc: "Uses a premium fee to target confirmation within 30 minutes, this is a high priority transaction and you want it confirmed quickly.",
    not_enough: "You don't have enough to send the specified amount while also paying the miner fee. Try 'Send Max'.",
    dust_error: "Amount too small to send...",
    bitcoin_network_fee: "Bitcoin Network fee",

    // Receive
    receive_only: 'Receive only Bitcoin',
    wallet_address: 'Wallet address',
    address_below: 'to the address below',

    // Settings
    show_seed: 'Show seed phrase',
    language: 'Language',
    currency: 'Currency',
    exit_wallet: 'Exit wallet',

    // Buttons
    back_button: 'Back',
    restore_button: 'Restore',
    next_button: 'Next',
    ok_button: 'OK',
    copy_button: 'Copy',
    save_button: 'Save',
}

export default en
