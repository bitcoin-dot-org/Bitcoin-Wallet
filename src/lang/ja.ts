/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var ja = <Language> {
    // Initial page
    getting_started: '開始',
    create_new: '新規ウォレットの作成',
    create_subtext: "We'll create a new wallet for you so you can start using Bitcoin.",
    restore_existing: '既存ウォレットの復元',
    restore_subtext: "You already have a wallet and wish to use your recovery phrase to restore it.",
    choose_language: 'Choose Language',

    // Create page
    seed_phrase: "Recovery Words",
    wrote_it_down: 'I wrote it down',
    generate: '生成',
    warning: 'Warning',
    we_will_generate: 'We will generate for you 12 recovery words.',
    warning_text_1: "Write the words down in the correct order, and keep them safe, offline. If you lose these words, you won't be able to access your Bitcoin.",
    warning_text_2: "These recovery words will allow you to recover your wallet. Write the words down and keep them safe, offline.",
    write_it_down: 'Write it down',
    keep_it_safe: 'Keep it safe',
    do_not_lose_it: 'Don’t lose it',
    have_saved: 'I have saved my recovery words safely.',

    // Restore page
    restore_notice: 'Please enter your recovery words to restore your wallet.',
    restore_warning: 'The recovery words you have entered are invalid. Words must be spelled correctly and have no capital letters.',

    // Wallet home
    refresh: '更新',
    overview: '概要',
    send: '送信',
    receive: '受信',
    settings: '設定',
    amount_to_send: '送信額',
    send_max: '最大送信',
    amount: '額',
    miner_fee: 'マイナーの手数料',
    total: '合計',
    confirmation: '承認',
    they_receive: 'They receive',
    recepient: 'Recepient',
    sending: 'Sending...',
    are_you_sure: 'Are you sure you want to send this transaction?',
    im_sure: "確かに送信する。",
    seed_modal: 'Recovery Words',
    transaction: 'transaction',
    transactions: 'transactions',
    buy_bitcoin: 'Buy Bitcoin',

    // Overview
    total_balance: "Total Balance",
    no_transactions: "You have not made any transactions yet",
    what_to_do: "What would you like to do?",
    date: 'Date',
    status: 'ステータス',
    processing: '処理中',
    unconfirmed: '未承認',
    complete: '完了',

    // Send
    send_to: 'Send only to Bitcoin (BTC) addresses',
    bitcoin_address: 'Bitcoin address',
    address: 'アドレス',
    low_priority: '低優先',
    standard: '標準',
    important: '高優先',
    low_priority_desc: "手数料は安く済みますが、優先度が低いトランザクションのため、通常よりも承認に時間を要する可能性があります。",
    standard_desc: "標準的な手数料です。混雑が激しい場合、承認時間が長くなる可能性が稀にあります。",
    important_desc: "高い手数料ですが30分以内の承認を目標とします。承認を早めたい場合の優先度が高いトランザクションです。",
    not_enough: "You don't have enough to send that amount and also pay the network fee. Try sending your entire balance with the Send Max button instead.",
    dust_error: "The amount you are trying to send is too small for the Bitcoin network to process.",
    bitcoin_network_fee: "Bitcoin Network fee",

    // Receive
    receive_only: 'ビットコインのみの受取り',
    wallet_address: 'Wallet address',
    address_below: '下記のアドレスへ',

    // Settings
    show_seed: 'Recovery',
    language: '言語',
    currency: '通貨',
    exit_wallet: '終了',

    // Buttons
    back_button: '戻る',
    restore_button: '復元',
    next_button: '次へ',
    ok_button: 'OK',
    copy_button: 'コピー'
}

export default ja