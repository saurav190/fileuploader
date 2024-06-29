const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  folder_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
  file_name: { type: String, required: true },
  url: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
