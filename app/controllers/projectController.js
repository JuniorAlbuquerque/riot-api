const knex = require('../database')
const pdf = require('html-pdf')
const fs = require('fs')
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

    const creationDate = formatDate(
      Project.created_at.toLocaleDateString(),
      'pt-br',
    )

    const subs = await knex('subsystem').where('id_project', id_project)

    let subInfo = []
    let totalReqFunc = 0
    let totalReqNonFunc = 0

    for (var subsystem of subs) {
      const subname = subsystem.nome
      const descricaoSub = subsystem.descricao
      const reqFunc = await knex('reqfunctional').where(
        'id_sub',
        subsystem.id_sub,
      )
      const reqNonFunc = await knex('reqnonfunctional').where(
        'id_sub',
        subsystem.id_sub,
      )

      totalReqFunc = totalReqFunc + reqFunc.length
      totalReqNonFunc = totalReqNonFunc + reqNonFunc.length

      subInfo = [
        ...subInfo,
        [
          {
            nome: subname,
            descricao: descricaoSub,
            reqFunc: [...reqFunc],
            reqNonFunc: [...reqNonFunc],
          },
        ],
      ]
    }

    const options = {
      paginationOffset: 1,
      header: {
        height: '2mm',
      },
      footer: {
        height: '5mm',
      },
      base: 'https://riot-backend.herokuapp.com/public/',
      format: 'A4',
      orientation: 'portrait',
      quality: '75',
    }

    ejs.renderFile(
      './template.ejs',
      {
        Project,
        DataAtual: getDate(),
        creationDate,
        Subsystems: subInfo,
        totalReqFunc,
        totalReqNonFunc,
      },
      (err, html) => {
        if (err) {
          res.json({ message: 'Erro ejs' })
        } else {
          pdf
            .create(html, options)
            .toFile(
              `./app/temp/projeto_${id_project}.pdf`,
              async (err, resp) => {
                if (err) {
                  res.json({ message: 'erro pdf' })
                } else {
                  const filePath = path.resolve(
                    __dirname,
                    `../temp/projeto_${id_project}.pdf`,
                  )
                  await res.sendFile(filePath)
                  setTimeout(() => {
                    fs.unlinkSync(filePath)
                  }, 2000)
                }
              },
            )
        }
      },
    )
  } catch (error) {
    next(error)
  }
}
