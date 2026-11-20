const crypto = require('crypto');

// Génère un jeton de réinitialisation de mot de passe
function genererToken() {
  return crypto.randomBytes(16).toString('hex');
}

function classer(note) {
  if (note === 20) return 'parfait';
  if (note >= 10) return 'admis';
  return 'refusé';
}

module.exports = { genererToken, classer };