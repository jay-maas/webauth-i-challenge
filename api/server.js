const express = require('express');
const timestamp = require('time-stamp')
const cors = require('cors')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const usersRouter = require('./routes/users/router.js')
const authRouter = require('./routes/auth/router.js')

const server = express()

const sessionConfig = {
    name: 'hungry',
    secret: 'keep it secret, keep it safe',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    store: new KnexSessionStore({
        knex: require('../data/dbConfig.js'),
        tablename: "sessions",
        sidfilename: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(logger)
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

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