const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  purpose: { type: String, required: true, trim: true },
  capabilities: [{ type: String, trim: true }],
  url: { type: String, required: true, trim: true },
  mainUsers: [{ type: String, enum: ['student','faculty','researcher','developer','designer','content-creator','staff'] }],
  category: { type: String, default: 'general', index: true, trim: true },
  tags: [{ type: String, trim: true }],
  logo: { type: String, default: '' },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending', index: true },
  adminNotes: { type: String, default: '' }
}, { timestamps: true });

toolSchema.index({ name: 'text', description: 'text', tags: 'text' });
module.exports = mongoose.model('Tool', toolSchema);
