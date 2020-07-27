const knex = require('../database');

exports.createSub = async (req, res, next) => {
  try {
    const { id_project, nome, descricao } = req.body;

    await knex('subsystem').insert({
      nome,
      descricao,
      id_project,
    });

    return res.status(201).json({
      message: 'Subsistema cadastrado com sucesso',
    });
  } catch (error) {
    next();
  }
};

exports.getInfoSubById = async (req, res, next) => {
  try {
    const { id_sub } = req.params;

    await knex('subsystem')
      .where('id_sub', id_sub)
      .then((sub) => {
        knex('reqfunctional')
          .where('id_sub', id_sub)
          .then((reqFunc) => {
            knex('reqnonfunctional')
              .where('id_sub', id_sub)
              .then((reqNonFunc) => {
                res.json({
                  sub,
                  reqFunc,
                  reqNonFunc,
                });
              });
          });
      });
  } catch (error) {
    next();
  }
};
