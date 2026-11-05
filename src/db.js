const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || 'postgres://test:test@localhost:5433/atelier',
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nom TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);
}

module.exports = {
  query: (texte, params) => pool.query(texte, params),
  init,
  close: () => pool.end(),
};