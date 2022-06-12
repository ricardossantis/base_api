const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt");

const User = require("../../models/User");
const AccessLog = require("../../models/AccessLog");

module.exports.auth = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne(
      {
        email,
        $or: [{ is_admin: true }],
      },
      {
        name: 1,
        email: 1,
        username: 1,
        first_access: 1,
        password: 1,
        is_admin: 1,
        profile_image: 1,
      }
    );

    if (user && bcrypt.compareSync(password, user.password)) {
      const { ...userWithoutPassword } = user.toObject();

      const accessLogObj = {
        user: user.get("id"),
        username: user.get("username"),
        access_date: new Date(),
        remote_ip: req.connection.remoteAddress,
      };

      const accessLog = await AccessLog.create(accessLogObj);

      const token = jwt.sign(
        {
          user_id: user.get("id"),
          roles: user.get("roles"),
          access_key: accessLog.get("_id"),
        },
        jwtConfig.secret,
        {
          expiresIn: "12h",
        }
      );

      res.status(200).json({
        ...userWithoutPassword,
        token,
      });
    } else {
      res.status(400).json({
        error: true,
        data: "Usuário não encontrado",
      });
    }
  } catch (e) {
    console.log("err", e);
    res.status(400).json({
      error: true,
      data: e.message,
    });
  }
};

module.exports.password_request = async (req, res) => {
  try {
    const { email, url } = req.body;

    const user = await User.findOne({
      email,
    });

    const token = jwt.sign(
      {
        email,
      },
      jwtConfig.secret,
      {
        expiresIn: "1h",
      }
    );

    user.remember_token = token;

    const result = await user.save();

    res.status(200).json({ result, info });
  } catch (err) {
    console.log("Auth :: err", err);
    res.status(400).json({
      error: true,
      data: JSON.stringify(err),
    });
  }
};

module.exports.password_reset = async (req, res) => {
  try {
    const { token, password } = req.body;

    jwt.verify(token, jwtConfig.secret, {
      expiresIn: "1h",
    });

    const user = await User.findOne({
      remember_token: token,
    });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    user.password = hash;
    user.remember_token = "";

    const result = await user.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: true,
      data: JSON.stringify(err),
    });
  }
};

module.exports.store = async (req, res) => {
  const userData = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userData.password, salt);

  userData.password = hash;
  userData.first_access = true;

  const user = await User.create(userData);

  res.status(200).json({
    success: true,
    message: "Cliente criado com sucesso",
    data: user,
  });
};

