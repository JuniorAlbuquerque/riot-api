exports.up = (knex) =>
  knex.schema.createTable('projecthasmember', (table) => {
    table.integer('id_member').unsigned()
    table.foreign('id_member').references('member.id_member')
    table.integer('id_project').unsigned()
    table.foreign('id_project').references('project.id_project')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('projecthasmember')
