const express = require("express");
const authorize = require("../middleware/authorize");

const router = express.Router();

const auth = require("../resources/auth/routes");
const clients = require("../resources/client/routes");
const users = require("../resources/user/routes");
const profile = require("../resources/profile/routes");
const adminAuth = require("../resources/admin/auth/routes");

router.use("/auth", auth);
router.use("/clients", clients);
router.use("/profile", authorize, profile);

router.use("/admin/clients", authorize, clients);
router.use("/admin/users", authorize, users);
router.use("/admin/auth", adminAuth);

module.exports = router;
