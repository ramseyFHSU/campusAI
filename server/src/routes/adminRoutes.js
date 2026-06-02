const router = require('express').Router();
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const c = require('../controllers/adminController');
router.get('/stats', auth, authorize('admin'), c.stats);
module.exports = router;
