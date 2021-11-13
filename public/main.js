const { app, BrowserWindow } = require('electron');
require('@electron/remote/main').initialize();

const fs = require('fs');
const path = require('path');
const idDev = require('electron-is-dev');
const iconPath = path.join(__dirname, '../build/barn.png');
function createWindow() {
  const win = new BrowserWindow({
    width: 1281,
    height: 800,
    minWidth: 1281,
    minHeight: 800,
    backgroundColor: '#312450',
    // show: false,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: true,
    },
  });
  // win.maximize();
  win.loadURL(
    idDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  // Follow OS convention on whether to quit app when
  // all windows are closed.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // If the app is still open, but no windows are open,
  // create one when the app comes into focus.
  if (BrowserWindow.getAllWindows().length === null) {
    createWindow();
  }
});
