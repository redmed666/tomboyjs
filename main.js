const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');
const {ipcMain} = require('electron');
let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height:600});
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: "file:",
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });

    win.on('window-all-closed', () => {
        globalShortcut.unregisterAll();
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
};



app.on('ready', createWindow);