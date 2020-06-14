const knex = require('../database')

exports.getProjectById = async (req, res) => {
  const { id_project } = req.params
  await knex('project')
    .where('id_project', id_project)
    .then((project) => {
      knex('member')
        .join(
          'projecthasmember',
          'member.id_member',
          '=',
          'projecthasmember.id_member',
        )
        .join(
          'project',
          'project.id_project',
          '=',
          'projecthasmember.id_project',
        )
        .select('member.id_member', 'member.email', 'member.nome')
        .where('project.id_project', id_project)
        .then((members) => {
          knex('subsystem')
            .where('id_project', id_project)
            .then((sub) => {
              res.json({ project, members, sub })
            })
        })
    })
}

exports.getProjectByAdmin = async (req, res) => {
  const { id_admin } = req.params

  const response = await knex('project').where('id_admin', id_admin)

  res.json(response)
}

exports.createProject = async (req, res, next) => {
  try {
    const { id_admin, nome, tipo, dominio, descricao } = req.body

    if (id_admin) {
      await knex('project').insert({
        id_admin,
        tipo,
        dominio,
        nome,
        descricao,
      })

      return res.status(201).json({
        message: 'Projeto cadastrado com sucesso',
      })
    }
    return res.status(401).json({
      message: 'Não autorizado',
    })
  } catch (error) {
    next(error)
  }
}
