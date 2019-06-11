const express = require('express')
const bcrypt = require('bcryptjs')
const Middleware = require('../../middleware/authMiddleware.js')

const Users = require('../../models/usersModel.js')

const router = express.Router()

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
            const token = Middleware.generateToken(user)
            console.log(token)
            res.status(200).json({ 
                message: `Welcome ${user.username}!`,
                token: token
        })
        } else {
            res.status(401).json({ message: "Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/', (req, res) => {
    if (req.session) {
        req.session.destroy()
        res.status(200).json({ message: "Good Bye!"})
    }
})

module.exports = router