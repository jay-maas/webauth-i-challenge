const express = require('express')
const bcrypt = require('bcryptjs')

const Users = require('../../models/usersModel.js')

const router = express.Router()

router.use(express.json())

router.post('/register',  async (req, res) => {
    let user = req.body
    console.log(user.password)
    const hash = bcrypt.hashSync(user.password, 8)
    user.password=hash
    console.log(user.password)
    try {
        const newUser = await Users.add(user)
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/login',  async (req, res) => {
    let { username, password } = req.body
    try {
        const user = await Users.findBy({ username })
        .first()
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}!` })
        } else {
            res.status(401).json({ message: "Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
module.exports = router