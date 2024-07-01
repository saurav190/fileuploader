const express = require("express");
const router = express.Router();
const {
  getAllFolders,
  createFolder,
} = require("../controller/folderController");

// Get all folders
router.get("/", getAllFolders);

// Create a folder
router.post("/", createFolder);

module.exports = router;
