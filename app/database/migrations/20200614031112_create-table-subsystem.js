exports.up = (knex) =>
  knex.schema.createTable('subsystem', (table) => {
    table.increments('id_sub')
    table.string('nome').unique().notNullable()
    table.text('descricao').notNullable()
    table.integer('id_project').unsigned()
    table.foreign('id_project').references('project.id_project')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('subsystem')
