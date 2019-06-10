
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('example', table => {
        table.increments()

        table
            .string('name', 128)
            .notNullable()
            .unique()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('example')
};
