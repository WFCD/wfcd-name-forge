// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, shell } = require('electron');

// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const remote = require('@electron/remote/main');

remote.initialize();

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 535,
    frame: false,
    resizable: false,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: true,
      enableBlinkFeatures: 'OverlayScrollbars',
      devTools: true,
      contextIsolation: false,
    },
  });
  remote.enable(mainWindow.webContents);

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools({ mode: 'undocked' });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
  });
  mainWindow.setMenu(null);
};

app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
