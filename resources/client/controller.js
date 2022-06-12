const Client = require('../../models/Client');
const { validateModel } = require('./validator');

module.exports.create = async (req, resp) => {
  try {
    const modalData = await validateModel({ ...req.body });

    await Client.create(modalData);

    return resp.status(200).json({
      success: true,
      message: 'Cliente criado com sucesso',
    });
  } catch (err) {
    return resp.status(400).json({
      error: true,
      message: err.message,
    });
  }
};

module.exports.update = async (req, resp) => {
  try {
    const { id } = req.params;

    await Client.findByIdAndUpdate(id, { ...req.body });

    return resp.status(200).json({
      success: true,
      message: 'Cliente atualizado com sucesso',
    });
  } catch (err) {
    return resp.status(400).json({
      error: true,
      message: err.message,
    });
  }
};


module.exports.delete = async (req, resp) => {
  try {
    const { id } = req.params;

    await Client.findByIdAndRemove(id);
  
    return resp.status(200).json({
      success: true,
      message: 'Cliente removido com sucesso',
    });
  } catch (err) {
    return resp.status(400).json({
      error: true,
      message: err.message,
    });
  }
};

module.exports.get = async (req, resp) => {
  const results = await Client.find();
  return resp.status(200).json(results);
};

module.exports.getClientById = async (req, resp) => {
  const { id } = req.params
  try {
    const client = await Client.findById(id);

    if(client){
      return resp.status(200).json(client);
    }else {
      return resp.status(400).json({
        message: "Client not found"
      });
    }
  } catch(err) {
    return resp.status(400).json({
      error: err,
      message: "Error finding client"
    });
  }
};


