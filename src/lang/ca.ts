/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var ca = <Language> {
    // Initial page
    getting_started: 'Començar',
    create_new: 'Generar nou moneder',
    create_subtext: "We'll create a new wallet for you so you can start using Bitcoin.",
    restore_existing: 'restaurar moneder existent',
    restore_subtext: "You already have a wallet and wish to use your recovery phrase to restore it.",
    something_wrong: 'Alguna cosa ha sortit malament amb la connexió',
    try_again: 'Intenta-ho de nou',

    // Create page
    seed_phrase: "Recovery Words",
    wrote_it_down: 'Ho he guardat',
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
    restore_notice: 'Escriu la llavor de 12 paraules per restaurar el teu moneder',

    // Wallet home
    refresh: 'Actualitzar',
    overview: 'Resum',
    send: 'Enviar',
    receive: 'Rebre',
    settings: 'Configuracions',
    amount_to_send: 'Quantitat a enviar',
    not_enough_balance: 'No hi ha suficients fons per enviar aquesta quantitat',
    send_max: 'Enviar el màxim',
    amount: 'Quantitat',
    miner_fee: 'Comissió',
    total: 'Total',
    confirmation: 'Confirmació',
    sending: 'Estàs enviant',
    to: 'a',
    im_sure: "Estic segur, enviar",
    seed_modal: 'Llavor (paraules de seguretat)',

    // Overview
    no_transactions: "Lamentablement, encara no tens cap transacció...",
    block_height: 'Altura del bloc',
    status: 'Estat',
    processing: 'Processant',
    unconfirmed: 'Sense confirmar',
    complete: 'Completat',

    // Send
    address: 'Adreça',
    enter_address: 'Escriu la direcció i la quantitat:',
    low_priority: 'Prioritat baixa',
    standard: 'Estàndard',
    important: 'Important',
    low_priority_desc: "Pagues menys comissions però considerant que aquesta transacció és de baixa prioritat i no et fa res esperar més temps a la confirmació.",
    standard_desc: "S'utilitzarà una comissió moderada tot i que en moments de gran congestió això pot comportar un temps de confirmació més llarg (passa poques vegades)",
    important_desc: "S'utilitzarà una comissió premium per assegurar una confirmació en menys de 30 minuts, aquesta és una transacció de prioritat alta per quan es necessita una confirmació ràpida.",
    not_enough: "No tens suficients fons per enviar la quantitat especificada i pagar la comissió dels miners. Prova amb l'opció 'Enviar el màxim'.",
    dust_error: "Quantitat massa petita per fer l'enviament...",

    // Receive
    receive_only: 'Rebre només Bitcoin',
    address_below: 'a la següent adreça',

    // Settings
    show_seed: 'Mostrar llavor',
    language: 'Idioma',
    currency: 'Moneda',
    exit_wallet: 'Sortir del moneder',

    // Buttons
    back_button: 'Enrere',
    restore_button: 'Restaurar',
    next_button: 'Següent',
    ok_button: 'OK',
    copy_button: 'Copiar'
}

export default ca
