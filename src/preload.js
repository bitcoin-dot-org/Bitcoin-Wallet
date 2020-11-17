
window.ipcRenderer = require('electron').ipcRenderer

window.addEventListener('DOMContentLoaded', () => {
    if (process.platform !== 'darwin') {
        const customTitlebar = require("@treverix/custom-electron-titlebar")
        new customTitlebar.Titlebar({
            backgroundColor: customTitlebar.Color.fromHex('#090C14'),
            overflow: 'hidden',
            maximizable: false,
            icon: 'bitcoin.png',
        });
    }

})