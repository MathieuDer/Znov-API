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
module.exports.getMatiereProfile = (req, res) => {
    models.Matiere.findOne({
        attributes: {
          },
        where: { id: req.params.id }
    })
    .then( ( matiereFound ) => {
        if ( matiereFound ) {
            return res.status(201).json({ 
                success: true,
                user: matiereFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Matiere can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find Matiere'
        });
    });
};

/**
 * affiche les modules
 * @param {*} req
 * @param {*} res
 */
module.exports.getAllMatiere= (req, res) => {
var intitule = req.body.intitule;
var moduleId = req.body.moduleId;

    models.Matiere.findAll({
        attributes: {
          }
    })
    .then( ( matiereFound ) => {
        if ( matiereFound ) {
            return res.status(201).json({ 
                success: true,
                totalMatiere: matiereFound.length,
                user: matiereFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No matiere found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find matiere'
        });
    });
};



/**
 * Creer intitule module
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createMatiere= (req, res) => {
    var intitule = req.body.intitule;
    var moduleId = req.body.moduleId;

    models.Matiere.findOne({
        where: {intitule:intitule}
    })
    .then( ( matiereFound ) => {
        if ( !matiereFound ) {
            
                var newMatiere = models.Matiere.create({
                    intitule: intitule
                })
                .then ( (newMatiere) => {
                    return res.status(200).json({ 
                        'success': true,
                        'message': `Matiere ${newMatiere.intitule} correctly registered`
                    })
                })
                .catch( (err) => {
                    console.log(err);
                    return res.status(500).json({ 
                        'success': false,
                        'message': 'Matiere can\'t be registered'
                    })
                })
        } else {
            return res.status(409).json({ 
                'success': false,
                'message': 'Matiere already exist'
             });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            'success': false,
            'message': 'Unable to verify Matiere'
        });
    });

};

/**
 * Update module
 * @param {*} req 
 * @param {*} res 
 */
module.exports.updateMatiere= (req, res) => {

    var intitule = req.body.intitule;
    var moduleId = req.body.moduleId;

    models.Matiere.findById(req.params.id )
    .then( ( matiereFound ) => {
        if ( matiereFound ) {
            models.Matiere.update(
                {
                    intitule: req.body.intitule
                },
                {where: { id: req.params.id }
            })
            .then( (updatedMatiere) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Matiere updated successfully',
                    updatedUser: updatedMatiere
                })
            })
            .catch( (err) => {
                console.log(err);
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update Matiere'
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Matiere can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find matiere'
        });
    });
};


/**
 * Supprimer module
 * @param {*} req 
 * @param {*} res 
 */
module.exports.deleteMatiere= (req, res) => {

    var intitule = req.body.intitule;
    var moduleId = req.body.moduleId;

    models.Matiere.findOne({
        where: { id: req.params.id }
    })
    .then( ( matiereFound ) => {
        if ( matiereFound ) {
            models.Matiere.destroy({
                where : {id: req.params.id}
            })
            .then( (deletedMatiere)=> {
                return res.status(200).json({ 
                    success: true,
                    message: 'Matiere deleted',
                    user: deletedMatiere
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete matiere'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Matiere can\'t be found' 
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