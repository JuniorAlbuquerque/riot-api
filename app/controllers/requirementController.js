const knex = require('../database')

exports.createRequirement = async (req, res, next) => {
  try {
    const { id_sub, indicador, descricao, tipo } = req.body

    if (tipo) {
      await knex('reqnonfunctional').insert({
        indicador,
        id_sub,
        tipo,
        descricao,
      })

      return res.status(201).json({
        message: 'Requisito não funcional cadastrado',
      })
    }

    await knex('reqfunctional').insert({
      indicador,
      id_sub,
      descricao,
    })

    return res.status(201).json({
      message: 'Requisito funcional cadastrado',
    })
  } catch (error) {
    next()
  }
}
