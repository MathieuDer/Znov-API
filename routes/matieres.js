var express = require('express');
var router = express.Router();
const passport = require('passport');

// Appel des controllers
const MatiereController = require('../controllers/matiere');

/* Get All Matiere */
router.get('/', MatiereController.getAllMatiere);
// router.get('/profiles/:id', passport.authenticate('jwt', { session: false }), MatiereController.getAllMatiere);

/* Get one Matiere */
router.get('/:id', MatiereController.getMatiereProfile);
//router.get('/profiles/:id', passport.authenticate('jwt', { session: false }), MatiereController.getMatiereProfile);

/* Create Matiere */
router.post('/', MatiereController.createMatiere);
//router.post('/register', passport.authenticate('jwt', { session: false }), ModuleController.createMatiere);

/* Update Matiere */
router.put('/:id', MatiereController.updateMatiere);
//router.put('/profiles/:id', passport.authenticate('jwt', { session: false }), MatiereController.updateMatiere);

/* Delete Matiere */
router.delete('/:id', MatiereController.deleteMatiere);
//router.delete('/profiles/:id', passport.authenticate('jwt', { session: false }), MatiereController.deleteMatiere);


module.exports = router;