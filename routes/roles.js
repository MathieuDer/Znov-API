var express = require('express');
var router = express.Router();

// Appel des controllers
const RoleController = require('../controllers/role');
const UserController = require('../controllers/user');

/* Get All Role */
router.get('/', RoleController.getAllRole);

/* Create Role */
router.get('/:id', RoleController.getRole);

/* Create Role */
router.post('/', RoleController.createRole);

/* Update Role */
router.put('/:id', RoleController.updateRole);

/* Delete Role */
router.delete('/:id', RoleController.deleteRoleById);


/* --- CUSTOM ROUTES --- */
router.get('/:idRole/users', UserController.getUsersByRole);


module.exports = router;