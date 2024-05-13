const router = require('express').Router()
const ctrls = require('../controllers/subcategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
router.post('/', [verifyAccessToken, isAdmin], ctrls.createSubcategory)
router.get('/', ctrls.getSubcategories)
router.put('/:sid', [verifyAccessToken, isAdmin], ctrls.updateSubcategory)
router.delete('/:sid', [verifyAccessToken, isAdmin], ctrls.deleteSubcategory)
router.get('/:sid', ctrls.getSubcategory)
module.exports = router