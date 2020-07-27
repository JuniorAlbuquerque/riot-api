const knex = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const user = await knex('administrator').where('email', email);

    if (user.length < 1) {
      const user = await knex('member').where('email', email);

      if (user.length < 1) {
        return res.status(401).send({
          message: 'Falha na autenticação member',
        });
      }

      bcrypt.compare(senha, user[0].senha, (err, result) => {
        if (err) {
          return res.status(401).send({
            message: 'Falha na autenticação',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              id_member: user[0].id_member,
              email: user[0].email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '5d',
            }
          );
          return res.status(200).json({
            message: 'Autenticado com sucesso',
            user,
            token,
            access_level: 2,
          });
        } else {
          return res.status(401).send({
            message: 'Falha na autenticação',
          });
        }
      });
    } else {
      bcrypt.compare(senha, user[0].senha, (err, result) => {
        if (err) {
          return res.status(401).send({
            message: 'Falha na autenticação admin',
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              id_member: user[0].id_admin,
              email: user[0].email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '5d',
            }
          );

          return res.status(200).send({
            message: 'Autenticado com sucesso',
            user,
            token,
            access_level: 1,
          });
        } else {
          return res.status(401).send({
            message: 'Falha na autenticação',
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
