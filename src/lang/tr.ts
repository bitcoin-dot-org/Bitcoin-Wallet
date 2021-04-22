/* eslint-disable no-unused-vars */

import Language from '@/lang/langInterface'

/* eslint-enable no-unused-vars */

var tr = <Language> {
    // Initial page
    getting_started: 'Başlarken',
    create_new: 'Yeni cüzdan oluştur',
    create_subtext: "Bitcoin kullanmaya başlayabilmeniz için sizin için yeni bir cüzdan oluşturacağız.",
    restore_existing: 'Mevcut cüzdanı geri yükle',
    restore_subtext: "Zaten bir cüzdanınız var ve onu geri yüklemek için kurtarma sözcüklerinizi kullanmak istiyorsunuz.",
    change_language: 'Dili Değiştir',
    choose_language: 'Dili Seç',

    // Create page
    seed_phrase: "Kurtarma Sözcükleri",
    wrote_it_down: 'Yazdım',
    generate: 'Oluştur',
    warning: 'Uyarı',
    we_will_generate: 'Sizin için 12 kurtarma kelimesi oluşturacağız.',
    warning_text_1: "Sözcükleri doğru sırayla yazın ve onları çevrimdışı olarak güvende tutun. Bu sözcükler kaybederseniz, Bitcoin'lerinize erişemezsiniz.",
    warning_text_2: "Bu kurtarma sözcükleri cüzdanınızı kurtarmanıza izin verecektir. Kelimeleri not edin ve onları çevrimdışı olarak güvende tutun.",
    write_it_down: 'Bir yere yaz',
    keep_it_safe: 'Güvende tut',
    do_not_lose_it: 'Asla kaybetme',
    have_saved: 'Kurtarma sözcüklerini güvenli bir şekilde kaydettim.',

    // Restore page
    restore_notice: 'Cüzdanınızı geri yüklemek için lütfen kurtarma sözcüklerinizi girin.',
    restore_warning: 'Girdiğiniz kurtarma kelimeleri geçersiz. Kelimeler doğru yazılmalı ve büyük harf içermemelidir.',
    restoring: 'Yükleniyor',

    // Wallet home
    refresh: 'Yenile',
    overview: 'Genel Bakış',
    send: 'Gönder',
    receive: 'Al',
    settings: 'Ayarlar',
    amount_to_send: 'Gönderilecek tutar',
    not_enough_balance: 'Bu miktarı göndermek için yeterli bakiye yok',
    send_max: 'Tümünü gönder',
    amount: 'Miktar',
    miner_fee: 'Ağ ücreti',
    total: 'Toplam',
    confirmation: 'Onayla',
    they_receive: 'Alır',
    recepient: 'Alıcı',
    sending: 'Gönderiliyor...',
    are_you_sure: 'Bu işlemi göndermek istediğinize emin misiniz?',
    im_sure: "Evet eminim, gönder",
    seed_modal: 'Kurtarma Sözcükleri',
    transaction: 'işlem',
    transactions: 'işlemler',
    buy_bitcoin: 'Bitcoin Satın Al',

    // Pagination
    page: 'Sayfa', // Displayed as 'Page 1 of 1'
    of: 'de',

    // Overview
    total_balance: "Toplam Bakiye",
    no_transactions: "Henüz herhangi bir işlem yapmadınız",
    what_to_do: "Ne yapmak istersiniz?",
    date: 'Tarih',
    status: 'Durum',
    processing: 'İşleme',
    unconfirmed: 'Onaylanmamış',
    complete: 'Tamamla',

    // Send
    send_to: 'Yalnızce Bitcoin (BTC) adreslerine gönder',
    bitcoin_address: 'Bitcoin adresi',
    address: 'Adres',
    low_priority: 'Düşük öncelikli',
    standard: 'Standart',
    important: 'Önemli',
    low_priority_desc: "Daha az ücret ödersiniz, ancak bunun düşük öncelikli bir işlem olduğunu ve onay için daha uzun süre bekleyebilirsiniz.",
    standard_desc: "Makul bir ücret ödersiniz, yüksek yoğunluklu zamanlarda onay süresi uzun sürebilir ancak bu nadirdir.",
    important_desc: "30 Dakika içinde onaylamayı hedeflemek için yüksek ücret ödersiniz, bu yüksek öncelikli bir işlemdir ve hızlı bir şekilde onaylama istediğiniz için seçersiniz.",
    not_enough: "Bu miktarı göndermek ve ayrıca ağ ücretini ödemek için bakiyeniz yok. Bunun yerine Tümünü Gönder butonuyla tüm bakiyenizi göndermeyi deneyin.",
    dust_error: "Göndermeye çalıştığınız miktar Bitcoin ağının işlemesi için çok küçük.",
    bitcoin_network_fee: "Bitcoin Ağ Ücreti",

    // Receive
    receive_only: 'Sadece Bitcoin al',
    wallet_address: 'Cüzdan Adresi',
    address_below: 'aşağıdaki adresi',

    // Settings
    show_seed: 'Kurtarma Sözcükleri',
    language: 'Dil',
    currency: 'Para Birimi',
    exit_wallet: 'Cüzdandan Çık',

    // Buttons
    back_button: 'Geri',
    restore_button: 'Geri Yükle',
    next_button: 'İleri',
    ok_button: 'Tamam',
    copy_button: 'Kopyala',
    save_button: 'Kayıt Et',

    // Notification
    notification_title: 'Gelen İşlem',

    // Exit wallet
    exit_text: 'Cüzdan dosyalarınızı ve işlemlerinizin tüm kayıtları imha edilecek. Cüzdanınızı geri yüklemek için kurtarma sözcüklerini kullanmalısınız',
    exit_are_you_sure: 'Cüzdanı silmek ve çıkmak istediğinize emin misiniz?',
    exit_label_text: 'Evet, bu cüzdanı sil',
    exit_delete: 'Sil'
}

export default tr
