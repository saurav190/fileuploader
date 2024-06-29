const express = require('express');
const router = express.Router();
const File = require('../models/file');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage: storage });

// Get all files in a folder
router.get('/:folderId', async (req, res) => {
  try {
    const files = await File.find({ folder_id: req.params.folderId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload a file to a folder
router.post('/:folderId', upload.single('file'), async (req, res) => {
  const file = new File({
    folder_id: req.params.folderId,
    file_name: req.file.originalname,
    url: req.file.path,
  });

  try {
    const newFile = await file.save();
    res.status(201).json(newFile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a file by ID
router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    await cloudinary.uploader.destroy(file.url);
    await file.deleteOne();
    res.json({ message: 'Deleted file' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
