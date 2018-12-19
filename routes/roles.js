var express = require('express');
var router = express.Router();

// Appel des controllers
const RoleController = require('../controllers/role');

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

module.exports = router;