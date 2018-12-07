var express = require('express');
var router = express.Router();
const passport = require('passport');

// Appel des controllers
const ClasseController = require('../controllers/classe');

/* Get All Modules */
router.get('/', ClasseController.getAllClasse);
// router.get('/', passport.authenticate('jwt', { session: false }), EcoleController.getAllEcole);

/* Create Ecole */
router.get('/:id', ClasseController.getClasse);
// router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { EcoleController.registerUser(req, res); });

/* Create Ecole */
router.post('/', ClasseController.createClasse);
// router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => { EcoleController.registerUser(req, res); });

/* Update Module */
router.put('/:id', ClasseController.updateClasse);
// router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { EcoleController.updateUserProfile(req, res); });

/* Delete Module */
router.delete('/:id', ClasseController.deleteClasseById);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), EcoleController.deleteUserById);


module.exports = router;