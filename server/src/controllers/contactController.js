const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../utils/asyncHandler');

exports.submit = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'name, email, message are required' });
  await ContactMessage.create({ name, email, subject, message });
  res.status(201).json({ message: 'Message received' });
});
exports.list = asyncHandler(async (_req, res) => res.json(await ContactMessage.find().sort('-createdAt')));
exports.remove = asyncHandler(async (req, res) => { await ContactMessage.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); });
