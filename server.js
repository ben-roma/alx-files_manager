// server.js
import express from 'express';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

// Middleware pour parser les données JSON
app.use(express.json());

// Charger les routes
app.use('/', routes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
