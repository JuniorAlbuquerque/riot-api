exports.up = (knex) =>
  knex.schema.createTable('reqnonfunctional', (table) => {
    table.increments('id_req_non_functional')
    table.string('indicador').notNullable()
    table.integer('id_sub').unsigned()
    table.foreign('id_sub').references('subsystem.id_sub')
    table.string('tipo').notNullable()
    table.text('descricao').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('reqnonfunctional')
