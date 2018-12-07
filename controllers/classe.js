// Appel des variables d'environnement
require('dotenv').config();
// Appel des packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Appel des models
const models = require('../models');


/**
 * Enregistre une nouvelle Classe
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createClasse = (req, res) => {

    // Récupération des informations utilisateur
    var nom = req.body.nom;
    var ecoleId = req.body.ecoleId;

    // Vérifie la présence de l'utilisateur en base de données
    models.Classe.findOne({
        where: { nom: nom }
    })
    .then( ( classeFound ) => {
        if ( !classeFound ) {
            var newClasse = models.Classe.create({
                nom: nom,
                ecoleId: ecoleId
            }) 
            .then ( (newClasse) => {
                return res.status(200).json({ 
                    success: true,
                    message: `Class ${newClasse.nom} correctly registered`
                })
            })
            .catch( (err) => {
                console.log(err);
                return res.status(500).json({ 
                    success: false,
                    message: 'Class can\'t be registered',
                    error: err
                })
            })
        } else {
            return res.status(409).json({ 
                'success': false,
                'message': 'Class already exist'
             });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            'success': false,
            'message': 'Class to verify user'
        });
    });
};

/**
 * Retourne la liste des écoles
 * @param {*} req
 * @param {*} res 
 */
module.exports.getAllClasse = (req, res) => {
    models.Classe.findAll()
    .then( ( ClassesFound ) => {
        if ( ClassesFound ) {
            return res.status(201).json({ 
                success: true,
                totalClasss: ClassesFound.length,
                classs: ClassesFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No class found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find class'
        });
    });
};

/**
 * Retourne une école grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.getClasse = (req, res) => {
    models.Classe.findOne({
        where: { id: req.params.id }
    })
    .then( ( classeFound ) => {
        if ( classeFound ) {
            return res.status(201).json({ 
                success: true,
                class: classeFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Class can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find class'
        });
    });
};

/**
 * Met à jour une école grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.updateClasse = (req, res) => {

    models.Classe.findById( req.params.id )
    .then( ( classeFound ) => {
        if ( classeFound ) {
            models.Classe.update(
                { nom: req.body.nom, },
                { where: { id: req.params.id } }
            )
            .then( (updatedClasse) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Class updated successfully',
                    updatedClass: updatedClasse
                })
            })
            .catch( (err) => {
                console.log(err);
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update class'
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Class can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find user'
        });
    });
};

/**
 * Supprime une école grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.deleteClasseById = (req, res) => {
    models.Classe.findOne({
        where: { id: req.params.id }
    })
    .then( ( classeFound ) => {
        if ( classeFound ) {
            models.Classe.destroy({
                where : {id: req.params.id}
            })
            .then( (deletedClasse) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Class deleted',
                    class: deletedClasse
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete class'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Class can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find class'
        });
    });
};
