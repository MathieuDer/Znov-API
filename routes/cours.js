var express = require('express');
var router = express.Router();
const passport = require('passport');

// Appel des controllers
const CoursController = require('../controllers/cour');

/* Get All Modules */
router.get('/', CoursController.getAllCours);
// router.get('/', passport.authenticate('jwt', { session: false }), EcoleController.getAllEcole);

/* Create Ecole */
router.get('/:id', CoursController.getCours);
// router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { EcoleController.registerUser(req, res); });

/* Create Ecole */
router.post('/', CoursController.createCours);
// router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => { EcoleController.registerUser(req, res); });

/* Update Module */
router.put('/:id', CoursController.updateCours);
// router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { EcoleController.updateUserProfile(req, res); });

/* Delete Module */
router.delete('/:id', CoursController.deleteCoursById);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), EcoleController.deleteUserById);


module.exports = router;