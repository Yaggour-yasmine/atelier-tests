// Envoi d'e-mail simulé : en vrai, on appellerait un service SMTP.
// Dans les tests unitaires, ce module sera remplacé par un mock.
function envoyerConfirmation(email, total) {
  console.log(`E-mail envoyé à ${email} : commande de ${total} €`);
  return true;
}

module.exports = { envoyerConfirmation };
