// Appel des variables d'environnement
require('dotenv').config();

// Appel des models
const models = require('../models');


/**
 * Enregistre une nouvelle classe
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createClasse = (req, res) => {

    // Récupération des informations de la classe
    var nom = req.body.nom;
    var ecoleId = req.body.ecoleId;

    // Vérifie la présence de la classe en base de données
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
                return res.status(500).json({ 
                    success: false,
                    message: 'Class can\'t be registered'
                })
            })
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Class already exist'
             });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to verify class'
        });
    });
};

/**
 * Retourne la liste des classes
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
                class: ClassesFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No class found' 
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

/**
 * Retourne une classe grace à l'Id
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
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find class'
        });
    });
};

/**
 * Met à jour une classe grace à l'Id
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
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find class'
        });
    });
};

/**
 * Supprime une classe grace à l'Id
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
                    class: classeFound
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
