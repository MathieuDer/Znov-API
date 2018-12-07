var express = require('express');
var router = express.Router();
const passport = require('passport');

// Appel des controllers
const EcoleController = require('../controllers/ecole');

/* Get All Modules */
router.get('/', EcoleController.getAllEcole);
// router.get('/', passport.authenticate('jwt', { session: false }), EcoleController.getAllEcole);

/* Create Ecole */
router.get('/:id', EcoleController.getEcole);
// router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { EcoleController.registerUser(req, res); });

/* Create Ecole */
router.post('/', EcoleController.createEcole);
// router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => { EcoleController.registerUser(req, res); });

/* Update Module */
router.put('/:id', EcoleController.updateEcole);
// router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { EcoleController.updateUserProfile(req, res); });

/* Delete Module */
router.delete('/:id', EcoleController.deleteEcoleById);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), EcoleController.deleteUserById);


module.exports = router;