const bcrypt = require('bcrypt')

let hash = bcrypt.hashSync('12345', 10)

exports.seed = function (knex) {
  return knex('administrator')
    .del()
    .then(function () {
      return knex('administrator').insert([
        { nome: 'Júnior', email: 'jnralb.dev@gmail.com', senha: hash },
      ])
    })
}
