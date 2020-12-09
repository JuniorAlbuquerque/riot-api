const knex = require("../database");

const last = (requirement) => requirement[requirement.length - 1];
const intReq = (num) => parseInt(num.replace(/^\D+/g, ""));
let RF;
let RNF;

exports.createRequirement = async (req, res, next) => {
  try {
    const { id_sub, descricao, tipo } = req.body;

    if (tipo) {
      await knex("reqnonfunctional")
        .where("id_sub", id_sub).orderBy('id_req_non_functional', 'asc')
        .then(async (reqNonFunc) => {
          if (reqNonFunc.length > 0) {
            const lastRNFIndicator = last(reqNonFunc).indicador;
            const num = intReq(lastRNFIndicator);
            RNF = num < 9 ? "RNF0" + (num + 1) : "RNF" + (num + 1);
          } else {
            RNF = "RNF01";
          }
        });

      await knex("reqnonfunctional").insert({
        indicador: RNF,
        id_sub,
        tipo,
        descricao,
      });

      return res.status(201).json({
        message: "Requisito não funcional cadastrado",
      });
    }

    await knex("reqfunctional")
      .where("id_sub", id_sub).orderBy('id_reqfunctional', 'asc')
      .then(async (reqFunc) => {
        if (reqFunc.length > 0) {
          const lastRFIndicator = last(reqFunc).indicador;
          const num = intReq(lastRFIndicator);
          RF = num < 9 ? "RF0" + (num + 1) : "RF" + (num + 1);
        } else {
          RF = "RF01";
        }
      });

    await knex("reqfunctional").insert({
      indicador: RF,
      id_sub,
      descricao,
    });

    return res.status(201).json({
      message: "Requisito funcional cadastrado",
    });
  } catch (error) {
    next();
  }
};

exports.deleteRequirement = async (req, res, next) => {
  try {
    const { id_req, type } = req.body;

    if (type == 'functional') {
      await knex('reqfunctional')
      .where('id_reqfunctional', id_req)
      .del()

      return res.json({message: 'Deletado com sucesso'})
    } 

    if (type == 'nonfunctional') {
      await knex('reqnonfunctional')
      .where('id_req_non_functional', id_req)
      .del()

      return res.json({message: 'Deletado com sucesso'})
    }
    
  } catch (error) {
    next();
  }
}

exports.updateRequirement = async (req, res, next) => {
  try {
    const { id_req, description, type } = req.body;

    if (type) {
      await knex('reqnonfunctional')
      .where('id_req_non_functional', id_req)
      .update({ descricao: description, tipo: type });

      return res.json({ message: 'Atualizado com sucesso' });
    }

    const requirement = await knex('reqfunctional').where('id_reqfunctional', id_req);

    if (requirement.length < 1) {
      return res.status(401).send({
        message: 'Requisito não cadastrado ou com erro de cadastro',
      });
    } else {
      await knex('reqfunctional')
          .where('id_reqfunctional', id_req)
          .update({ descricao: description });
  
      return res.json({ message: 'Atualizado com sucesso' });
    }

  } catch (error) {
    next(error);
  }
}
