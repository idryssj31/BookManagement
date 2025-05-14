const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Sert les fichiers statiques depuis le dossier 'public'

app.get('/api/books', (req, res) => {
  res.json([
    { id: 1, title: 'Livre 1' },
    { id: 2, title: 'Livre 2' }
  ]);
});

app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil !');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});