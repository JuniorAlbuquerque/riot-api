exports.up = (knex) =>
  knex.schema.createTable('member', (table) => {
    table.increments('id_member')
    table.string('email').unique().notNullable()
    table.string('nome').notNullable()
    table.string('senha').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('member')
