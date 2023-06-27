const Router = require('express')
const router = new Router()
const objectController = require('../controllers/objectController')

router.post('/',objectController.create)
router.get('/',objectController.getAll)
router.get('/:id',objectController.getOne)




module.exports = router