const Story = require("../models/Story");
const asyncHandler = require("../utils/asyncHandler");

exports.list = asyncHandler(async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const pageNumber = Math.max(Number(page), 1);
  const perPage = Math.min(Math.max(Number(limit), 1), 50);
  const skip = (pageNumber - 1) * perPage;
  const [items, total] = await Promise.all([
    Story.find()
      .populate("createdBy", "name")
      .populate("relatedTool", "name")
      .sort("-createdAt")
      .skip(skip)
      .limit(perPage),
    Story.countDocuments(),
  ]);
  res.json({
    items,
    total,
    page: pageNumber,
    pages: Math.ceil(total / perPage) || 1,
  });
});

exports.getOne = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id)
    .populate("createdBy", "name")
    .populate("relatedTool", "name")
    .populate("comments.createdBy", "name");

  if (!story) return res.status(404).json({ message: "Story not found" });

  res.json(story);
});

exports.create = asyncHandler(async (req, res) => {
  const { title, content, relatedTool } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "Title and content are required" });
  let mediaUrl = "";
  let mediaType = "none";
  if (req.file) {
    mediaUrl = `/uploads/${req.file.filename}`;
    mediaType = req.file.mimetype.startsWith("image/") ? "image" : "video";
  }
  const story = await Story.create({
    title,
    content,
    mediaUrl,
    mediaType,
    relatedTool: relatedTool || undefined,
    createdBy: req.user.id,
  });
  res.status(201).json(story);
});

exports.addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  const story = await Story.findById(req.params.id);

  if (!story) {
    return res.status(404).json({ message: "Story not found" });
  }

  story.comments.push({
    text: text.trim(),
    createdBy: req.user.id,
  });

  await story.save();

  const updatedStory = await Story.findById(req.params.id)
    .populate("createdBy", "name")
    .populate("relatedTool", "name")
    .populate("comments.createdBy", "name");

  res.status(201).json(updatedStory);
});

exports.update = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) return res.status(404).json({ message: "Story not found" });
  const isOwner = story.createdBy.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin)
    return res.status(403).json({ message: "Forbidden" });
  for (const key of ["title", "content"])
    if (req.body[key] !== undefined) story[key] = req.body[key];
  if (req.body.relatedTool !== undefined)
    story.relatedTool = req.body.relatedTool || undefined;
  if (req.file) {
    story.mediaUrl = `/uploads/${req.file.filename}`;
    story.mediaType = req.file.mimetype.startsWith("image/")
      ? "image"
      : "video";
  }
  await story.save();
  res.json(story);
});

exports.remove = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) return res.status(404).json({ message: "Story not found" });
  const isOwner = story.createdBy.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin)
    return res.status(403).json({ message: "Forbidden" });
  await story.deleteOne();
  res.json({ message: "Deleted" });
});

exports.myStories = asyncHandler(async (req, res) => {
  const items = await Story.find({ createdBy: req.user.id })
    .populate("relatedTool", "name")
    .sort("-createdAt");
  res.json(items);
});
