/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var fr = <Language> {
    // Initial page
    getting_started: 'Getting Started',
    create_new: 'Create new wallet',
    create_subtext: "We'll create a new wallet for you so you can start using Bitcoin.",
    restore_existing: 'restore existing wallet',
    restore_subtext: "You already have a wallet and wish to use your recovery phrase to restore it.",
    something_wrong: 'Something went wrong with the connection',
    try_again: 'Try again',

    // Create page
    seed_phrase: "Recovery Words",
    wrote_it_down: 'I wrote it down',
    generate: 'Generate',
    warning: 'Warning',
    we_will_generate: 'We will generate for you 12 recovery words.',
    warning_text_1: "Write the words down in the correct order, and keep them safe, offline. If you lose these words, you won't be able to access your Bitcoin.",
    warning_text_2: "These recovery words will allow you to recover your wallet. Write the words down and keep them safe, offline.",
    write_it_down: 'Write it down',
    keep_it_safe: 'Keep it safe',
    do_not_lose_it: 'Don’t lose it',
    have_saved: 'I have saved my recovery words safely.',

    // Restore page
    restore_notice: 'Enter your 12 word seed phrase to restore your wallet',

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
    no_transactions: "Unfortunately you don't have any transactions yet...",
    block_height: 'Block Height',
    status: 'Status',
    processing: 'Processing',
    unconfirmed: 'Unconfirmed',
    complete: 'Complete',

    // Send
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

    // Receive
    receive_only: 'Receive only Bitcoin',
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
    copy_button: 'Copy'
}

export default fr