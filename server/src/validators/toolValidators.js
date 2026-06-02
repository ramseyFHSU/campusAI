const { body } = require('express-validator');

const arrayOrString = (value) => Array.isArray(value) || typeof value === 'string' || value === undefined;

exports.toolRules = [
  body('name').trim().notEmpty().withMessage('Tool name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('purpose').trim().notEmpty().withMessage('Purpose is required'),
  body('url').isURL().withMessage('A valid URL is required'),
  body('mainUsers').optional().custom(arrayOrString).withMessage('mainUsers must be a string or array'),
  body('capabilities').optional().custom(arrayOrString).withMessage('capabilities must be a string or array'),
  body('tags').optional().custom(arrayOrString).withMessage('tags must be a string or array')
];
