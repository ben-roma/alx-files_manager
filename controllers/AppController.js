// controllers/AppController.js

import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
    // Retourne l'état de Redis et MongoDB
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  static async getStats(req, res) {
    try {
      // Compte le nombre d'utilisateurs et de fichiers dans la base de données
      const users = await dbClient.nbUsers();
      const files = await dbClient.nbFiles();

      res.status(200).json({
        users,
        files,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default AppController;
