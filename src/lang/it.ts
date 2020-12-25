/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var it = <Language> {
    // Initial page
    getting_started: 'Iniziare',
    create_new: 'Crea un nuovo wallet',
    create_subtext: "Creeremo un nuovo wallet per te così potrai iniziare ad usare Bitcoin.",
    restore_existing: 'Ripristina un wallet già esistente',
    restore_subtext: "Hai già un wallet e vuoi utilizzare le tue parole di recupero per ripristinarlo.",
    change_language: 'Cambia linguaggio',
    choose_language: 'Scegli Linguaggio',

    // Create page
    seed_phrase: "Parole di Recupero",
    wrote_it_down: 'Le ho annotate',
    generate: 'Genera',
    warning: 'Attenzione',
    we_will_generate: 'Genereremo per te 12 parole di recupero.',
    warning_text_1: "Annota le parole nell'ordine corretto e tienile al sicuro, offline. Se perdi queste parole, non potrai più accedere ai tuoi Bitcoin.",
    warning_text_2: "Queste parole di recupero ti consentiranno di ripristinare il tuo wallet. Annota le parole e tienile al sicuro, offline.",
    write_it_down: 'Annotale',
    keep_it_safe: 'Tienile al sicuro',
    do_not_lose_it: 'Non perderle',
    have_saved: 'Ho salvato le mie parole di recupero in sicurezza.',

    // Restore page
    restore_notice: 'Per favore inserisci le tue parole di recupero per ripristinare il tuo wallet.',
    restore_warning: 'Le parole di recupero che hai inserito non sono valide. Le parole devono essere scritte senza errori e non devono avere lettere maiuscole.',
    restoring: 'Ripristinando...',

    // Wallet home
    refresh: 'Ricarica',
    overview: 'Panoramica',
    send: 'Invia',
    receive: 'Ricevi',
    settings: 'Impostazioni',
    amount_to_send: 'Quantità da inviare',
    not_enough_balance: 'Saldo insufficiente per inviare questo importo',
    send_max: 'Invia tutto',
    amount: 'Quantità',
    miner_fee: 'Commissione di rete',
    total: 'Totale',
    confirmation: 'Conferme',
    they_receive: 'Loro ricevono',
    recepient: 'Destinatario',
    sending: 'Inviando...',
    are_you_sure: 'Sei sicuro di voler inviare questa transazione?',
    im_sure: "Si sono sicuro, invia",
    seed_modal: 'Parole di Recupero',
    transaction: 'transazione',
    transactions: 'transazioni',
    buy_bitcoin: 'Compra Bitcoin',

    // Pagination
    page: 'Pagina', // Displayed as 'Page 1 of 1'
    of: 'di',

    // Overview
    total_balance: "Saldo Totale",
    no_transactions: "Non hai ancora fatto nessuna transazione",
    what_to_do: "Cosa vorresti fare?",
    date: 'Data',
    status: 'Stato',
    processing: 'In lavorazione',
    unconfirmed: 'Non confermato',
    complete: 'Completato',

    // Send
    send_to: 'Inviare solo ad indirizzi Bitcoin (BTC)',
    bitcoin_address: 'Indirizzo Bitcoin',
    address: 'Indirizzo',
    low_priority: 'Bassa priorità',
    standard: 'Standard',
    important: 'Urgente',
    low_priority_desc: "Paghi meno in commissioni, ma la consideri una transazione a bassa priorità e quindi non ti dispiace aspettare più a lungo per la conferma.",
    standard_desc: "Con questo pagherai una commissione moderata, durante i periodi di alta congestione ciò potrebbe portare a tempi di conferma più lunghi, ma questi sono eventi rari.",
    important_desc: "Utilizza una tariffa premium per ottenere la conferma entro 30 minuti, questa è una transazione ad alta priorità e desideri che venga confermata rapidamente.",
    not_enough: "Non hai abbastanza fondi per inviare tale importo e pagare anche la commissione di rete. Prova invece ad inviare l'intero saldo con il pulsante Invia Tutto.",
    dust_error: "L'importo che stai tentando di inviare è troppo piccolo per essere elaborato dalla rete Bitcoin.",
    bitcoin_network_fee: "Commissione di Rete Bitcoin",

    // Receive
    receive_only: 'Ricevi solo Bitcoin',
    wallet_address: 'Indirizzo del wallet',
    address_below: 'all’indirizzo sotto',

    // Settings
    show_seed: 'Recupero',
    language: 'Linguaggio',
    currency: 'Valuta',
    exit_wallet: 'Esci dal wallet',

    // Buttons
    back_button: 'Indietro',
    restore_button: 'Ripristina',
    next_button: 'Avanti',
    ok_button: 'OK',
    copy_button: 'Copia',
    save_button: 'Salva',

    // Notification
    notification_title: 'Transazione in arrivo',

    // Exit wallet
    exit_text: 'Questo distruggerà i file del tuo portafoglio e tutti i record delle tue transazioni. Il solo modo per ripristinare il tuo portafoglio sarà tramite le tue parole di recupero',
    exit_are_you_sure: 'Sei sicuro di voler eliminare ed uscire da questo wallet?',
    exit_label_text: 'Si, elimina questo wallet',
    exit_delete: 'Elimina'
}

export default it
