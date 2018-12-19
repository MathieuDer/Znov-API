// Appel des variables d'environnement
require('dotenv').config();

// Appel des models
const models = require('../models');

/**
 * Enregistre un nouveau module
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createModule= (req, res) => {
    
    // Récupération des informations du module
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
        return res.status(500).json({ 
            'success': false,
            'message': 'Unable to verify module'
        });
    });

};

/**
 * Retourne la liste des modules
 * @param {*} req
 * @param {*} res
 */
module.exports.getAllModules= (req, res) => {
    
        models.Module.findAll()
        .then( ( modulesFound ) => {
            if ( modulesFound ) {
                return res.status(201).json({ 
                    success: true,
                    totalModules: modulesFound.length,
                    module: modulesFound
                });
            } else {
                return res.status(409).json({ 
                    success: false,
                    message: 'No module found' 
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

/**
 * Retourne un module grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.getModule = (req, res) => {

    models.Module.findOne({
        where: { id: req.params.id }
    })
    .then( ( modulesFound ) => {
        if ( modulesFound ) {
            return res.status(201).json({ 
                success: true,
                module: modulesFound
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

/**
 * Met à jour un module grace à l'Id
 * @param {*} req 
 * @param {*} res 
 */
module.exports.updateModule= (req, res) => {

    models.Module.findById(req.params.id)
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
                    updatedModule: updatedModule
                })
            })
            .catch( (err) => {
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
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find module'
        });
    });
};

/**
 * Supprime un module grace à l'Id
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
                    module: modulesFound
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