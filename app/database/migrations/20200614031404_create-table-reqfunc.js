exports.up = (knex) =>
  knex.schema.createTable('reqfunctional', (table) => {
    table.increments('id_reqfunctional')
    table.string('indicador').notNullable()
    table.integer('id_sub').unsigned()
    table.foreign('id_sub').references('subsystem.id_sub')
    table.text('descricao').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('reqfunctional')
