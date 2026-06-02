const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 20 } = req.query;
  const filter = q ? { $or: [{ name: new RegExp(q, 'i') }, { email: new RegExp(q, 'i') }] } : {};
  const pageNumber = Math.max(Number(page), 1);
  const perPage = Math.min(Math.max(Number(limit), 1), 100);
  const skip = (pageNumber - 1) * perPage;
  const [items, total] = await Promise.all([User.find(filter).sort('-createdAt').skip(skip).limit(perPage), User.countDocuments(filter)]);
  res.json({ items, total, page: pageNumber, pages: Math.ceil(total / perPage) || 1 });
});

exports.getOne = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

exports.update = asyncHandler(async (req, res) => {
  const updates = {};
  for (const key of ['name','email','role','avatar']) if (req.body[key] !== undefined) updates[key] = req.body[key];
  const user = await User.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

exports.remove = asyncHandler(async (req, res) => {
  if (req.user.id === req.params.id) return res.status(400).json({ message: 'You cannot delete your own account from admin panel' });
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'Deleted' });
});
