const jwt = require('jsonwebtoken')
const secrets = require('../secrets.js')

module.exports = {
    restricted,
    generateToken
}

async function restricted(req, res, next) {
    if (req.session && req.session.username) {
        next()
    } else {
        res.status(401).json({ message: "You shall not pass!!!"})
    }
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}