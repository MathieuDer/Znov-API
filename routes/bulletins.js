var express = require('express');
var router = express.Router();
const passport = require('passport');

// Appel des controllers
const BulletinController = require('../controllers/bulletin');

/* Get All Bulletin */
router.get('/', BulletinController.getAllBulletin);
// router.get('/', passport.authenticate('jwt', { session: false }), BulletinController.getAllEcole);

/* Create Bulletin */
router.get('/:id', BulletinController.getBulletin);
// router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { BulletinController.registerUser(req, res); });

/* Create Bulletin */
router.post('/', BulletinController.createBulletin);
// router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => { BulletinController.registerUser(req, res); });

/* Update Bulletin */
router.put('/:id', BulletinController.updateBulletin);
// router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { BulletinController.updateUserProfile(req, res); });

/* Delete Bulletin */
router.delete('/:id', BulletinController.deleteBulletinById);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), BulletinController.deleteUserById);

module.exports = router;