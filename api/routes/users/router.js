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

module.exports = router