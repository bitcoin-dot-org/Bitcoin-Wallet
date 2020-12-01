/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var ca = <Language> {
    // Initial page
    getting_started: 'Començant',
    create_new: 'Crear un nou moneder',
    create_subtext: "Crearem un nou moneder perquè puguis començar a utilitzar Bitcoin.",
    restore_existing: 'Restaurar moneder existent',
    restore_subtext: "Ja tens un moneder i vols utilitzar les paraules de seguretat per restaurar-lo.",
    change_language: 'Canviar idioma',
    choose_language: 'Escollir idioma',

    // Create page
    seed_phrase: "Llavor (paraules de seguretat)",
    wrote_it_down: "L’he guardat",
    generate: 'Generar',
    warning: 'Advertència',
    we_will_generate: 'Es generaran 12 paraules de seguretat.',
    warning_text_1: "Escriu les paraules en l'ordre correcte i guarda-les en un lloc segur (offline). Si perds aquestes paraules, no podrás accedir al teu Bitcoin.",
    warning_text_2: "Aquestes paraules de seguretat et permetran recuperar el moneder. Escriu-les en un lloc segur (offline).",
    write_it_down: 'Anota la llavor',
    keep_it_safe: 'Guarda-la en un lloc segur',
    do_not_lose_it: 'No la perdis',
    have_saved: 'He guardat les paraules de seguretat en un lloc segur.',

    // Restore page
    restore_notice: 'Escriu les paraules de seguretat per restaurar el teu moneder.',
    restore_warning: "Les paraules de seguretat que has introduit no són vàlides. Les paraules han d'estar escrites correctament i no han de contenir majúscules.",
    restoring: 'Restaurant...',

    // Wallet home
    refresh: 'Actualitzar',
    overview: 'Resum',
    send: 'Enviar',
    receive: 'Rebre',
    settings: 'Configuració',
    amount_to_send: 'Quantitat a enviar',
    not_enough_balance: 'No hi ha suficients fons per enviar aquesta quantitat',
    send_max: 'Enviar el màxim',
    amount: 'Quantitat',
    miner_fee: 'Comissió',
    total: 'Total',
    confirmation: 'Confirmació',
    sending: 'Enviant...',
    im_sure: "Estic segur, enviar",
    seed_modal: 'Llavor',
    transaction: 'transacció',
    transactions: 'transaccions',
    buy_bitcoin: 'Comprar Bitcoin',

    // Pagination
    page: 'Pàgina', // Displayed as 'Page 1 of 1'
    of: 'de',

    // Overview

    total_balance: "Fons",
    no_transactions: "Encara no has fet cap transacció",
    what_to_do: "Què t'agradaria fer?",
    date: 'Data',
    status: 'Estat',
    processing: 'Processant',
    unconfirmed: 'Sense confirmar',
    complete: 'Completat',

    // Send
    send_to: 'Enviar només a direccions de Bitcoin (BTC)',
    bitcoin_address: 'Adreça de Bitcoin',
    address: 'Adreça',
    low_priority: 'Prioritat baixa',
    standard: 'Estàndard',
    important: 'Important',
    low_priority_desc: "Pagues menys comissions però considerant que aquesta transacció és de baixa prioritat i no et fa res esperar més temps a la confirmació.",
    standard_desc: "S'utilitzarà una comissió moderada tot i que en moments de gran congestió això pot comportar un temps de confirmació més llarg (passa poques vegades)",
    important_desc: "S'utilitzarà una comissió premium per assegurar una confirmació en menys de 30 minuts, aquesta és una transacció de prioritat alta per quan es necessita una confirmació ràpida.",
    not_enough: "No tens suficients fons per enviar la quantitat especificada i pagar la comissió dels miners. Prova amb l'opció 'Enviar el màxim'.",
    dust_error: "La quantitat que estàs intentant enviar és massa petita perquè la xarxa Bitcoin la pugui processar.",
    bitcoin_network_fee: "Comissió de xarxa",

    // Receive
    receive_only: 'Rebre només Bitcoin',
    wallet_address: 'Adreça del moneder',
    address_below: 'a la següent adreça',

    // Settings
    show_seed: 'Recuperar',
    language: 'Idioma',
    currency: 'Moneda',
    exit_wallet: 'Sortir del moneder',

    // Buttons
    back_button: 'Enrere',
    restore_button: 'Restaurar',
    next_button: 'Següent',
    ok_button: 'OK',
    copy_button: 'Copiar',
    save_button: 'Guardar',

    // Notification
    notification_title: 'Transacció Entrant',

    // Exit wallet
    exit_text: "Això destruirà els arxius del moneder i tots els registres de les teves transaccions. L'única forma de restaurar el teu moneder serà a través de les paraules de seguretat.",
    exit_are_you_sure: "Estàs segur que vols eliminar i sortir d'aquest moneder?",
    exit_label_text: 'Sí, eliminar aquest moneder',
    exit_delete: 'Eliminar',
}

export default ca
