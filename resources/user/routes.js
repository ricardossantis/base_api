const express = require('express');

const ctrl = require('./controller');

const router = express.Router();

router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);
router.get('/', ctrl.get);
router.get('/:email', ctrl.getUserByEmail);

module.exports = router;
