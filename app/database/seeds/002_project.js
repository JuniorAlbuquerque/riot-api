exports.seed = function (knex) {
  return knex('project')
    .del()
    .then(function () {
      return knex('project').insert([
        {
          id_admin: 1,
          tipo: 'IoT',
          dominio: 'Agricultra',
          nome: 'Smart Agro',
          descricao:
            'Projeto para monitoramento de fazenda no interior do Amazonas',
        },
      ])
    })
}
