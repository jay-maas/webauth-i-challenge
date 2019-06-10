const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('cohorts')
}

function findById(id) {
    return db('cohorts')
        .where({ id })
        .first()
}

// function findStudentsById(cohortId) {
//     return db('students')
//         .join('cohorts', 'students.cohort_id', 'cohorts.id')
//         .select('students.id', 'students.name', 'cohorts.id as cohortId', 'cohorts.name as cohort')
//         .where({ cohort_id: cohortId })
// }

async function add(cohort) {
    const [id] = await db('cohorts').insert(cohort)

    return findById(id)
}

function update(id, changes) {
    return db('cohorts')
        .where({ id })
        .update(changes, '*')
}

function remove(id) {
    return db('cohorts')
        .where({ id })
        .del()
}