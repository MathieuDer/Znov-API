// Appel des variables d'environnement
require('dotenv').config();
// Appel des packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Appel des models
const models = require('../models');

/**
 * Retourne un module grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.getModuleProfile = (req, res) => {
    models.Module.findOne({
        attributes: {
          },
        where: { id: req.params.id }
    })
    .then( ( modulesFound ) => {
        if ( modulesFound ) {
            return res.status(201).json({ 
                success: true,
                user: modulesFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Module can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find module'
        });
    });
};

/**
 * affiche les modules
 * @param {*} req
 * @param {*} res
 */
module.exports.getAllModules= (req, res) => {
var intitule = req.body.intitule;

    models.Module.findAll({
        attributes: {
          }
    })
    .then( ( modulesFound ) => {
        if ( modulesFound ) {
            return res.status(201).json({ 
                success: true,
                totalModules: modulesFound.length,
                user: modulesFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No module found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find module'
        });
    });
};



/**
 * Creer intitule module
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createModule= (req, res) => {
    var intitule = req.body.intitule;
    models.Module.findOne({
        where: {intitule: intitule}
    })
    .then( ( modulesFound ) => {
        if ( !modulesFound ) {
            
                var newModule = models.Module.create({
                    intitule: intitule
                })
                .then ( (newModule) => {
                    return res.status(200).json({ 
                        'success': true,
                        'message': `Module ${newModule.intitule} correctly registered`
                    })
                })
                .catch( (err) => {
                    console.log(err);
                    return res.status(500).json({ 
                        'success': false,
                        'message': 'Module can\'t be registered'
                    })
                })
        } else {
            return res.status(409).json({ 
                'success': false,
                'message': 'Module already exist'
             });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            'success': false,
            'message': 'Unable to verify module'
        });
    });

};

/**
 * Update module
 * @param {*} req 
 * @param {*} res 
 */
module.exports.updateModule= (req, res) => {

    models.Module.findById(req.params.id )
    .then( ( modulesFound ) => {
        if ( modulesFound ) {
            models.Module.update(
                {
                    intitule: req.body.intitule
                },
                {where: { id: req.params.id }
            })
            .then( (updatedModule) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Module updated successfully',
                    updatedUser: updatedModule
                })
            })
            .catch( (err) => {
                console.log(err);
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update module'
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Module can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find module'
        });
    });
};


/**
 * Supprimer module
 * @param {*} req 
 * @param {*} res 
 */
module.exports.deleteModule= (req, res) => {
    models.Module.findOne({
        where: { id: req.params.id }
    })
    .then( ( modulesFound ) => {
        if ( modulesFound ) {
            models.Module.destroy({
                where : {id: req.params.id}
            })
            .then( (deletedModule) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Module deleted',
                    user: deletedModule
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete module'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Module can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find module'
        });
    });
};