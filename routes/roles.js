var express = require('express');
var router = express.Router();
const passport = require('passport');

// Appel des controllers
const RoleController = require('../controllers/role');

/* Get All Role */
router.get('/', RoleController.getAllRole);
// router.get('/', passport.authenticate('jwt', { session: false }), RoleController.getAllEcole);

/* Create Role */
router.get('/:id', RoleController.getRole);
// router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { RoleController.registerUser(req, res); });

/* Create Role */
router.post('/', RoleController.createRole);
// router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => { RoleController.registerUser(req, res); });

/* Update Role */
router.put('/:id', RoleController.updateRole);
// router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { RoleController.updateUserProfile(req, res); });

/* Delete Role */
router.delete('/:id', RoleController.deleteRoleById);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), RoleController.deleteUserById);

module.exports = router;