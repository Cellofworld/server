const Router = require('express')
const router = new Router()

const objectRouter = require('./objectRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')




router.use('/user', userRouter)
router.use('/type',typeRouter)
router.use('/brand',brandRouter)
router.use('/object',objectRouter)



module.exports = router