var express = require('express');
var router = express.Router();

// Appel des controllers
const SalleController = require('../controllers/salle');

/* Get All Salle */
router.get('/', SalleController.getAllSalle);

/* Create Salle */
router.get('/:id', SalleController.getSalle);

/* Create Salle */
router.post('/', SalleController.createSalle);

/* Update Salle */
router.put('/:id', SalleController.updateSalle);

/* Delete Salle */
router.delete('/:id', SalleController.deleteSalleById);

module.exports = router;