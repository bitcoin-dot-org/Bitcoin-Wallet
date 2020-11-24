/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var es = <Language> {
    // Initial page
    getting_started: 'Empezando',
    create_new: 'Crear nuevo monedero',
    create_subtext: "Vamos a crear un nuevo monedero para que puedas empezar a usar Bitcoin.",
    restore_existing: 'restaurar monedero existente',
    restore_subtext: "Ya tienes un monedero y quieres usar la frase semilla para restaurarlo.",
    change_language: 'Cambiar idioma',
    choose_language: 'Escoger idioma',

    // Create page
    seed_phrase: "Frase Semilla",
    wrote_it_down: 'La he guardado',
    generate: 'Generar',
    warning: 'Alerta',
    we_will_generate: 'Vamos a generar 12 palabras de recuperación (frase semilla).',
    warning_text_1: "Anota las palabras en el orden correcto y mantenlas a salvo (offline). Si pierdes estas palabras, no podrás acceder a tu Bitcoin.",
    warning_text_2: "Estas palabras de recuperación (frase semilla) te permitirán recuperar tu monedero. Guárdalas en un lugar seguro (offline).",
    write_it_down: 'Anota la frase semilla',
    keep_it_safe: 'Mantenla a salvo',
    do_not_lose_it: 'No la pierdas',
    have_saved: 'He guardado mi frase semilla en un lugar seguro.',

    // Restore page
    restore_notice: 'Porfavor escribe la frase semilla para restaurar el monedero.',
    restore_warning: 'La frase semilla que has introducido no es válida. Las palabras deben estar escritas correctamente y no deben contener mayúsculas.',
    restoring: 'Restaurando...',

    // Wallet home
    refresh: 'Actualizar',
    overview: 'Resumen',
    send: 'Enviar',
    receive: 'Recibir',
    settings: 'Configuración',
    amount_to_send: 'Cantidad a enviar',
    not_enough_balance: 'No hay saldo suficiente para enviar esa cantidad',
    send_max: 'Enviar el máximo',
    amount: 'Cantidad',
    miner_fee: 'Comisión',
    total: 'Total',
    confirmation: 'Confirmación',
    they_receive: 'Reciben',
    recepient: 'Destinatario',
    sending: 'Enviando...',
    are_you_sure: '¿Estás seguro que quieres enviar esta transacción?',
    im_sure: "Estoy seguro, enviar",
    seed_modal: 'Frase Semilla',
    transaction: 'transacción',
    transactions: 'transacciones',
    buy_bitcoin: 'Comprar Bitcoin',

    // Pagination
    page: 'Página', // Displayed as 'Page 1 of 1'
    of: 'de',

    // Overview
    total_balance: "Total Balance",
    no_transactions: "Todavía no has hecho ninguna transacción",
    what_to_do: "¿Qué te gustaría hacer?",
    date: 'Fecha',
    status: 'Estado',
    processing: 'Procesando',
    unconfirmed: 'Sin confirmar',
    complete: 'Completado',

    // Send
    send_to: 'Enviar solo a direcciones de Bitcoin (BTC)',
    bitcoin_address: 'Dirección de Bitcoin',
    address: 'Dirección',
    low_priority: 'Prioridad baja',
    standard: 'Estándar',
    important: 'Importante',
    low_priority_desc: "Pagas menos comisiones pero considerando que esta es una transacción de baja prioridad y no te importa esperar más tiempo para su confirmación.",
    standard_desc: "Se usará una comisión moderada aunque en momentos de gran congestión esto puede comportar un tiempo de confirmación más largo (ocurre pocas veces)",
    important_desc: "Se usará una comisión premium para asegurar la confirmación en menos de 30 minutos, esta es una transacción de alta prioridad para cuando se desea una confirmación rápida.",
    not_enough: "No tienes saldo suficiente para enviar esta cantidad y pagar la comisión de red. Para enviar todo el saldo disponible intenta usar el botón (Enviar el máximo).",
    dust_error: "La cantidad que intentas enviar es demasiado pequeña para que la red Bitcoin pueda procesarla.",
    bitcoin_network_fee: "Comisión de red",

    // Receive
    receive_only: 'Recibir solo Bitcoin',
    wallet_address: 'Dirección del monedero',
    address_below: 'a la siguiente dirección',

    // Settings
    show_seed: 'Recuperación',
    language: 'Idioma',
    currency: 'Moneda',
    exit_wallet: 'Salir del monedero',

    // Buttons
    back_button: 'Atrás',
    restore_button: 'Restaurar',
    next_button: 'Siguiente',
    ok_button: 'OK',
    copy_button: 'Copiar',
    save_button: 'Guardar',

    // Notification
    notification_title: 'Transacción Entrante',

    // Exit wallet
    exit_text: 'Esto eliminará los archivos del monedero y todos los registros de tus transacciones. La única forma de recuperar tu monedera será usando la frase semilla.',
    exit_are_you_sure: '¿Estás seguro que quieres eliminar y salir de este monedero?',
    exit_label_text: 'Sí, eliminar este monedero',
    exit_delete: 'Eliminar'
}

export default es
