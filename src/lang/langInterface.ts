export default interface Language {
    getting_started: string
    create_new: string
    create_subtext: string
    restore_existing: string
    restore_subtext: string
    change_language: string
    choose_language: string

    // Create page
    seed_phrase: string
    wrote_it_down: string
    generate: string
    warning: string
    we_will_generate: string
    warning_text_1: string
    warning_text_2: string
    write_it_down: string
    keep_it_safe: string
    do_not_lose_it: string
    have_saved: string

    // Restore page
    restore_notice: string
    restore_warning: string
    restoring: string

    // Wallet home
    refresh: string
    overview: string
    send: string
    receive: string
    settings: string
    amount_to_send: string
    not_enough_balance: string
    send_max: string
    amount: string
    miner_fee: string
    total: string
    confirmation: string
    they_receive: string
    recepient: string
    sending: string
    are_you_sure: string
    im_sure: string
    seed_modal: string
    transaction: string
    transactions: string
    buy_bitcoin: string

    // Pagination
    page: string
    of: string

    // Overview
    total_balance: string
    no_transactions: string
    what_to_do: string
    date: string
    status: string
    processing: string
    unconfirmed: string
    complete: string

    // Send
    send_to: string
    bitcoin_address: string
    address: string
    low_priority: string
    standard: string
    important: string
    low_priority_desc: string
    standard_desc: string
    important_desc: string
    not_enough: string
    dust_error: string
    bitcoin_network_fee: string

    // Receive
    receive_only: string
    wallet_address: string
    address_below: string

    // Settings
    show_seed: string
    language: string
    currency: string
    exit_wallet: string

    // Buttons
    back_button: string
    restore_button: string
    next_button: string
    ok_button: string
    copy_button: string
    save_button: string

    // Notification
    notification_title: string

    // Exit wallet
    exit_text: string
    exit_are_you_sure: string
    exit_label_text: string
    exit_delete: string
}
