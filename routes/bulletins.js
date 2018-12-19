var express = require('express');
var router = express.Router();

// Appel des controllers
const BulletinController = require('../controllers/bulletin');

/* Get All Bulletin */
router.get('/', BulletinController.getAllBulletin);

/* Create Bulletin */
router.get('/:id', BulletinController.getBulletin);

/* Create Bulletin */
router.post('/', BulletinController.createBulletin);

/* Update Bulletin */
router.put('/:id', BulletinController.updateBulletin);

/* Delete Bulletin */
router.delete('/:id', BulletinController.deleteBulletinById);

module.exports = router;