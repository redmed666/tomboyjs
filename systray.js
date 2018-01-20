const {remote} = require('electron');
const {Tray, Menu} = remote;

let trayIcon = new Tray(path.join('','./resources/cat.png'));

const trayMenuTemplate = [];

let trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);