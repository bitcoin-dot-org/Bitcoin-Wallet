module.exports = {
    pluginOptions: {
      nodeIntegration: true,
      electronBuilder: {
        preload: 'src/preload.js',
        builderOptions: {
          "productName": "Bitcoin Wallet",
          "appId": "org.bitcoin.wallet"
        }
      }
    }
  }