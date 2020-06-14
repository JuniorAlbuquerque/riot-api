exports.up = (knex) =>
  knex.schema.createTable('project', (table) => {
    table.increments('id_project')
    table.integer('id_admin').unsigned()
    table.foreign('id_admin').references('administrator.id_admin')
    table.string('tipo').notNullable()
    table.string('dominio').notNullable()
    table.string('nome').notNullable()
    table.text('descricao').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('project')
