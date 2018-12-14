var express = require('express');
var router = express.Router();
const passport = require('passport');

// Appel des controllers
const ModuleController = require('../controllers/module');

/* Get All Modules */
router.get('/', ModuleController.getAllModules);
//router.get('/profiles/:id', passport.authenticate('jwt', { session: false }), ModuleController.getAllModules);

/* Get one module */
router.get('/:id', ModuleController.getModule);
//router.get('/profiles/:id', passport.authenticate('jwt', { session: false }), ModuleController.getModuleProfile);

/* Create module */
router.post('/', ModuleController.createModule);
//router.post('/register', ModuleController.createModule);

/* Update Module */
router.put('/:id', ModuleController.updateModule);
//router.put('/profiles/:id', passport.authenticate('jwt', { session: false }), ModuleController.updateModule);

/* Delete Module */
router.delete('/:id', ModuleController.deleteModule);
//router.delete('/profiles/:id', passport.authenticate('jwt', { session: false }), ModuleController.deleteModule);


module.exports = router;