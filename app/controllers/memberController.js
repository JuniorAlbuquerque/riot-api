const knex = require('../database')
const bcrypt = require('bcrypt')

exports.createMember = async (req, res, next) => {
  try {
    const { email, nome, senha, id_project } = req.body

    await bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
      if (errBcrypt) {
        return res.status(500).send({
          error: errBcrypt,
        })
      }

      await knex('member')
        .where('email', email)
        .then(async (response) => {
          if (response.length > 0) {
            return res.json({ erro: 'E-mail já cadastrado' })
          } else {
            await knex('member')
              .insert({
                email,
                nome,
                senha: hash,
              })
              .returning('*')
              .then(async (response) => {
                await knex('projecthasmember').insert({
                  id_member: response[0].id_member,
                  id_project,
                })
                return res.json({ message: 'Membro cadastrado com sucesso' })
              })
          }
        })
    })
  } catch (error) {
    next(error)
  }
}

exports.associateMember = async (req, res, next) => {
  try {
    const { email, id_project } = req.body

    await knex('member')
      .where('email', email)
      .then(async (response) => {
        const id_member = response[0].id_member
        await knex('projecthasmember')
          .where({ id_member: id_member, id_project: id_project })
          .then(async (response) => {
            if (response.length > 0) {
              return res.json({ error: 'Membro já associado ao projeto' })
            } else {
              await knex('projecthasmember')
                .insert({
                  id_member,
                  id_project,
                })
                .then(() => {
                  return res.json({ message: 'Membro associado ao projeto' })
                })
            }
          })
      })
  } catch (error) {
    next(error)
  }
}
