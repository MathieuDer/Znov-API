var express = require('express');
var router = express.Router();

// Appel des controllers
const MatiereController = require('../controllers/matiere');

/* Get All Matiere */
router.get('/', MatiereController.getAllMatiere);

/* Get one Matiere */
router.get('/:id', MatiereController.getMatiere);

/* Create Matiere */
router.post('/', MatiereController.createMatiere);

/* Update Matiere */
router.put('/:id', MatiereController.updateMatiere);

/* Delete Matiere */
router.delete('/:id', MatiereController.deleteMatiere);

module.exports = router;