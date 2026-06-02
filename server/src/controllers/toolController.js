const { validationResult } = require('express-validator');
const Tool = require('../models/Tool');
const asyncHandler = require('../utils/asyncHandler');

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value.map((x) => String(x).trim()).filter(Boolean);
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.map((x) => String(x).trim()).filter(Boolean);
    } catch (_err) {}
    return trimmed.split(',').map((x) => x.trim()).filter(Boolean);
  }
  return [];
};

const bodyToTool = (body) => ({
  name: body.name,
  description: body.description,
  purpose: body.purpose,
  url: body.url,
  category: body.category || 'general',
  logo: body.logo,
  adminNotes: body.adminNotes,
  status: body.status,
  capabilities: normalizeArray(body.capabilities),
  mainUsers: normalizeArray(body.mainUsers),
  tags: normalizeArray(body.tags)
});

function attachLogo(req, data) {
  if (req.file) data.logo = `/uploads/${req.file.filename}`;
  return data;
}

exports.listPublic = asyncHandler(async (req, res) => {
  const { q, category, audience, page = 1, limit = 12 } = req.query;
  const filter = { status: 'approved' };
  if (category) filter.category = category;
  if (audience) filter.mainUsers = audience;
  if (q) filter.$text = { $search: q };

  const pageNumber = Math.max(Number(page), 1);
  const perPage = Math.min(Math.max(Number(limit), 1), 50);
  const skip = (pageNumber - 1) * perPage;

  const [items, total] = await Promise.all([
    Tool.find(filter).populate('submittedBy', 'name').sort('-createdAt').skip(skip).limit(perPage),
    Tool.countDocuments(filter)
  ]);

  res.json({ items, total, page: pageNumber, pages: Math.ceil(total / perPage) || 1 });
});

exports.getOne = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id).populate('submittedBy', 'name email');
  if (!tool) return res.status(404).json({ message: 'Tool not found' });

  const ownerId = tool.submittedBy?._id?.toString() || tool.submittedBy?.toString();
  const canView = tool.status === 'approved' || (req.user && (req.user.role === 'admin' || ownerId === req.user.id));
  if (!canView) return res.status(403).json({ message: 'Forbidden' });

  res.json(tool);
});

exports.create = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const data = attachLogo(req, bodyToTool(req.body));
  const tool = await Tool.create({ ...data, submittedBy: req.user.id, status: 'pending' });
  res.status(201).json(tool);
});

exports.update = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  if (!tool) return res.status(404).json({ message: 'Tool not found' });

  const isOwner = tool.submittedBy.toString() === req.user.id;
  const isAdmin = req.user.role === 'admin';
  if (!isAdmin && !(isOwner && tool.status === 'pending')) return res.status(403).json({ message: 'Forbidden' });

  const data = attachLogo(req, bodyToTool(req.body));
  const allowed = ['name', 'description', 'purpose', 'capabilities', 'url', 'mainUsers', 'category', 'tags', 'logo'];
  const adminOnly = ['status', 'adminNotes'];

  for (const key of allowed) {
    if (data[key] !== undefined) tool[key] = data[key];
  }
  if (isAdmin) {
    for (const key of adminOnly) {
      if (data[key] !== undefined) tool[key] = data[key];
    }
  }

  await tool.save();
  res.json(tool);
});

exports.remove = asyncHandler(async (req, res) => {
  const tool = await Tool.findById(req.params.id);
  if (!tool) return res.status(404).json({ message: 'Tool not found' });

  const isOwner = tool.submittedBy.toString() === req.user.id;
  const isAdmin = req.user.role === 'admin';
  if (!isAdmin && !(isOwner && tool.status === 'pending')) return res.status(403).json({ message: 'Forbidden' });

  await tool.deleteOne();
  res.json({ message: 'Deleted' });
});

exports.myTools = asyncHandler(async (req, res) => {
  const items = await Tool.find({ submittedBy: req.user.id }).sort('-createdAt');
  res.json(items);
});

exports.listAll = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const items = await Tool.find(filter).populate('submittedBy', 'name email').sort('-createdAt');
  res.json(items);
});

exports.setStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;
  if (!['approved', 'rejected', 'pending'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

  const tool = await Tool.findByIdAndUpdate(
    req.params.id,
    { $set: { status, adminNotes: adminNotes || '' } },
    { new: true, runValidators: true }
  );
  if (!tool) return res.status(404).json({ message: 'Tool not found' });
  res.json(tool);
});
