const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:uid', userController.getUser);
router.post('/:uid', userController.createUser);
router.patch('/:uid', userController.updateUser);

module.exports = router;
