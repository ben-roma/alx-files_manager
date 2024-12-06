// main.js
import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            setTimeout(() => {
                i += 1;
                if (i >= 10) {
                    reject();
                } else if (!dbClient.isAlive()) {
                    repeatFct();
                } else {
                    resolve();
                }
            }, 1000);
        };
        repeatFct();
    });
};

(async () => {
    console.log(dbClient.isAlive()); // Devrait afficher false tant que MongoDB n'est pas connecté
    await waitConnection();
    console.log(dbClient.isAlive()); // Devrait afficher true une fois connecté
    console.log(await dbClient.nbUsers()); // Affiche le nombre d'utilisateurs dans la collection
    console.log(await dbClient.nbFiles()); // Affiche le nombre de fichiers dans la collection
})();
