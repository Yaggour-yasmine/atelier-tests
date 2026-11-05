const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/users', async (req, res) => {
  const resultat = await db.query('SELECT id, nom, email FROM users ORDER BY id');
  res.json(resultat.rows);
});

app.post('/users', async (req, res) => {
  const { nom, email } = req.body || {};
  if (!nom || !email) {
    return res.status(400).json({ erreur: 'nom et email requis' });
  }
  try {
    const resultat = await db.query(
      'INSERT INTO users (nom, email) VALUES ($1, $2) RETURNING id, nom, email',
      [nom, email]
    );
    res.status(201).json(resultat.rows[0]);
  } catch (e) {
    if (e.code === '23505') {
      return res.status(409).json({ erreur: 'email déjà utilisé' });
    }
    res.status(500).json({ erreur: 'erreur serveur' });
  }
});

module.exports = app;
