const { app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const expressApp = express();
const PORT = process.env.PORT || 3000;

expressApp.use(express.static('public'));
expressApp.use(bodyParser.json());

expressApp.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 900, 
    frame: true,
    backgroundColor: '#FFFFFF',
    icon: path.join(__dirname,'public','css','imgs', 'logoDesktop.png'),
    webPreferences: {
      nodeIntegration: true 
    }
  });
  mainWindow.loadURL('http://localhost:' + PORT);
  Menu.setApplicationMenu(null);
};

app.whenReady().then(() => {
  expressApp.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
