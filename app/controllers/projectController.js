const knex = require('../database')
const pdf = require('html-pdf')
const ejs = require('ejs')
const path = require('path')
const { getDate, formatDate } = require('../utils/date')

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

exports.getPdf = async (req, res, next) => {
  const { id_project } = req.params

  try {
    const Project = await knex('project')
      .join('administrator', 'project.id_admin', '=', 'administrator.id_admin')
      .where('id_project', id_project)
      .select(
        knex.ref('project.nome').as('Projeto'),
        'project.descricao',
        'project.created_at',
      )
      .select(knex.ref('administrator.nome').as('Responsável'))
      .first()
    const subs = []

    const creationDate = formatDate(
      Project.created_at.toLocaleDateString(),
      'pt-br',
    )

    await knex('subsystem')
      .where('id_project', id_project)
      .then((sub) => {
        sub.map(async (sb) => {
          const reqFunc = await knex('reqfunctional').where('id_sub', sb.id_sub)
          const reqNonFunc = await knex('reqnonfunctional').where(
            'id_sub',
            sb.id_sub,
          )
          const nome = sb.nome
          const descricaoSub = sb.descricao
          subs.push({ nome, descricaoSub, reqFunc, reqNonFunc })
        })

        setTimeout(() => {
          ejs.renderFile(
            './template.ejs',
            {
              Project,
              DataAtual: getDate(),
              creationDate,
              Subsystems: subs,
            },
            (err, html) => {
              if (err) {
                res.json({ message: 'Erro ejs' })
              } else {
                pdf
                  .create(html, {})
                  .toFile(
                    `./app/temp/projeto_${id_project}.pdf`,
                    (err, resp) => {
                      if (err) {
                        res.json({ message: 'erro pdf' })
                      } else {
                        res.sendFile(
                          path.resolve(`app/temp/projeto_${id_project}.pdf`),
                        )
                      }
                    },
                  )
              }
            },
          )
        }, 200)
      })
  } catch (error) {
    next(error)
  }
}
