import Redis from '../utils/redis';
import DB from '../utils/db';

class AppController {
  static getStatus(request, response) {
    const status = {
      redis: Redis.isAlive(),
      db: DB.isAlive(),
    };
    response.status(200).send(status);
  }

  static async getStats(request, response) {
    const stats = {
      users: await DB.nbUsers(),
      files: await DB.nbFiles(),
    };
    response.status(200).send(stats);
  }
}

export default AppController;
