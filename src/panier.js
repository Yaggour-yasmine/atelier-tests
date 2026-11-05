class Panier {
  constructor() {
    this.articles = [];
  }

  ajouter(nom, prix, quantite = 1) {
    if (!nom || typeof nom !== 'string') {
      throw new Error('Nom invalide');
    }
    if (typeof prix !== 'number' || prix < 0) {
      throw new Error('Prix invalide');
    }
    if (!Number.isInteger(quantite) || quantite <= 0) {
      throw new Error('Quantité invalide');
    }

    const existant = this.articles.find((a) => a.nom === nom);
    if (existant) {
      existant.quantite += quantite;
    } else {
      this.articles.push({ nom, prix, quantite });
    }
  }

  retirer(nom) {
    const index = this.articles.findIndex((a) => a.nom === nom);
    if (index === -1) {
      throw new Error('Article introuvable');
    }
    this.articles.splice(index, 1);
  }

  total() {
    return this.articles.reduce((somme, a) => somme + a.prix * a.quantite, 0);
  }

  appliquerRemise(pourcentage) {
    if (typeof pourcentage !== 'number' || pourcentage < 0 || pourcentage > 100) {
      throw new Error('Remise invalide');
    }
    return this.total() * (1 - pourcentage / 100);
  }

  nombreArticles() {
    return this.articles.reduce((somme, a) => somme + a.quantite, 0);
  }

  vider() {
    this.articles = [];
  }
}

module.exports = Panier;
