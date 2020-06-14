const knex = require('../database')
const bcrypt = require('bcrypt')

exports.createMember = async (req, res, next) => {
  try {
    const { email, nome, senha } = req.body

    await bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
      if (errBcrypt) {
        return res.status(500).send({
          error: errBcrypt,
        })
      }

      await knex('member').insert({
        email,
        nome,
        senha: hash,
      })

      return res.json({ message: 'Membro cadastrado com sucesso' })
    })
  } catch (error) {
    next(error)
  }
}
