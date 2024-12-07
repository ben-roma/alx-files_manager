// controllers/FilesController.js

import { v4 as uuidv4 } from 'uuid';
import { promises as fsPromises } from 'fs';
import path from 'path';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import { ObjectId } from 'mongodb';

class FilesController {
  static async postUpload(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
      name, type, parentId = 0, isPublic = false, data,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }

    if (!type || !['folder', 'file', 'image'].includes(type)) {
      return res.status(400).json({ error: 'Missing type' });
    }

    if (type !== 'folder' && !data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    let parentFile = null;
    if (parentId !== 0) {
      if (!ObjectId.isValid(parentId)) {
        return res.status(400).json({ error: 'Parent not found' });
      }
      try {
        parentFile = await dbClient.database.collection('files').findOne({ _id: new ObjectId(parentId) });
        if (!parentFile) {
          return res.status(400).json({ error: 'Parent not found' });
        }
        if (parentFile.type !== 'folder') {
          return res.status(400).json({ error: 'Parent is not a folder' });
        }
      } catch (error) {
        return res.status(400).json({ error: 'Parent not found' });
      }
    }

    const filesCollection = dbClient.database.collection('files');
    const newFile = {
      userId,
      name,
      type,
      isPublic,
      parentId,
    };

    if (type === 'folder') {
      // Créer un dossier
      try {
        const result = await filesCollection.insertOne(newFile);
        newFile.id = result.insertedId;
        return res.status(201).json(newFile);
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    // Si le type est un fichier ou une image
    const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
    await fsPromises.mkdir(folderPath, { recursive: true });

    const fileUuid = uuidv4();
    const localPath = path.join(folderPath, fileUuid);

    try {
      await fsPromises.writeFile(localPath, Buffer.from(data, 'base64'));
      newFile.localPath = localPath;

      const result = await filesCollection.insertOne(newFile);
      newFile.id = result.insertedId;

      return res.status(201).json(newFile);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getShow(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Not found' });
    }

    try {
      const file = await dbClient.database.collection('files').findOne({ _id: new ObjectId(id), userId });
      if (!file) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.status(200).json(file);
    } catch (error) {
      return res.status(404).json({ error: 'Not found' });
    }
  }

  static async getIndex(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let { parentId = '0', page = 0 } = req.query;
    page = parseInt(page, 10);

    try {
      const query = { userId };

      // Convertir le parentId en ObjectId si ce n'est pas 0
      if (parentId !== '0') {
        try {
          parentId = new ObjectId(parentId);
        } catch (error) {
          return res.status(400).json({ error: 'Invalid parentId format' });
        }
        query.parentId = parentId;
      } else {
        query.parentId = 0;
      }

      const pageSize = 20;
      const filesCollection = dbClient.database.collection('files');
      const files = await filesCollection
        .find(query)
        .skip(page * pageSize)
        .limit(pageSize)
        .toArray();

      // Remplacer _id par id pour la réponse
      const result = files.map((file) => ({
        id: file._id,
        ...file,
        _id: undefined,
      }));

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error retrieving files:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
export default FilesController;
