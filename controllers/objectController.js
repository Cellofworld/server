const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {Object, ObjectInfo} = require('../models/models')

class ObjectController{
    async create(req, res, next) {
        try {
        
            let {name, price, brandId, typeId, info} = req.body
            console.log(info)
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'storage', fileName))
            const object = await Object.create({name, price, brandId, typeId, img: fileName})
            if (info) {
                info = JSON.parse(info)
                info.forEach(element => {
                    ObjectInfo.create({
                        title: element.title,
                        description: element.description,
                        objectId: object.id
                    })
                });
            }
    
            return res.json(object)
            
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let objects;
        if(!brandId && !typeId) {
            objects = await Object.findAndCountAll({limit, offset})
        } 
        if (brandId && !typeId) {
            objects = await Object.findAndCountAll({where: {brandId}, limit, offset})

        }
        if (!brandId && typeId) {
            objects = await Object.findAndCountAll({where: {typeId}, limit, offset})
            
        }
        if (brandId && typeId) {
            objects = await Object.findAndCountAll({where: {typeId, brandId}, limit, offset})
            
        }
        return res.json(objects)
    }

    async getOne(req, res) {
        const {id} = req.params
        const object = await Object.findOne(
            {
                where: {id},
                include: [{model: ObjectInfo, as : 'info'}]
            },
        )
        return res.json(object)
    }

}

module.exports = new ObjectController()