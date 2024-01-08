const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser'); // Importe o body-parser

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json()); // Use o body-parser para lidar com dados JSON

// Rota para a página inicial (login.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/obter-perfil', (req, res) => {
  fs.readFile('public/json/perfil.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Erro ao ler o arquivo:', err);
          res.status(500).send('Erro ao obter o perfil.');
          return;
      }
      res.status(200).send(data);
  });
});

// Rota para atualizar o perfil do usuário
app.post('/salvar-perfil', (req, res) => {
    const jsonData = JSON.stringify(req.body); // Obtenha os dados do corpo da requisição
    fs.writeFile('public/json/perfil.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo:', err);
            res.status(500).send('Erro ao salvar o perfil.');
            return;
        }
        res.status(200).send('Perfil salvo com sucesso!'+JSON.stringify(req.body));
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
