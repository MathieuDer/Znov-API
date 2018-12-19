var express = require('express');
var router = express.Router();

// Appel des controllers
const ModuleController = require('../controllers/module');

/* Get All Modules */
router.get('/', ModuleController.getAllModules);

/* Get one module */
router.get('/:id', ModuleController.getModule);

/* Create module */
router.post('/', ModuleController.createModule);

/* Update Module */
router.put('/:id', ModuleController.updateModule);

/* Delete Module */
router.delete('/:id', ModuleController.deleteModule);

module.exports = router;