// server.js

import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Charger toutes les routes depuis le fichier index.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
