const express = require('express')
const restricted = require('../../middleware/authMiddleware.js')

const Model = require('../../models/usersModel.js')

const router = express.Router()

router.get('/', restricted, async (req, res) => {
    try {
        const models = await Model.find()
        res.status(200).json(models)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router