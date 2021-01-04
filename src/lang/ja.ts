/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var ja = <Language> {
    // Initial page
    getting_started: '開始',
    create_new: '新規ウォレットの作成',
    create_subtext: "新規ウォレットを作成し、ビットコインを使い始めましょう。",
    restore_existing: '既存ウォレットの復元',
    restore_subtext: "既にお持ちのウォレットをリカバリーフレーズにより復元したい場合",
    choose_language: '言語の選択',
    change_language: '言語の変更',

    // Create page
    seed_phrase: "リカバリーワード",
    wrote_it_down: '書き留めました。',
    generate: '生成',
    warning: '警告',
    we_will_generate: '12個のリカバリーワードを生成します。',
    warning_text_1: "正しい順序でワードを書き留め、オフラインの安全な場所に保管してください。もしワードを忘れてしまった場合、ビットコインにアクセスできなくなります。",
    warning_text_2: "リカバリーワードによりウォレットを復元することができます。ワードを書き留めて、オフラインの安全な場所に保管してください。",
    write_it_down: '書き留める',
    keep_it_safe: '安全な場所に保管する',
    do_not_lose_it: '紛失しないようにする',
    have_saved: 'リカバリーワードを安全な場所に保管しました。',

    // Restore page
    restore_notice: 'ウォレットを復元するためにリカバリーワードを入力してください。',
    restore_warning: '入力されたリカバリーワードが正しくありません。ワードはすべて小文字であり、正しく記載する必要があります。',
    restoring: '復元中...',

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
    they_receive: '受信します',
    recepient: '受信者',
    sending: '送信中...',
    are_you_sure: 'このトランザクションを本当に実行しますか？',
    im_sure: "実行する。",
    seed_modal: 'リカバリーワード',
    transaction: 'トランザクション',
    transactions: '各トランザクション',
    buy_bitcoin: 'ビットコインを購入',

    // Pagination
    page: 'Page', // Displayed as 'Page 1 of 1'
    of: 'of',

    // Overview
    total_balance: "全残高",
    no_transactions: "まだトランザクションを行っていません。",
    what_to_do: "行いたいことは何ですか？",
    date: '日付',
    status: 'ステータス',
    processing: '処理中',
    unconfirmed: '未承認',
    complete: '完了',

    // Send
    send_to: 'ビットコイン（BTC）のアドレスのみに送信してください。',
    bitcoin_address: 'ビットコインアドレス',
    address: 'アドレス',
    low_priority: '低優先',
    standard: '標準',
    important: '高優先',
    low_priority_desc: "低い手数料ですが、トランザクションの優先度が低くなるため、通常よりも承認に時間を要する可能性があります。",
    standard_desc: "標準的な手数料です。混雑が激しい場合、承認時間が長くなる可能性が稀にあります。",
    important_desc: "高い手数料ですが、30分以内の早期の承認を目標とします。承認を早めたい場合に使用する、優先度が高いトランザクションです。",
    not_enough: "指定額の送信とネットワーク手数料の支払いのための額が足りません。全残高を全送信ボタンを使用して送信を試行してください。",
    dust_error: "送信しようとしている額が小さすぎるため、ビットコインネットワークで処理することができません。",
    bitcoin_network_fee: "ビットコインネットワーク手数料",

    // Receive
    receive_only: 'ビットコインのみの受取り',
    wallet_address: 'ウォレットアドレス',
    address_below: '下記のアドレスへ',

    // Settings
    show_seed: 'リカバリー',
    language: '言語',
    currency: '通貨',
    exit_wallet: '終了',

    // Buttons
    back_button: '戻る',
    restore_button: '復元',
    next_button: '次へ',
    ok_button: 'OK',
    copy_button: 'コピー',
    save_button: '保存',

    // Notification
    notification_title: 'トランザクションの受信',

    // Exit wallet
    exit_text: 'ウォレットの削除により全てのファイルとトランザクション記録が喪失します。ウォレットはリカバリーワードによってのみ復元することができます。',
    exit_are_you_sure: '本当にこのウォレットを削除しますか？',
    exit_label_text: 'このウォレットを削除します。',
    exit_delete: '削除'
}

export default ja
