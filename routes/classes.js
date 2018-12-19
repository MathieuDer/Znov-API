var express = require('express');
var router = express.Router();

// Appel des controllers
const ClasseController = require('../controllers/classe');

/* Get All Modules */
router.get('/', ClasseController.getAllClasse);

/* Create Ecole */
router.get('/:id', ClasseController.getClasse);

/* Create Ecole */
router.post('/', ClasseController.createClasse);

/* Update Module */
router.put('/:id', ClasseController.updateClasse);

/* Delete Module */
router.delete('/:id', ClasseController.deleteClasseById);

module.exports = router;