var express = require('express');
var router = express.Router();

// Appel des controllers
const UserController = require('../controllers/user');

/* Login */
router.post('/login', UserController.authenticateUser);

module.exports = router;
