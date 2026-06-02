const router = require('express').Router();
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const c = require('../controllers/contactController');
router.post('/', c.submit);
router.get('/', auth, authorize('admin'), c.list);
router.delete('/:id', auth, authorize('admin'), c.remove);
module.exports = router;
