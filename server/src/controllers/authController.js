const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');

const safeUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar });

exports.register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already in use' });
  const user = await User.create({ name, email, password });
  res.status(201).json({ user: safeUser(user), token: generateToken(user) });
});

exports.login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ user: safeUser(user), token: generateToken(user) });
});

exports.me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(safeUser(user));
});

exports.updateMe = asyncHandler(async (req, res) => {
  const updates = {};
  for (const key of ['name', 'email', 'avatar']) if (req.body[key] !== undefined) updates[key] = req.body[key];
  const user = await User.findByIdAndUpdate(req.user.id, { $set: updates }, { new: true, runValidators: true });
  res.json(safeUser(user));
});


exports.uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Profile picture is required' });
  if (!req.file.mimetype.startsWith('image/')) {
    return res.status(400).json({ message: 'Please upload an image file' });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { avatar: `/uploads/${req.file.filename}` } },
    { new: true, runValidators: true }
  );

  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(safeUser(user));
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) return res.status(400).json({ message: 'New password must be at least 6 characters' });
  const user = await User.findById(req.user.id).select('+password');
  if (!user || !(await user.matchPassword(currentPassword))) return res.status(401).json({ message: 'Current password is incorrect' });
  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated' });
});
