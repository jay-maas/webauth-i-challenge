const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    add,
    update,
    remove
}

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users')
        .where({ filter })
}

async function add(cohort) {
    const [id] = await db('users').insert(cohort)

    return findBy({id})
}

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes, '*')
}

function remove(id) {
    return db('users')
        .where({ id })
        .del()
}