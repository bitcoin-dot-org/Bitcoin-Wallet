/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var es = <Language> {
    // Initial page
    getting_started: 'Empezando',
    create_new: 'Crear nueva billetera',
    to_start: 'para empezar a usar Bitcoin',
    or: 'o',
    restore_existing: 'restaurar billetera existente',
    something_wrong: 'Algo salió mal con la conexión',
    try_again: 'Inténtalo de nuevo',

    // Create page
    generate_notice: "Generaremos para usted una frase inicial de 12 palabras. Es muy importante que anote cada palabra en el orden correcto y la guarde de forma segura.",
    wrote_it_down: 'Lo escribí',
    generate: 'Generar',

    // Restore page
    restore_notice: 'Ingrese su frase inicial de 12 palabras para restaurar su billetera',

    // Wallet home
    refresh: 'Actualizar',
    overview: 'Visión de conjunto',
    send: 'Enviar',
    receive: 'Recibir',
    settings: 'Configuraciones',
    amount_to_send: 'Cantidad a enviar',
    not_enough_balance: 'No hay saldo suficiente para enviar esa cantidad',
    send_max: 'Enviar máximo',
    amount: 'Cantidad',
    miner_fee: 'Tarifa de minero',
    total: 'Total',
    confirmation: 'Confirmación',
    sending: 'Estas enviando',
    to: 'a',
    im_sure: "Estoy segura enviar",
    seed_modal: 'Frase semilla',

    // Overview
    no_transactions: "Lamentablemente, aún no tiene ninguna transacción",
    block_height: 'Altura del bloque',
    status: 'Estado',
    processing: 'Procesando',
    unconfirmed: 'Inconfirmado',
    complete: 'Completo',

    // Send
    address: 'Habla a',
    enter_address: 'Ingrese la dirección a enviar también y el monto:',
    low_priority: 'Baja prioridad',
    standard: 'Estándar',
    important: 'Importante',
    low_priority_desc: "Paga menos tarifas, pero considera que esta es una transacción de baja prioridad y no le importa esperar más tiempo para la confirmación.",
    standard_desc: "Esto usará una tarifa moderada, en momentos de gran congestión, esto puede llevar a un tiempo de confirmación más largo, pero estos son raros.",
    important_desc: "Utiliza una tarifa premium para orientar la confirmación dentro de los 30 minutos, esta es una transacción de alta prioridad y desea que se confirme rápidamente.",
    not_enough: "No tiene suficiente para enviar la cantidad especificada y al mismo tiempo paga la tarifa del minero. Prueba 'Enviar Max'.",
    dust_error: "Cantidad demasiado pequeña para enviar",

    // Receive
    receive_only: 'Reciba solo Bitcoin',
    address_below: 'a la siguiente dirección',

    // Settings
    show_seed: 'Mostrar frase inicial',
    language: 'Idioma',
    currency: 'Moneda',
    exit_wallet: 'Salir de billetera',

    // Buttons
    back_button: 'Espalda',
    restore_button: 'Restaurar',
    next_button: 'Próximo',
    ok_button: 'Bueno',
    copy_button: 'Copiar'
}

export default es