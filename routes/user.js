const express = require('express');

const router = express.Router();

const userController = require('../controllers/user')

router.post('/add-users', userController.addUser);

router.get('/get-users', userController.getUser);

router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;