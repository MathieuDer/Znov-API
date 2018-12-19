var express = require('express');
var router = express.Router();

// Appel des controllers
const EcoleController = require('../controllers/ecole');

/* Get All Modules */
router.get('/', EcoleController.getAllEcole);

/* Create Ecole */
router.get('/:id', EcoleController.getEcole);

/* Create Ecole */
router.post('/', EcoleController.createEcole);

/* Update Module */
router.put('/:id', EcoleController.updateEcole);

/* Delete Module */
router.delete('/:id', EcoleController.deleteEcoleById);

module.exports = router;