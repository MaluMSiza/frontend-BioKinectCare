const { app, BrowserWindow } = require('electron');
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

// Adicione outras rotas aqui conforme necessário
// res.writeHead(200, {'Content-Type': 'text/html'});
// fs.readFile('calibrar.html', 'utf8', (err, data) => {
//   if (err) {
//     res.end('Error loading HTML file.');
//     return;
//   }
//   res.end(data);
// });

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true // Habilita a integração com Node.js no contexto da página web
    }
  });

  mainWindow.loadURL('http://localhost:' + PORT);
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
