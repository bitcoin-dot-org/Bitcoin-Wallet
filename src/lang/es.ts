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
    something_wrong: 'Algo salió mal con la conexión',
    try_again: 'Inténtalo de nuevo',

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
    restore_notice: 'Ingresa la semilla de 12 palabras para restaurar tu monedero',

    // Wallet home
    refresh: 'Actualizar',
    overview: 'Resumen',
    send: 'Enviar',
    receive: 'Recibir',
    settings: 'Configuraciones',
    amount_to_send: 'Cantidad a enviar',
    not_enough_balance: 'No hay saldo suficiente para enviar esa cantidad',
    send_max: 'Enviar el máximo',
    amount: 'Cantidad',
    miner_fee: 'Comisión',
    total: 'Total',
    confirmation: 'Confirmación',
    sending: 'Estás enviando',
    to: 'a',
    im_sure: "Estoy seguro, enviar",
    seed_modal: 'Semilla',

    // Overview
    no_transactions: "Lamentablemente, aún no tienes ninguna transacción...",
    block_height: 'Altura del bloque',
    status: 'Estado',
    processing: 'Procesando',
    unconfirmed: 'Sin confirmar',
    complete: 'Completado',

    // Send
    address: 'Dirección',
    enter_address: 'Ingresa la dirección y la cantidad:',
    low_priority: 'Prioridad baja',
    standard: 'Estándar',
    important: 'Importante',
    low_priority_desc: "Pagas menos comisiones pero considerando que esta es una transacción de baja prioridad y no te importa esperar más tiempo para su confirmación.",
    standard_desc: "Se usará una comisión moderada aunque en momentos de gran congestión esto puede comportar un tiempo de confirmación más largo (ocurre pocas veces)",
    important_desc: "Se usará una comisión premium para asegurar la confirmación en menos de 30 minutos, esta es una transacción de alta prioridad para cuando se desea una confirmación rápida.",
    not_enough: "No tienes suficiente para enviar la cantidad especificada y cubrir la tarifa de minado. Prueba con la opción 'Enviar el máximo'.",
    dust_error: "Cantidad demasiado pequeña para el envío...",

    // Receive
    receive_only: 'Recibir solo Bitcoin',
    address_below: 'a la siguiente dirección',

    // Settings
    show_seed: 'Mostrar semilla',
    language: 'Idioma',
    currency: 'Moneda',
    exit_wallet: 'Salir del monedero',

    // Buttons
    back_button: 'Atrás',
    restore_button: 'Restaurar',
    next_button: 'Siguiente',
    ok_button: 'OK',
    copy_button: 'Copiar'
}

export default es
