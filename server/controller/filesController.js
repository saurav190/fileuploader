const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

const getAllFilesById = async (req, res) => {
  try {
    const files = await File.find({ folder_id: req.params.folderId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const uploadFileToFolder = async (req, res) => {
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
};

const deleteFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    await cloudinary.uploader.destroy(file.url);
    await file.deleteOne();
    res.json({ message: "Deleted file" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllFilesById, uploadFileToFolder, deleteFileById };
