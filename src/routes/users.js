const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/login', controller.loginForm);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

module.exports = router;
