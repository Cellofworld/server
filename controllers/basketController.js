const { Object, BasketObject, Basket} = require('../models/models');

class BasketController {

    async addBasket(req, res, next) {
        const user = req.user
        const {objectId} = req.body
        const basket = await BasketObject.create({basketId: user.id, objectId: objectId})
        return res.json(basket)
    }

    async getBasketUser(req, res) {
        const {id} = req.user
        const basket = await BasketObject.findAll({include: {
            model: Object
        }, where: {basketId: id}})
        return res.json(basket)
    }

}

module.exports = new BasketController();