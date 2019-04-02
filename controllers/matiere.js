// Appel des variables d'environnement
require('dotenv').config();

// Appel des models
const models = require('../models');

/**
 * Enregistre une nouvelle Matière
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createMatiere= (req, res) => {

    // Récupération des informations de la matière
    var intitule = req.body.intitule;
    var moduleId = req.body.moduleId;

    // Vérifie la présence de la matière en base de données
    models.Matiere.findOne({
        where: { intitule: intitule }
    })
    .then( ( matiereFound ) => {
        if ( !matiereFound ) {
                var newMatiere = models.Matiere.create({
                    intitule: intitule,
                    moduleId: moduleId
                })
                .then ( (newMatiere) => {
                    return res.status(200).json({ 
                        success: true,
                        message: `Subject ${newMatiere.intitule} correctly registered`
                    })
                })
                .catch( (err) => {
                    return res.status(500).json({ 
                        success: false,
                        message: 'Subject can\'t be registered'
                    })
                })
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Subject already exist'
             });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to verify Subject',
            error: err
        });
    });

};

/**
 * Retourne la liste des Matières
 * @param {*} req
 * @param {*} res
 */
module.exports.getAllMatiere= (req, res) => {

    models.Matiere.findAll()
    .then( ( matiereFound ) => {
        if ( matiereFound ) {
            return res.status(201).json({ 
                success: true,
                totalMatiere: matiereFound.length,
                matiere: matiereFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No subject found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find subject'
        });
    });
};

/**
 * Retourne une matière grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.getMatiere = (req, res) => {
    models.Matiere.findOne({
        where: { id: req.params.id }
    })
    .then( ( matiereFound ) => {
        if ( matiereFound ) {
            return res.status(201).json({ 
                success: true,
                matiere: matiereFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Subject can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find Subject'
        });
    });
};

/**
 * Met à jour une matière grace à l'Id
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
                    intitule: intitule,
                    moduleId: moduleId
                },
                {where: { id: req.params.id }
            })
            .then( (updatedMatiere) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Subject updated successfully',
                    updatedMatiere: updatedMatiere
                })
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update Subject'
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Subject can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find subject'
        });
    });
};

/**
 * Supprime une matière grace à l'Id
 * @param {*} req 
 * @param {*} res 
 */
module.exports.deleteMatiere= (req, res) => {

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
                    message: 'Subject deleted',
                    matiere: matiereFound
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete subject'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Subject can\'t be found' 
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