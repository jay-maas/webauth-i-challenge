const jwt = require('jsonwebtoken')
const secrets = require('../secrets.js')

module.exports = {
    restricted,
    generateToken
}

async function restricted(req, res, next) {
   const token = req.headers.authorization

   if (token) {
       jwt.verify(token, secrets.jwtSecret, (err, payload) => {
           if (err) {
               res.status(403).json({
                   message: "You are not authorized"
               })
           } else {
               req.userId = payload.userId
               next()
           }
       })
   } else {
       res.status(400).json({
           message: "No credentials provided."
       })
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