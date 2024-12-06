# ALX Files Manager / Gestionnaire de Fichiers ALX

## Description / Description

**ALX Files Manager** is a file management application developed to allow users to store, organize, and share files efficiently. This project is intended to be a web-based file manager that offers features for uploading, deleting, organizing, and sharing files with restricted access.

**ALX Files Manager** est une application de gestion des fichiers développée pour permettre aux utilisateurs de stocker, organiser et partager des fichiers de manière efficace. Ce projet est destiné à être un gestionnaire de fichiers basé sur le web qui offre des fonctionnalités pour télécharger, supprimer, organiser et partager des fichiers avec un accès restreint.

## Features / Fonctionnalités

- **File Upload**: Users can upload files from their local system to the manager.
- **File Organization**: Files can be organized into folders.
- **File Deletion**: Users can delete files they have uploaded.
- **File Sharing**: Users can share files with third parties using shareable links.
- **Security**: Secure access to files through user authentication.

- **Téléchargement de fichiers** : Les utilisateurs peuvent télécharger des fichiers à partir de leur système local vers le gestionnaire.
- **Organisation des fichiers** : Les fichiers peuvent être organisés en dossiers.
- **Suppression de fichiers** : Les utilisateurs peuvent supprimer des fichiers qu'ils ont téléchargés.
- **Partage de fichiers** : Les utilisateurs peuvent partager des fichiers avec des tiers en utilisant des liens de partage.
- **Sécurité** : Accès sécurisé aux fichiers via une authentification utilisateur.

## Prerequisites / Prérequis

To run this project, you will need:

- **Node.js** (version 14.x or higher)
- **MongoDB** (for storing file and user information)
- **Express.js** (web framework for Node.js)

Pour faire fonctionner ce projet, vous aurez besoin de :

- **Node.js** (version 14.x ou ultérieure)
- **MongoDB** (pour le stockage des informations des fichiers et utilisateurs)
- **Express.js** (framework web pour Node.js)

## Installation / Installation

1. Clone this repository to your local environment:
   ```bash
   git clone https://github.com/username/alx-files_manager.git
   ```

   Clonez ce dépôt dans votre environnement local :
   ```bash
   git clone https://github.com/username/alx-files_manager.git
   ```

2. Navigate to the project directory:
   ```bash
   cd alx-files_manager
   ```

   Accédez au répertoire du projet :
   ```bash
   cd alx-files_manager
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

   Installez les dépendances nécessaires :
   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and configure the environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/files_manager
   JWT_SECRET=your_jwt_secret_key
   ```

   Créez un fichier `.env` dans la racine du projet et configurez les variables d'environnement :
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/files_manager
   JWT_SECRET=votre_secret_pour_jwt
   ```

5. Start the server:
   ```bash
   npm start
   ```

   Démarrez le serveur :
   ```bash
   npm start
   ```

6. Open your browser and go to `http://localhost:5000` to use the application.

   Ouvrez votre navigateur et accédez à `http://localhost:5000` pour utiliser l'application.

## Usage / Utilisation

- **Create an Account**: You must first create a user account.
- **Upload Files**: Log in and use the interface to upload your files.
- **Organize Your Files**: Create folders and move files to organize them as needed.
- **Share Files**: Share your files by generating links.

- **Créer un compte** : Vous devez d'abord créer un compte utilisateur.
- **Télécharger des fichiers** : Connectez-vous, et utilisez l'interface pour télécharger vos fichiers.
- **Organiser vos fichiers** : Créez des dossiers et déplacez les fichiers pour les organiser selon vos besoins.
- **Partager des fichiers** : Partagez vos fichiers en générant des liens.

## Scripts / Scripts

- `npm start`: Start the application in production mode.
- `npm run dev`: Start the application in development mode.

- `npm start` : Lance l'application en mode production.
- `npm run dev` : Lance l'application en mode développement.

## Technologies Used / Technologies Utilisées

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web development framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **JWT**: For authentication and managing user sessions.

- **Node.js** : Environnement de serveur JavaScript.
- **Express.js** : Framework de développement web pour Node.js.
- **MongoDB** : Base de données NoSQL pour le stockage des données.
- **JWT** : Pour l'authentification et la gestion des sessions utilisateurs.

## Authors / Auteurs

This project is developed by **Ben Obame** as part of the ALX Africa program.

Ce projet est développé par **Ben Obame** dans le cadre de la formation ALX Africa.

## License / Licence

This project is licensed under the MIT License. You are free to use, modify, and distribute it, provided you mention the original author.

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer, sous réserve de mentionner l'auteur d'origine.
