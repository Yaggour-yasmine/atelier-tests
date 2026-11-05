const Panier = require('../../src/panier');

describe('Panier', () => {
  let panier;

  beforeEach(() => {
    panier = new Panier();
  });

  test('un panier neuf est vide', () => {
    expect(panier.nombreArticles()).toBe(0);
    expect(panier.total()).toBe(0);
  });

  test('ajoute un article', () => {
    panier.ajouter('Stylo', 2, 3);
    expect(panier.nombreArticles()).toBe(3);
    expect(panier.total()).toBe(6);
  });

  test("cumule la quantité si l'article existe déjà", () => {
    panier.ajouter('Stylo', 2);
    panier.ajouter('Stylo', 2, 2);
    expect(panier.articles).toHaveLength(1);
    expect(panier.nombreArticles()).toBe(3);
  });

  test('retire un article', () => {
    panier.ajouter('Stylo', 2);
    panier.retirer('Stylo');
    expect(panier.nombreArticles()).toBe(0);
  });

  test('retirer un article absent lève une erreur', () => {
    expect(() => panier.retirer('Inconnu')).toThrow('Article introuvable');
  });

  test('refuse un nom invalide', () => {
    expect(() => panier.ajouter('', 2)).toThrow('Nom invalide');
  });

  test('refuse un prix négatif', () => {
    expect(() => panier.ajouter('Stylo', -1)).toThrow('Prix invalide');
  });

  test('refuse une quantité invalide', () => {
    expect(() => panier.ajouter('Stylo', 2, 0)).toThrow('Quantité invalide');
    expect(() => panier.ajouter('Stylo', 2, 1.5)).toThrow('Quantité invalide');
  });

  test('applique une remise', () => {
    panier.ajouter('Stylo', 10, 2);
    expect(panier.appliquerRemise(10)).toBe(18);
  });

  test('refuse une remise invalide', () => {
    expect(() => panier.appliquerRemise(150)).toThrow('Remise invalide');
    expect(() => panier.appliquerRemise(-5)).toThrow('Remise invalide');
  });

  test('vide le panier', () => {
    panier.ajouter('Stylo', 2);
    panier.vider();
    expect(panier.nombreArticles()).toBe(0);
  });
});
