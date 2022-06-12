const bcrypt = require("bcryptjs");
const base64Img = require("base64-img");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const jwtConfig = require("../../config/jwt");

module.exports.update = async (req, resp) => {
  const {
    params: { id },
    body,
  } = req;

  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, jwtConfig.secret);

    if (user.user_id !== id) {
      return resp.status(400).json({
        error: true,
        message: "Você não tem permissão para esta ação.",
      });
    }

    const userData = {};

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);

    userData.password = hash;
    const userObj = await User.findById(id).exec();

    console.log("userObj", userObj);

    userObj.password = userData.password;
    userObj.first_access = false;

    await userObj.save();

    return resp.status(200).json({
      success: true,
      message: "Perfil atualizado com sucesso",
    });
  } catch (err) {
    console.log("ERROR", err);
    return resp.status(400).json({
      error: true,
      message: err,
    });
  }
};

module.exports.get = async (req, resp) => {
  const results = await User.find();

  resp.status(200).json(results);
};
