const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/db');

beforeAll(async () => {
  await db.init();
});

beforeEach(async () => {
  await db.query('TRUNCATE users RESTART IDENTITY');
});

afterAll(async () => {
  await db.close();
});

describe('API /users (avec une vraie base PostgreSQL)', () => {
  test('GET /users renvoie une liste vide au départ', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /users crée un utilisateur', async () => {
    const res = await request(app)
      .post('/users')
      .send({ nom: 'Yasmine', email: 'yasmine@exemple.com' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      nom: 'Yasmine',
      email: 'yasmine@exemple.com',
    });
  });

  test("GET /users renvoie l'utilisateur créé", async () => {
    await request(app)
      .post('/users')
      .send({ nom: 'Yasmine', email: 'yasmine@exemple.com' });

    const res = await request(app).get('/users');
    expect(res.body).toHaveLength(1);
    expect(res.body[0].email).toBe('yasmine@exemple.com');
  });

  test('POST /users refuse un corps incomplet', async () => {
    const res = await request(app).post('/users').send({ nom: 'Sans email' });
    expect(res.status).toBe(400);
  });

  test('POST /users refuse un email déjà utilisé', async () => {
    const utilisateur = { nom: 'Yasmine', email: 'yasmine@exemple.com' };
    await request(app).post('/users').send(utilisateur);

    const res = await request(app).post('/users').send(utilisateur);
    expect(res.status).toBe(409);
  });
});
