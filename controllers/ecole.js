// Appel des variables d'environnement
require('dotenv').config();

// Appel des models
const models = require('../models');

/**
 * Enregistre une nouvelle Ecole
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createEcole = (req, res) => {

    // Récupération des informations de l'école
    var nom = req.body.nom;

    // Vérifie la présence de l'école en base de données
    models.Ecole.findOne({
        where: { nom: nom }
    })
    .then( ( ecoleFound ) => {
        if ( !ecoleFound ) {
            var newEcole = models.Ecole.create({
                nom: nom
            })
            .then ( (newEcole) => {
                return res.status(200).json({ 
                    success: true,
                    message: `School ${newEcole.nom} correctly registered`
                })
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'School can\'t be registered'
                })
            })
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'School already exist'
             });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to verify school'
        });
    });
};

/**
 * Retourne la liste des écoles
 * @param {*} req
 * @param {*} res 
 */
module.exports.getAllEcole = (req, res) => {
    models.Ecole.findAll()
    .then( ( EcolesFound ) => {
        if ( EcolesFound ) {
            return res.status(201).json({ 
                success: true,
                totalSchools: EcolesFound.length,
                schools: EcolesFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No school found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find school'
        });
    });
};

/**
 * Retourne une école grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.getEcole = (req, res) => {
    models.Ecole.findOne({
        where: { id: req.params.id }
    })
    .then( ( ecoleFound ) => {
        if ( ecoleFound ) {
            return res.status(201).json({ 
                success: true,
                school: ecoleFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'School can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find school'
        });
    });
};

/**
 * Met à jour une école grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.updateEcole = (req, res) => {

    models.Ecole.findById( req.params.id )
    .then( ( ecoleFound ) => {
        if ( ecoleFound ) {
            models.Ecole.update(
                { nom: req.body.nom, },
                { where: { id: req.params.id } }
            )
            .then( (updatedEcole) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'School updated successfully',
                    updatedSchool: updatedEcole
                })
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update school'
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'School can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find school'
        });
    });
};

/**
 * Supprime une école grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.deleteEcoleById = (req, res) => {
    models.Ecole.findOne({
        where: { id: req.params.id }
    })
    .then( ( ecoleFound ) => {
        if ( ecoleFound ) {
            models.Ecole.destroy({
                where : {id: req.params.id}
            })
            .then( (deletedEcole) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'School deleted',
                    school: ecoleFound
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete school'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'School can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find school'
        });
    });
};
