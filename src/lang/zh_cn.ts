/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

const zh_cn = <Language> {
    // Initial page
    getting_started: '快速开始',
    create_new: '创建新的钱包',
    create_subtext: "我们将为你创建一个新的钱包，然后便可以开始使用比特币。",
    restore_existing: '恢复已有钱包',
    restore_subtext: "你已经有一个钱包，想要使用你的助记词来恢复它。",
    change_language: '切换语言',
    choose_language: '选择语言',

    // Create page
    seed_phrase: "助记词",
    wrote_it_down: '我已写下',
    generate: '生成',
    warning: '警告',
    we_will_generate: '我们将为你生成 12 个助记词。',
    warning_text_1: "以正确的顺序写下单词，并确保它们离线安全。 如果你丢失这些单词，则将无法访问你的比特币。",
    warning_text_2: "这些助记词可让你恢复钱包，写下单词使其安全并离线。",
    write_it_down: '抄写下来',
    keep_it_safe: '确保安全',
    do_not_lose_it: '不要丢失',
    have_saved: '我已经安全保存助记词',

    // Restore page
    restore_notice: '请输入你的助记词以恢复你的钱包。',
    restore_warning: '你输入的助记词无效。单词必须拼写正确，并且没有大写字母。',
    restoring: '恢复中...',

    // Wallet home
    refresh: '刷新',
    overview: '概览',
    send: '发送',
    receive: '接收',
    settings: '设置',
    amount_to_send: '发送数额',
    not_enough_balance: '余额不足，无法发送该金额',
    send_max: '最多发送',
    amount: '数额',
    miner_fee: '矿工费',
    total: '总计',
    confirmation: '确认',
    they_receive: '他们收到',
    recepient: '接收者',
    sending: '发送中...',
    are_you_sure: '你确定要发送此交易吗？',
    im_sure: "是的，确定发送",
    seed_modal: '助记词',
    transaction: '交易',
    transactions: '交易',
    buy_bitcoin: '购买比特币',

    // Pagination
    page: '', // Displayed as 'Page 1 of 1'
    of: '/',

    // Overview
    total_balance: "总余额",
    no_transactions: "你尚未进行任何交易",
    what_to_do: "想做点什么？",
    date: '日期',
    status: '状态',
    processing: '处理中',
    unconfirmed: '未确认',
    complete: '完成',

    // Send
    send_to: '仅发送到比特币（BTC）地址',
    bitcoin_address: '比特币地址',
    address: '地址',
    low_priority: '低优先',
    standard: '标准',
    important: '重要',
    low_priority_desc: "支付较少的费用，你认为这是低优先级的交易并且你不介意等待较长的时间来确认交易。",
    standard_desc: "将使用适度的费用，在高度拥塞情况期间，这可能会导致更长的确认时间，但很少见。",
    important_desc: "使用额外较高的费用在 30 分钟内确认，这是一个高优先级交易，你想要快速确认。",
    not_enough: "你没有足够的金额来发送和支付该笔款项与矿工费。尝试使用‘最多发送’按钮发送全部余额。",
    dust_error: "你尝试发送的金额太小，比特币网络无法处理。",
    bitcoin_network_fee: "比特币网络费",

    // Receive
    receive_only: '仅接收比特币',
    wallet_address: '钱包地址',
    address_below: '发送到以下地址',

    // Settings
    show_seed: '恢复',
    language: '语言',
    currency: '货币',
    exit_wallet: '退出钱包',

    // Buttons
    back_button: '返回',
    restore_button: '恢复',
    next_button: '下一步',
    ok_button: '确定',
    copy_button: '拷贝',
    save_button: '保存',

    // Notification
    notification_title: '交易收入',

    // Exit wallet
    exit_text: '这将销毁你的钱包文件和所有交易记录，恢复钱包的唯一方法是通过助记词',
    exit_are_you_sure: '你确定要删除并退出此钱包吗？',
    exit_label_text: '是的, 删除此钱包',
    exit_delete: '删除'
}

export default zh_cn
