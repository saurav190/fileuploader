const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  folder_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Folder', folderSchema);
