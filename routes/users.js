var express = require('express');
var router = express.Router();

// Appel des controllers
const UserController = require('../controllers/user');

/* Register */
router.post('/register', (req, res, next) => { UserController.registerUser(req, res); });

// /* Login */
router.post('/login', (req, res, next) => { UserController.authenticateUser(req, res); });

module.exports = router;
