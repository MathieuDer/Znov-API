// Appel des variables d'environnement
require('dotenv').config();
// Appel des packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Appel des models
const models = require('../models');


/**
 * Enregistre une nouvelle Ecole
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createCours = (req, res) => {

    // Récupération des informations utilisateur
    var intitule = req.body.intitule;
    var debut = req.body.debut;
    var fin = req.body.fin;
    //var matiereId = req.body.matiereId;
    //var salleId = req.body.salleId;
    //var intervenantId = req.body.intervenantId;


    // Vérifie la présence de l'utilisateur en base de données
    models.Cours.findOne({
        where: { intitule: intitule}
    })
    .then( ( coursFound ) => {
        if ( !coursFound ) {
            var newEcole = models.Cours.create({
                intitule: intitule,
                debut: debut,
                fin: fin,
                //matiereId: matiereId
                //salleId: salleId,
                //intervenantId: intervenantId

            })
            .then ( (newCours) => {
                return res.status(200).json({ 
                    'success': true,
                    'message': `Cours ${newCours.intitule} correctly registered`
                })
            })
            .catch( (err) => {
                console.log(err);
                return res.status(500).json({ 
                    'success': false,
                    'message': 'Cours can\'t be registered'
                })
            })
        } else {
            return res.status(409).json({ 
                'success': false,
                'message': 'Cours already exist'
             });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            'success': false,
            'message': 'Cours to verify user'
        });
    });
};

/**
 * Retourne la liste des écoles
 * @param {*} req
 * @param {*} res 
 */
module.exports.getAllCours = (req, res) => {
    models.Cours.findAll()
    .then( ( CoursFound ) => {
        if ( CoursFound ) {
            return res.status(201).json({ 
                success: true,
                totalCours: CoursFound.length,
                Cours: CoursFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No Cours found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find Cours'
        });
    });
};

/**
 * Retourne une école grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.getCours = (req, res) => {
    models.Cours.findOne({
        where: { id: req.params.id }
    })
    .then( ( coursFound ) => {
        if ( coursFound ) {
            return res.status(201).json({ 
                success: true,
                school: coursFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Cours can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find Cours'
        });
    });
};

/**
 * Met à jour une école grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.updateCours = (req, res) => {

    models.Ecole.findById( req.params.id )
    .then( ( coursFound ) => {
        if ( coursFound ) {
            models.Cours.update(
                { intitule: req.body.intitule, },
                { where: { id: req.params.id } }
            )
            .then( (updatedCours) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Cours updated successfully',
                    updatedSchool: updatedCours
                })
            })
            .catch( (err) => {
                console.log(err);
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update Cours'
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Cours can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find Cours'
        });
    });
};

/**
 * Supprime une école grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.deleteCoursById = (req, res) => {
    models.Cours.findOne({
        where: { id: req.params.id }
    })
    .then( ( coursFound ) => {
        if ( coursFound ) {
            models.Cours.destroy({
                where : {id: req.params.id}
            })
            .then( (deletedCours) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Cours deleted',
                    school: deletedCours
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete cours'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Cours can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find cours'
        });
    });
};
