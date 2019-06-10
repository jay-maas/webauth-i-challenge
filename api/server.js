const express = require('express');
const timestamp = require('time-stamp')
const cors = require('cors')

const usersRouter = require('./routes/users/router.js')
const authRouter = require('./routes/auth/router.js')

const server = express();

server.use(logger)
server.use('/api/users', usersRouter)
server.use('/api/restricted', authRouter)
server.use(cors())

server.get('/', (req, res) => {
    res.send(`
    <div style="display: flex; align-items: center;">
        <p style="margin: 0;">This project was deployed by:</p>
        <h2 style="margin: 0;"> ${process.env.DEPLOYER}</h2>
    </div>
    <p>Message of the Day: ${process.env.MOTD}</p>
    <p>Extra: ${process.env.OTHER_STUFF}</p>
    `)
})

function logger(req, res, next) {
    console.log(`A ${req.method} request to ${req.url} at ${timestamp.utc('HH:mm:ss on MM/DD/YYYY')}`)
    next()
}

module.exports = server;