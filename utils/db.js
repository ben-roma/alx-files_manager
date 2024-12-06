// utils/db.js

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}`;

    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    this.client.connect()
      .then(() => {
        console.log('MongoDB client connected');
        this.database = this.client.db(database); // Initialiser la base de données une fois connecté
      })
      .catch((err) => console.error('MongoDB connection error:', err));
  }

  isAlive() {
    return this.client && this.client.isConnected();
  }

  async nbUsers() {
    if (!this.isAlive()) {
      return 0;
    }
    try {
      const usersCollection = this.database.collection('users');
      return await usersCollection.countDocuments();
    } catch (error) {
      console.error('Error getting number of users:', error);
      return 0;
    }
  }

  async nbFiles() {
    if (!this.isAlive()) {
      return 0;
    }
    try {
      const filesCollection = this.database.collection('files');
      return await filesCollection.countDocuments();
    } catch (error) {
      console.error('Error getting number of files:', error);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
