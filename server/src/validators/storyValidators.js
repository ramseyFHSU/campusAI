const { body } = require('express-validator');
exports.storyRules = [body('title').trim().notEmpty().withMessage('Title is required'), body('content').trim().notEmpty().withMessage('Content is required')];
