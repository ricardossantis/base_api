const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const multerConfig = require("../../config/multer");
const User = require("../../models/User");

const ctrl = require("./controller");

router.put("/edit/:id", ctrl.update);

router.post("/midia", multer(multerConfig).single("file"), async (req, res) => {
  try {
    const {
      query: { id },
      file: { destination, originalname },
    } = req;

    const bitmap = fs.readFileSync(req.file.path);
    const encImage = new Buffer(bitmap).toString("base64");

    const userObj = await User.findById(id).exec();

    userObj.profile_image = { nome: originalname, base64: encImage };

    await userObj.save();

    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Foto atualizada com sucesso!!",
    });
  } catch (err) {
    return resp.status(400).json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
