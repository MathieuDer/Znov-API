var express = require('express');
var router = express.Router();
const passport = require('passport');

// Appel des controllers
const SalleController = require('../controllers/salle');

/* Get All Salle */
router.get('/', SalleController.getAllSalle);
// router.get('/', passport.authenticate('jwt', { session: false }), SalleController.getAllSalle);

/* Create Salle */
router.get('/:id', SalleController.getSalle);
// router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { SalleController.registerUser(req, res); });

/* Create Salle */
router.post('/', SalleController.createSalle);
// router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => { SalleController.registerUser(req, res); });

/* Update Salle */
router.put('/:id', SalleController.updateSalle);
// router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { SalleController.updateUserProfile(req, res); });

/* Delete Salle */
router.delete('/:id', SalleController.deleteSalleById);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), SalleController.deleteUserById);


module.exports = router;