const express = require('express');
const router = express.Router();
const Folder = require('../models/folder');
const File = require('../models/file');

// Get all folders
router.get('/', async (req, res) => {
  try {
    const folders = await Folder.find();

    // Calculate file count for each folder
    const foldersWithFileCount = await Promise.all(
      folders.map(async (folder) => {
        const fileCount = await File.find({ folder_id: folder._id }).count();
        return {
          _id: folder._id,
          folder_name: folder.folder_name,
          file_count: fileCount,
          created_at: folder.created_at,
          updated_at: folder.updated_at
        };
      })
    );

    res.json(foldersWithFileCount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a folder
router.post('/', async (req, res) => {
  const { folder_name } = req.body;

  if (!folder_name || typeof folder_name !== 'string') {
    return res.status(400).json({ message: 'Invalid folder name' });
  }

  try {
    const folder = new Folder({
      folder_name: folder_name,
      // Other fields as needed
    });

    const newFolder = await folder.save();
    res.status(201).json(newFolder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
