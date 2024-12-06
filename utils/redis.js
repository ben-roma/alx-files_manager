// utils/redis.js

import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient(); // Création du client Redis
    this.client.on('error', (err) => console.error('Redis client error:', err)); // Gestion des erreurs
    this.client.on('ready', () => console.log('Redis client connected')); // Message de confirmation
  }

  isAlive() {
    return this.client.connected; // Vérifie si le client est connecté
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
