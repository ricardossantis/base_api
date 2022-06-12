const express = require('express');

const router = express.Router();

const ctrl = require('./controller');

router.post('/', ctrl.auth);
router.post('/forget_password', ctrl.password_request);
router.post('/reset_password', ctrl.password_reset);
router.post('/register', ctrl.store);

module.exports = router;
