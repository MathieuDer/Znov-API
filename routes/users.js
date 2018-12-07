var express = require('express');
var router = express.Router();

const passport = require('passport');

// Appel des controllers
const UserController = require('../controllers/user');

/* Register */
router.post('/register', UserController.registerUser);

/* Login */
router.post('/login', UserController.authenticateUser);

/* Get All Users */
router.get('/', passport.authenticate('jwt', { session: false }), UserController.getAllUsers);

/* Get Profile */
router.get('/profiles/:id', passport.authenticate('jwt', { session: false }), UserController.getUserProfile);

/* Update User */
router.put('/profiles/:id', passport.authenticate('jwt', { session: false }), UserController.updateUserProfile);

/* Delete User */
router.delete('/profiles/:id', passport.authenticate('jwt', { session: false }), UserController.deleteUserById);

module.exports = router;
