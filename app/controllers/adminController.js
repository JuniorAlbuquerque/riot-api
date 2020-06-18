const knex = require('../database')
const bcrypt = require('bcrypt')
const pdf = require('html-pdf')
const ejs = require('ejs')
const path = require('path')

exports.getAdmin = async (req, res) => {
  // const response = await knex('administrator')
  const { id } = req.params
  const admins = await knex('administrator')

  ejs.renderFile('./template.ejs', { admins }, (err, html) => {
    if (err) {
      res.json({ message: 'Erro ejs' })
    } else {
      pdf.create(html, {}).toFile(`./app/temp/teste${id}.pdf`, (err, resp) => {
        if (err) {
          res.json({ message: 'erro pdf' })
        } else {
          res.sendFile(path.resolve(`app/temp/teste${id}.pdf`))
        }
      })
    }
  })

  // res.json(response)
}

exports.createAdmin = async (req, res, next) => {
  try {
    const { email, nome, senha } = req.body

    await bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
      if (errBcrypt) {
        return res.status(500).send({
          error: errBcrypt,
        })
      }

      await knex('administrator').insert({
        email,
        nome,
        senha: hash,
      })

      return res.json({ message: 'Administrador cadastrado com sucesso' })
    })
  } catch (error) {
    next(error)
  }
}
