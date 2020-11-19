/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var fr = <Language> {
    // Initial page
    getting_started: 'Démarrer',
    create_new: 'Créer un nouveau portefeuille',
    create_subtext: "Pour que vous puissiez commencer à utiliser Bitcoin nous allons vous créer un nouveau portefeuille.",
    restore_existing: 'Restaurer un portefeuille existant.',
    restore_subtext: "Vous possedez déjà un portefeuille et souhaitez utiliser votre phrase de récupération pour le restaurer.",
    change_language: 'Changer de langue',
    choose_language: 'Choisir une langue',

    // Create page
    seed_phrase: "Phrase de récupération",
    wrote_it_down: 'Je l\'ai écrit',
    generate: 'Générer',
    warning: 'Attention',
    we_will_generate: 'Nous allons vous générer une phrase de récupération composée de 12 mots.',
    warning_text_1: "Écrivez les mots dans l'ordre et conservez les en sécurité, hors ligne. Si vous perdez ces mots, vous ne serez plus en mesure d'accéder à vos Bitcoins.",
    warning_text_2: "Cette phrase de récupération vous permettra de restaurer votre portefeuille. Écrivez les mots sur du papier et gardez le en sécurité, hors ligne.",
    write_it_down: 'Écrivez cette phrase',
    keep_it_safe: 'Protégez-la',
    do_not_lose_it: 'Ne la perdez pas',
    have_saved: 'J\'ai sauvegardé ma phrase de récupération en toute sécurité.',

    // Restore page
    restore_notice: 'Veuillez saisir votre phrase de récupération pour restaurer votre portefeuille.',
    restore_warning: 'La phrase de récupération que vous avez saisie n\'est pas valide. Les mots doivent être correctement orthographiés et sans majuscules.',
    restoring: 'Restauration...',

    // Wallet home
    refresh: 'Rafraîchir',
    overview: 'Aperçu',
    send: 'Envoyer',
    receive: 'Recevoir',
    settings: 'Réglages',
    amount_to_send: 'Montant à envoyer',
    not_enough_balance: 'Solde insuffisant pour envoyer ce montant',
    send_max: 'Envoyer au max',
    amount: 'Montant',
    miner_fee: 'Frais de réseau',
    total: 'Total',
    confirmation: 'Confirmation',
    they_receive: 'Ils reçoivent',
    recepient: 'Bénéficiaire',
    sending: 'Envoi en cours...',
    are_you_sure: 'Êtes-vous sûr de vouloir envoyer cette transaction?',
    im_sure: "J'en suis certain, envoyer",
    seed_modal: 'Phrase de récupération',
    transaction: 'transaction',
    transactions: 'transactions',
    buy_bitcoin: 'Acheter du Bitcoin',

    // Pagination
    page: 'Page', // Displayed as 'Page 1 of 1'
    of: 'sur',

    // Overview
    total_balance: "Balance totale",
    no_transactions: "Vous n'avez pas encore réalisé de transaction",
    what_to_do: "Que souhaitez-vous faire?",
    date: 'Date',
    status: 'Statut',
    processing: 'En cours de traitement',
    unconfirmed: 'Non-confirmé',
    complete: 'Complétée',

    // Send
    send_to: 'Envoyer seulement aux adresses Bitcoin (BTC)',
    bitcoin_address: 'Adresse Bitcoin',
    address: 'Adresse',
    low_priority: 'Priorité faible',
    standard: 'Standard',
    important: 'Important',
    low_priority_desc: "Vous payez moins de frais, mais vous considérez que la priorité de cette transaction est faible et vous ne vous préoccupez pas d'attendre plus longtemps qu'elle soit confirmée.",
    standard_desc: "Utiliser des frais modérés pendant une période de forte congestion peuvent entraîner un temps de confirmation plus long, mais c'est rare.",
    important_desc: "Utiliser des frais supplémentaires pour cibler une confirmation dans les 30 minutes, c'est une transaction dont la priorité élevée et vous souhaitez qu'elle soit confirmée rapidement.",
    not_enough: "Vous n'avez pas assez pour envoyer ce montant et payer les frais de réseau. Essayez plutôt d'envoyer votre solde entier avec le bouton Envoyer au max.",
    dust_error: "Le montant que vous essayez d'envoyer est trop petit pour être traité par le réseau Bitcoin.",
    bitcoin_network_fee: "Frais du réseau Bitcoin",

    // Receive
    receive_only: 'Réception uniquement',
    wallet_address: 'Adresse du portefeuille',
    address_below: 'À L\'adresse ci-dessous',

    // Settings
    show_seed: 'Restaurer',
    language: 'Langue',
    currency: 'Devise',
    exit_wallet: 'Quitter le portefeuille',

    // Buttons
    back_button: 'Retour',
    restore_button: 'Restaurer',
    next_button: 'Suivant',
    ok_button: 'OK',
    copy_button: 'Copier',
    save_button: 'Enregistrer',

    // Notification
    notification_title: 'Transaction entrante',

    // Exit wallet
    exit_text: 'Cela détruira les fichiers de votre portefeuille et tous les enregistrements de vos transactions. L\'unique façon de restaurer votre portefeuille nécessitera votre phrase de récupération',
    exit_are_you_sure: 'Souhaitez vous réellement supprimer et quitter ce portefeuille?',
    exit_label_text: 'Oui, supprimez ce portefeuille',
    exit_delete: 'Supprimer'
}

export default fr
