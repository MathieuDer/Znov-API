var express = require('express');
var router = express.Router();

const passport = require('passport');

// Appel des controllers
const UserController = require('../controllers/module');

/* Get All Modules */
router.get();

/* Create module */
router.post('/register', (req, res, next) => { UserController.registerUser(req, res); });

/* Update Module */
router.put('/profiles/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { UserController.updateUserProfile(req, res); });

/* Delete Module */
router.delete('/profiles/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { UserController.deleteUserById(req, res); });


module.exports = router;