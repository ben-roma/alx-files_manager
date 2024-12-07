// utils/redis.js

import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

class RedisClient {
  constructor() {
    const host = process.env.REDIS_HOST || '127.0.0.1';
    const port = process.env.REDIS_PORT || 6379;
    this.client = createClient({ url: `redis://${host}:${port}` });

    this.client.on('error', (err) => console.error('Redis client error:', err));
    this.client.on('connect', () => console.log('Redis client connected'));
    this.client.connect().catch((err) => console.error('Connection error:', err));
  }

  isAlive() {
    return this.client.isOpen;  // Vérifie si le client Redis est connecté
  }

  async get(key) {
    try {
      return await this.client.get(key); // Récupère la valeur de Redis
    } catch (error) {
      console.error('Error getting value:', error);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, {
        EX: duration, // Définit une expiration en secondes
      });
    } catch (error) {
      console.error('Error setting value:', error);
    }
  }

  async del(key) {
    try {
      await this.client.del(key); // Supprime la clé de Redis
    } catch (error) {
      console.error('Error deleting value:', error);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
