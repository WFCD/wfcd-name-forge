import { app, BrowserWindow, ipcMain, shell } from 'electron';
import squirrelStartup from 'electron-squirrel-startup';
import * as remote from '@electron/remote/main/index.js';
import Generator from 'warframe-name-generator';

if (squirrelStartup) {
  app.quit();
}

remote.initialize();

const generator = new Generator();
ipcMain.handle('generate-name', (_event, opts) => generator.make(opts));

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 535,
    frame: false,
    roundedCorners: false,
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
    return { action: 'deny' };
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
