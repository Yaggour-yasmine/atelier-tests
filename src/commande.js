const mailer = require('./mailer');

function passerCommande(panier, email) {
  if (panier.nombreArticles() === 0) {
    throw new Error('Panier vide');
  }
  if (!email || !email.includes('@')) {
    throw new Error('Email invalide');
  }

  const total = panier.total();
  mailer.envoyerConfirmation(email, total);
  panier.vider();

  return { email, total, statut: 'confirmée' };
}

module.exports = { passerCommande };
