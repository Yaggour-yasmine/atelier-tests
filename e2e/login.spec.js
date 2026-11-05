const { test, expect } = require('@playwright/test');

test.describe('Page de connexion', () => {
  test('connexion réussie : redirige vers le tableau de bord', async ({ page }) => {
    await page.goto('/login.html');

    await page.getByLabel('Email').fill('admin@exemple.com');
    await page.getByLabel('Mot de passe').fill('secret123');
    await page.getByRole('button', { name: 'Se connecter' }).click();

    await expect(page).toHaveURL(/dashboard\.html/);
    await expect(page.getByRole('heading', { name: 'Tableau de bord' })).toBeVisible();
    await expect(page.getByText('Bienvenue, admin@exemple.com')).toBeVisible();
  });

  test('mauvais mot de passe : affiche une erreur et reste sur la page', async ({ page }) => {
    await page.goto('/login.html');

    await page.getByLabel('Email').fill('admin@exemple.com');
    await page.getByLabel('Mot de passe').fill('mauvais');
    await page.getByRole('button', { name: 'Se connecter' }).click();

    await expect(page.getByRole('alert')).toHaveText('Identifiants incorrects');
    await expect(page).toHaveURL(/login\.html/);
  });

  test('déconnexion : retour à la page de connexion', async ({ page }) => {
    await page.goto('/login.html');
    await page.getByLabel('Email').fill('admin@exemple.com');
    await page.getByLabel('Mot de passe').fill('secret123');
    await page.getByRole('button', { name: 'Se connecter' }).click();
    await expect(page).toHaveURL(/dashboard\.html/);

    await page.getByRole('button', { name: 'Se déconnecter' }).click();
    await expect(page).toHaveURL(/login\.html/);
  });

  test('le tableau de bord est inaccessible sans connexion', async ({ page }) => {
    await page.goto('/dashboard.html');
    await expect(page).toHaveURL(/login\.html/);
  });
});
