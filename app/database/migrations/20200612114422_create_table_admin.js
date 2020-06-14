exports.up = (knex) =>
  knex.schema.createTable('administrator', (table) => {
    table.increments('id_admin')
    table.string('email').unique().notNullable()
    table.string('nome').notNullable()
    table.string('senha').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('administrator')
