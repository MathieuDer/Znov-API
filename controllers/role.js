// Appel des variables d'environnement
require('dotenv').config();

// Appel des models
const models = require('../models');


/**
 * Enregistre une nouvelle Role
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createRole = (req, res) => {

    // Récupération des informations utilisateur
    var nom = req.body.nom;

    // Vérifie la présence de l'utilisateur en base de données
    models.Role.findOne({
        where: { nom: nom }
    })
    .then( ( roleFound ) => {
        if ( !roleFound ) {
            var newRole = models.Role.create({
                nom: nom
            })
            .then ( (newRole) => {
                return res.status(200).json({ 
                    success: true,
                    message: `Role ${newRole.nom} correctly registered`
                })
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Role can\'t be registered'
                })
            })
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Role already exist'
             });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to verify role'
        });
    });
};

/**
 * Retourne la liste des roles
 * @param {*} req
 * @param {*} res 
 */
module.exports.getAllRole = (req, res) => {
    models.Role.findAll()
    .then( ( RolesFound ) => {
        if ( RolesFound ) {
            return res.status(201).json({ 
                success: true,
                totalRoles: RolesFound.length,
                roles: RolesFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No role found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find role'
        });
    });
};

/**
 * Retourne une role grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.getRole = (req, res) => {
    models.Role.findOne({
        where: { id: req.params.id }
    })
    .then( ( roleFound ) => {
        if ( roleFound ) {
            return res.status(201).json({ 
                success: true,
                role: roleFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Role can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find role'
        });
    });
};

/**
 * Met à jour une role grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.updateRole = (req, res) => {

    models.Role.findById( req.params.id )
    .then( ( roleFound ) => {
        if ( roleFound ) {
            models.Role.update(
                { nom: req.body.nom },
                { where: { id: req.params.id } }
            )
            .then( (updatedRole) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Role updated successfully',
                    updatedRole: updatedRole
                })
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update role'
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Role can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find role'
        });
    });
};

/**
 * Supprime une role grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.deleteRoleById = (req, res) => {
    models.Role.findOne({
        where: { id: req.params.id }
    })
    .then( ( roleFound ) => {
        if ( roleFound ) {
            models.Role.destroy({
                where : {id: req.params.id}
            })
            .then( (deletedRole) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Role deleted',
                    role: roleFound
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete role'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Role can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find role'
        });
    });
};
