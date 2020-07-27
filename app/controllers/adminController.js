const knex = require('../database');
const bcrypt = require('bcrypt');

exports.getAdmin = async (req, res) => {
  const response = await knex('administrator');

  res.json(response);
};

exports.createAdmin = async (req, res, next) => {
  try {
    const { email, nome, senha } = req.body;

    await bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
      if (errBcrypt) {
        return res.status(500).send({
          error: errBcrypt,
        });
      }

      await knex('administrator').insert({
        email,
        nome,
        senha: hash,
      });

      return res.json({ message: 'Administrador cadastrado com sucesso' });
    });
  } catch (error) {
    next(error);
  }
};
