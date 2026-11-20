const { genererToken, classer } = require('../../src/utils');

describe('classer()', () => {
  test.each([
    [20, 'parfait'],
    [12, 'admis'],
    [10, 'admis'],
    [9, 'refusé'],
  ])('note %i donne %s', (note, attendu) => {
    expect(classer(note)).toBe(attendu);
  });
});

describe('genererToken()', () => {
  test('retourne 32 caractères hexadécimaux', () => {
    expect(genererToken()).toMatch(/^[0-9a-f]{32}$/);
  });

  test('deux appels donnent deux jetons différents', () => {
    expect(genererToken()).not.toBe(genererToken());
  });
});