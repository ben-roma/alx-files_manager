// main.js
import redisClient from './utils/redis';

redisClient.client.on('ready', async () => {
    console.log(redisClient.isAlive()); // Devrait retourner true après la connexion
    console.log(await redisClient.get('myKey')); // Devrait afficher null (la clé n'existe pas encore)
    await redisClient.set('myKey', 12, 5); // Stocker la valeur 12 pendant 5 secondes
    console.log(await redisClient.get('myKey')); // Devrait afficher 12

    setTimeout(async () => {
        console.log(await redisClient.get('myKey')); // Devrait afficher null après 10 secondes (car la clé expire après 5 sec)
    }, 1000 * 10);
});
