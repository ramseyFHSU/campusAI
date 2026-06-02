const router = require('express').Router();
const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');
const c = require('../controllers/toolController');
const { toolRules } = require('../validators/toolValidators');

router.get('/', c.listPublic);
router.get('/mine/list', auth, c.myTools);
router.post('/', auth, upload.single('logo'), toolRules, c.create);
router.get('/admin/all', auth, authorize('admin'), c.listAll);
router.patch('/:id/status', auth, authorize('admin'), c.setStatus);
router.get('/:id', optionalAuth, c.getOne);
router.put('/:id', auth, upload.single('logo'), c.update);
router.delete('/:id', auth, c.remove);

module.exports = router;
