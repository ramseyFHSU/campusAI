const User = require('../models/User');
const Tool = require('../models/Tool');
const Story = require('../models/Story');
const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../utils/asyncHandler');

exports.stats = asyncHandler(async (_req, res) => {
  const [users, toolsApproved, toolsPending, toolsRejected, stories, messages] = await Promise.all([
    User.countDocuments(), Tool.countDocuments({ status: 'approved' }), Tool.countDocuments({ status: 'pending' }), Tool.countDocuments({ status: 'rejected' }), Story.countDocuments(), ContactMessage.countDocuments()
  ]);
  res.json({ users, toolsApproved, toolsPending, toolsRejected, stories, messages });
});
