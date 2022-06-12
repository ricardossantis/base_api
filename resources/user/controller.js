const User = require('../../models/User');
const { validateModel, validateUpdateModel } = require('./validator');
const bcrypt = require('bcryptjs');

module.exports.create = async (req, resp) => {
  try {
    const { password } = req.body
    const saltRounds = 10

    const modalData = await validateModel({ ...req.body });

    bcrypt.hash(password, saltRounds, async function(err, hash) {
      modalData.password = hash
      await User.create(modalData);
    });

    return resp.status(200).json({
      success: true,
      message: 'Usuário criado com sucesso',
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

    const { password } = req.body
    const saltRounds = 10

    const modalData = await validateUpdateModel({ ...req.body });
    const { id } = req.params;

    if (password) {
      bcrypt.hash(password, saltRounds, async function(err, hash) {
        modalData.password = hash
        await User.findByIdAndUpdate(id, modalData);
      });
    } else {
      await User.findByIdAndUpdate(id, modalData);
    }
    
    return resp.status(200).json({
      success: true,
      message: 'Usuário atualizado com sucesso',
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
    await User.findByIdAndRemove(id);
    return resp.status(200).json({
      success: true,
      message: 'Usuário removido com sucesso',
    });
  } catch (err) {
    return resp.status(400).json({
      error: true,
      message: err.message,
    });
  }
};

module.exports.get = async (req, resp) => {
  const results = await User.find({});
  return resp.status(200).json(results);
};

module.exports.getUserByEmail = async (req, resp) => {
  const { email } = req.params
  try {
    const user = await User.findOne({ email });

    if(user){
      return resp.status(200).json(user);
    }else {
      return resp.status(400).json({
        message: "User not found"
      });
    }
  } catch(err) {
    return resp.status(400).json({
      error: err,
      message: "Error finding user"
    });
  }
};