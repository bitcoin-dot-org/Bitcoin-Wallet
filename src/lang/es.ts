/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var es = <Language> {
    // Initial page
    getting_started: 'Empezando',
    create_new: 'Crear nuevo monedero',
    create_subtext: "We'll create a new wallet for you so you can start using Bitcoin.",
    restore_existing: 'restaurar monedero existente',
    restore_subtext: "You already have a wallet and wish to use your recovery phrase to restore it.",
    change_language: 'Change language',
    choose_language: 'Choose Language',

    // Create page
    seed_phrase: "Recovery Words",
    wrote_it_down: 'La he guardado',
    generate: 'Generar',
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
    restoring: 'Restoring...',

    // Wallet home
    refresh: 'Actualizar',
    overview: 'Resumen',
    send: 'Enviar',
    receive: 'Recibir',
    settings: 'Configuraciones',
    amount_to_send: 'Cantidad a enviar',
    not_enough_balance: 'Not enough balance to send that amount',
    send_max: 'Enviar el máximo',
    amount: 'Cantidad',
    miner_fee: 'Comisión',
    total: 'Total',
    confirmation: 'Confirmación',
    they_receive: 'They receive',
    recepient: 'Recepient',
    sending: 'Sending...',
    are_you_sure: 'Are you sure you want to send this transaction?',
    im_sure: "Estoy seguro, enviar",
    seed_modal: 'Recovery Words',
    transaction: 'transaction',
    transactions: 'transactions',
    buy_bitcoin: 'Buy Bitcoin',

    // Pagination
    page: 'Page', // Displayed as 'Page 1 of 1'
    of: 'of',

    // Overview
    total_balance: "Total Balance",
    no_transactions: "You have not made any transactions yet",
    what_to_do: "What would you like to do?",
    date: 'Date',
    status: 'Estado',
    processing: 'Procesando',
    unconfirmed: 'Sin confirmar',
    complete: 'Completado',

    // Send
    send_to: 'Send only to Bitcoin (BTC) addresses',
    bitcoin_address: 'Bitcoin address',
    address: 'Dirección',
    low_priority: 'Prioridad baja',
    standard: 'Estándar',
    important: 'Importante',
    low_priority_desc: "Pagas menos comisiones pero considerando que esta es una transacción de baja prioridad y no te importa esperar más tiempo para su confirmación.",
    standard_desc: "Se usará una comisión moderada aunque en momentos de gran congestión esto puede comportar un tiempo de confirmación más largo (ocurre pocas veces)",
    important_desc: "Se usará una comisión premium para asegurar la confirmación en menos de 30 minutos, esta es una transacción de alta prioridad para cuando se desea una confirmación rápida.",
    not_enough: "You don't have enough to send that amount and also pay the network fee. Try sending your entire balance with the Send Max button instead.",
    dust_error: "The amount you are trying to send is too small for the Bitcoin network to process.",
    bitcoin_network_fee: "Bitcoin Network fee",

    // Receive
    receive_only: 'Recibir solo Bitcoin',
    wallet_address: 'Wallet address',
    address_below: 'a la siguiente dirección',

    // Settings
    show_seed: 'Recovery',
    language: 'Idioma',
    currency: 'Moneda',
    exit_wallet: 'Salir del monedero',

    // Buttons
    back_button: 'Atrás',
    restore_button: 'Restaurar',
    next_button: 'Siguiente',
    ok_button: 'OK',
    copy_button: 'Copiar',
    save_button: 'Save',

    // Notification
    notification_title: 'Incoming Transaction',

    // Exit wallet
    exit_text: 'This will destroy your wallet files and all records of your transactions. The only way to restore your wallet will be through your recovery words',
    exit_are_you_sure: 'Are you sure you want to delete and exit this wallet?',
    exit_label_text: 'Yes, delete this wallet',
    exit_delete: 'Delete'
}

export default es
