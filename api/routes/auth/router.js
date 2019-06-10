const express = require('express')

const Model = require('../../models/usersModel.js')

const router = express.Router()

router.use(express.json())

router.get('/', async (req, res) => {
    try {
        const models = await Model.find()
        res.status(200).json(models)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id',  validateModelId, async (req, res) => {
    try {
        const model = await Model.findById(req.model.id)
        res.status(200).json(model)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/', validateModel, async (req, res) => {
    try {
        const newModel = await Model.add(req.modelValid)
        res.status(201).json(newModel)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', validateModelId, validateModel, async (req, res) => {
    try {
        const updatedModel = await Model.update(req.model.id, req.modelValid)
        const numberUpdated = updatedModel
        res.status(200).json({ message: `Number of model(s): ${numberUpdated}` })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', validateModelId, async (req, res) => {
    try {
        const deleted = await Model.remove(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.use(express.json())

async function validateModelId(req, res, next) {
    const model = await Model.findById(req.params.id)
    if (model) {
        req.account = model
        next()
    } else {
        res.status(404).json({
            error: "Could not find a model by that ID"
        })
    }
}

function validateModel(req, res, next) {
    if (!isEmpty(req.body)) {
        if (req.body.name && req.body.example) {
            req.accountValid = {
                name: req.body.name,
                example: req.body.example
            }
            next()
        } else {
            res.status(400).json({
                errorMessage: 'Missing required name and/or example. This schema requires both. Please do not submit any other key:values in this post request!'
            })
        }
    } else {
        res.status(400).json({
            errorMessage: 'Missing model data.'
        })
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)
        )
            return false
    }
    return true
}

module.exports = router