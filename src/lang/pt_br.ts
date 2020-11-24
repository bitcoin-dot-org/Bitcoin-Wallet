/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var pt_br = <Language> {
    // Initial page
    getting_started: 'Introdução',
    create_new: 'Criar nova carteira',
    create_subtext: "Nós vamos criar uma nova carteira para que você possa começar a usar Bitcoins.",
    restore_existing: 'Recuperar carteira existente',
    restore_subtext: "Você já tem uma carteira e deseja usar suas palavras de recuperação para restaurá-la.",
    change_language: 'Mudar Idioma',
    choose_language: 'Escolher Idioma',

    // Create page
    seed_phrase: "Palavras de Recuperação",
    wrote_it_down: 'Eu anotei',
    generate: 'Gerar',
    warning: 'Aviso',
    we_will_generate: 'Nós vamos gerar 12 palavras de recuperação para você.',
    warning_text_1: "Escreva as palavras na ordem correta e mantenha-as seguras, offline. Se você perder essas palavras, não conseguirá acessar seus Bitcoins.",
    warning_text_2: "Essas palavras de recuperação permitirão que você recupere sua carteira. Escreva as palavras e mantenha-as seguras, offline.",
    write_it_down: 'Anote-as',
    keep_it_safe: 'Mantenha-as seguras',
    do_not_lose_it: 'Não as perca',
    have_saved: 'Guardei minhas palavras de recuperação com segurança.',

    // Restore page
    restore_notice: 'Por favor, digite suas palavras de recuperação para restaurar sua carteira.',
    restore_warning: 'As palavras de recuperação que você inseriu são inválidas. As palavras devem ser escritas corretamente e não devem ter letras maiúsculas.',
    restoring: 'Recuperando...',

    // Wallet home
    refresh: 'Recarregar',
    overview: 'Overview',
    send: 'Enviar',
    receive: 'Receber',
    settings: 'Opções',
    amount_to_send: 'Quantidade de envio',
    not_enough_balance: 'Não há saldo suficiente para enviar esse valor',
    send_max: 'Enviar tudo',
    amount: 'Quantia',
    miner_fee: 'Taxa de rede',
    total: 'Total',
    confirmation: 'Confirmação',
    they_receive: 'Eles recebem',
    recepient: 'Beneficiário',
    sending: 'Enviando...',
    are_you_sure: 'Tem certeza que deseja enviar esta transação?',
    im_sure: "Sim, tenho certeza, envie",
    seed_modal: 'Palavras de Recuperação',
    transaction: 'transação',
    transactions: 'transações',
    buy_bitcoin: 'Comprar Bitcoin',

    // Pagination
    page: 'Página', // Displayed as 'Page 1 of 1'
    of: 'de',

    // Overview
    total_balance: "Saldo Total",
    no_transactions: "Você ainda não fez nenhuma transação",
    what_to_do: "O que você gostaria de fazer?",
    date: 'Data',
    status: 'Status',
    processing: 'Processando',
    unconfirmed: 'Não confirmado',
    complete: 'Completo',

    // Send
    send_to: 'Envie apenas para endereços Bitcoin (BTC)',
    bitcoin_address: 'Endereço Bitcoin',
    address: 'Endereço',
    low_priority: 'Prioridade baixa',
    standard: 'Padrão',
    important: 'Importante',
    low_priority_desc: "Você paga menos em taxas, mas considera esta uma transação de baixa prioridade e não se importa em esperar mais tempo pela confirmação.",
    standard_desc: "Será cobrada uma taxa moderada. Durante períodos de alto congestionamento, isso pode levar a um tempo de confirmação mais longo, mas isso é raro.",
    important_desc: "Cobra uma taxa premium para obter confirmação em até 30 minutos. Esta é uma transação de alta prioridade e você deseja que ela seja confirmada rapidamente.",
    not_enough: "Você não tem o suficiente para enviar esse valor junto com a taxa de rede. Tente enviar todo o seu saldo com o botão Enviar tudo.",
    dust_error: "A quantia que você está tentando enviar é muito pequena para a rede Bitcoin processar.",
    bitcoin_network_fee: "Taxa de rede Bitcoin",

    // Receive
    receive_only: 'Receber apenas Bitcoin',
    wallet_address: 'Endereço da carteira',
    address_below: 'para o endereço abaixo',

    // Settings
    show_seed: 'Recuperação',
    language: 'Idioma',
    currency: 'Moeda',
    exit_wallet: 'Sair da carteira',

    // Buttons
    back_button: 'Voltar',
    restore_button: 'Recuperar',
    next_button: 'Próximo',
    ok_button: 'OK',
    copy_button: 'Copiar',
    save_button: 'Salvar',

    // Notification
    notification_title: 'Transação Recebida',

    // Exit wallet
    exit_text: 'Isso destruirá os arquivos da sua carteira e todos os registros de suas transações. A única maneira de restaurar sua carteira será por meio das palavras de recuperação',
    exit_are_you_sure: 'Tem certeza de que deseja excluir e sair desta carteira?',
    exit_label_text: 'Sim, exclua esta carteira',
    exit_delete: 'Excluir'
}

export default pt_br
