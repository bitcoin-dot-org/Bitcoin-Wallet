module.exports = {
    pluginOptions: {
      nodeIntegration: true,
      electronBuilder: {
        preload: 'src/preload.js',
        builderOptions: {
          "productName": "Bitcoin Wallet",
          "appId": "org.bitcoin.wallet",
          "afterSign": "./src/afterSignHook.js",
          "mac": {
            "icon": "./build/icon.png",
            "category": "public.app-category.finance",
            "hardenedRuntime": true,
            "entitlements": "./build/entitlements.mac.inherit.plist",
            "target": ["dmg", "zip"]
          },
          "win": {
            "icon" : "./build/icon.ico",
            "target": "nsis",
          }
        }
      }
    }
  }