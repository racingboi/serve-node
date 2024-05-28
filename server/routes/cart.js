const router = require('express').Router();
const ctrls = require('../controllers/cart');
const { verifyAccessToken } = require('../middlewares/verifyToken');
router.post('/', verifyAccessToken, ctrls.createCart);
router.get('/', verifyAccessToken, ctrls.getCarts);
router.put('/:cid', verifyAccessToken, ctrls.updateCart);
router.delete('/:cid', verifyAccessToken, ctrls.deleteCart);
router.get('/:cid', verifyAccessToken, ctrls.getCart);
module.exports = router;