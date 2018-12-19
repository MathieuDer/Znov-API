var express = require('express');
var router = express.Router();

// Appel des controllers
const CoursController = require('../controllers/cours');

/* Get All Modules */
router.get('/', CoursController.getAllCours);

/* Create Ecole */
router.get('/:id', CoursController.getCours);

/* Create Ecole */
router.post('/', CoursController.createCours);

/* Update Module */
router.put('/:id', CoursController.updateCours);

/* Delete Module */
router.delete('/:id', CoursController.deleteCoursById);

module.exports = router;