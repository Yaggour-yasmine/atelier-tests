const Panier = require('../../src/panier');
const mailer = require('../../src/mailer');
const { passerCommande } = require('../../src/commande');

// Le mailer est remplacé par un mock : aucun vrai e-mail n'est envoyé.
jest.mock('../../src/mailer');

describe('passerCommande', () => {
  let panier;

  beforeEach(() => {
    jest.clearAllMocks();
    panier = new Panier();
  });

  test('confirme la commande et envoie un e-mail', () => {
    panier.ajouter('Stylo', 2, 3);

    const resultat = passerCommande(panier, 'client@exemple.com');

    expect(resultat).toEqual({
      email: 'client@exemple.com',
      total: 6,
      statut: 'confirmée',
    });
    expect(mailer.envoyerConfirmation).toHaveBeenCalledTimes(1);
    expect(mailer.envoyerConfirmation).toHaveBeenCalledWith('client@exemple.com', 6);
  });

  test('vide le panier après la commande', () => {
    panier.ajouter('Stylo', 2);
    passerCommande(panier, 'client@exemple.com');
    expect(panier.nombreArticles()).toBe(0);
  });

  test('refuse un panier vide sans envoyer d\'e-mail', () => {
    expect(() => passerCommande(panier, 'client@exemple.com')).toThrow('Panier vide');
    expect(mailer.envoyerConfirmation).not.toHaveBeenCalled();
  });

  test('refuse un e-mail invalide sans envoyer d\'e-mail', () => {
    panier.ajouter('Stylo', 2);
    expect(() => passerCommande(panier, 'pas-un-email')).toThrow('Email invalide');
    expect(() => passerCommande(panier, '')).toThrow('Email invalide');
    expect(mailer.envoyerConfirmation).not.toHaveBeenCalled();
  });
});
