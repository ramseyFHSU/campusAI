const { body } = require('express-validator');
exports.registerRules = [body('name').trim().notEmpty().withMessage('Name is required'), body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')];
exports.loginRules = [body('email').isEmail().normalizeEmail(), body('password').notEmpty().withMessage('Password is required')];
