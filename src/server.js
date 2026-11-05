const app = require('./app');
const db = require('./db');

db.init().then(() => {
  app.listen(3000, () => console.log('Serveur sur http://localhost:3000'));
});
