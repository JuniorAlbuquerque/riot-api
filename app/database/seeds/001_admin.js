exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('administrator')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('administrator').insert([
        { nome: 'Júnior', email: 'jnralb.dev@gamil.com', password: '12345' },
        { nome: 'Júnior2', email: 'jnralb2.dev@gamil.com', password: '123' },
      ])
    })
}
