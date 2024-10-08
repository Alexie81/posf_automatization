// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray } = require('electron');
const path = require('node:path');
const electron = require('electron');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const iconPath = path.join(__dirname, "/logo.png");

const createWindow = () => {
  // Create the browser window.
  const {width,height} = electron.screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    autoHideMenuBar: true,
    title: 'ANRE - POSF',
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
    preload: path.join(__dirname, 'preload.js')
  }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('public/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.