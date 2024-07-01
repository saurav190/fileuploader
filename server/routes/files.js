const express = require("express");
const router = express.Router();
const {
  getAllFilesById,
  uploadFileToFolder,
  deleteFileById,
} = require("../controller/filesController");
const upload = require("../middleware/cloudinary");

// Get all files in a folder
router.get("/:folderId", getAllFilesById);

// Upload a file to a folder
router.post("/:folderId", upload.single("file"), uploadFileToFolder);

// Delete a file by ID
router.delete("/:id", deleteFileById);

module.exports = router;
