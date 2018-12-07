// Appel des variables d'environnement
require('dotenv').config();
// Appel des packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Appel des models
const models = require('../models');


/**
 * Enregistre une nouvelle Salle
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createSalle = (req, res) => {

    // Récupération des informations utilisateur
    var numero = req.body.numero;
    var etage = req.body.etage;
    var description = req.body.description;
    var batiment = req.body.batiment;

    // Vérifie la présence de l'utilisateur en base de données
    models.Salle.findOne({
        where: { numero: numero }
    })
    .then( ( ecoleFound ) => {
        if ( !ecoleFound ) {
            var newSalle = models.Salle.create({
                numero: numero,
                etage: etage,
                description: description,
                batiment: batiment
            })
            .then ( (newSalle) => {
                return res.status(200).json({ 
                    'success': true,
                    'message': `Room ${newSalle.numero} correctly registered`
                })
            })
            .catch( (err) => {
                console.log(err);b
                return res.status(500).json({ 
                    'success': false,
                    'message': 'Room can\'t be registered'
                })
            })
        } else {
            return res.status(409).json({ 
                'success': false,
                'message': 'Room already exist'
             });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            'success': false,
            'message': 'Unable to verify room'
        });
    });
};

/**
 * Retourne la liste des salles
 * @param {*} req
 * @param {*} res 
 */
module.exports.getAllSalle = (req, res) => {
    models.Salle.findAll()
    .then( ( SallesFound ) => {
        if ( SallesFound ) {
            return res.status(201).json({ 
                success: true,
                totalRooms: SallesFound.length,
                rooms: SallesFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No room found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find room'
        });
    });
};

/**
 * Retourne une salle grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.getSalle = (req, res) => {
    models.Salle.findOne({
        where: { id: req.params.id }
    })
    .then( ( ecoleFound ) => {
        if ( ecoleFound ) {
            return res.status(201).json({ 
                success: true,
                room: ecoleFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Room can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find room'
        });
    });
};

/**
 * Met à jour une salle grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.updateSalle = (req, res) => {

    models.Salle.findById( req.params.id )
    .then( ( ecoleFound ) => {
        if ( ecoleFound ) {
            models.Salle.update(
                { 
                    numero: req.body.numero,
                    etage: req.body.etage,
                    description: req.body.description,
                    batiment: req.body.batiment
                },
                { where: { id: req.params.id } }
            )
            .then( (updatedSalle) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Room updated successfully',
                    updatedRoom: updatedSalle
                })
            })
            .catch( (err) => {
                console.log(err);
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update room'
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Room can\'t be found' 
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
 * Supprime une salle grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.deleteSalleById = (req, res) => {
    models.Salle.findOne({
        where: { id: req.params.id }
    })
    .then( ( ecoleFound ) => {
        if ( ecoleFound ) {
            models.Salle.destroy({
                where : {id: req.params.id}
            })
            .then( (deletedSalle) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Room deleted',
                    room: deletedSalle
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete room'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Room can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find room'
        });
    });
};
