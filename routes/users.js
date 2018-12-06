var express = require('express');
var router = express.Router();

const passport = require('passport');

// Appel des controllers
const UserController = require('../controllers/user');

/* Register */
router.post('/register', (req, res, next) => { UserController.registerUser(req, res); });

/* Login */
router.post('/login', (req, res, next) => { UserController.authenticateUser(req, res); });

/* Get All Users */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => { UserController.getAllUsers(req, res); });

/* Get Profile */
router.get('/profiles/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { UserController.getUserProfile(req, res); });

/* Update User */
router.put('/profiles/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { UserController.updateUserProfile(req, res); });

/* Delete User */
router.delete('/profiles/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { UserController.deleteUserById(req, res); });

module.exports = router;
