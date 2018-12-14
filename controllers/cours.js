// Appel des variables d'environnement
require('dotenv').config();

// Appel des models
const models = require('../models');


/**
 * Enregistre une nouvelle Cours
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createCours = (req, res) => {

    // Récupération des informations du cours
    var intitule = req.body.intitule;
    var debut = req.body.debut;
    var fin = req.body.fin;
    var matiereId = req.body.matiereId;
    var salleId = req.body.salleId;
    var intervenantId = req.body.intervenantId;

    console.log(new Date());

    var newCours = models.Cours.create({
        intitule: intitule,
        debut: debut,
        fin: fin,
        matiereId: matiereId,
        salleId: salleId,
        intervenantId: intervenantId
    })
    .then ( (newCours) => {
        return res.status(200).json({ 
            success: true,
            message: `Lesson ${newCours.intitule} correctly registered`
        })
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Lesson can\'t be registered',
            error: err
        })
    })
};

/**
 * Retourne la liste des cours
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
                message: 'No lesson found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find lesson'
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
                lesson: coursFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Lesson can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find lesson'
        });
    });
};

/**
 * Met à jour un cours grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.updateCours = (req, res) => {
    
    // Récupération des informations utilisateur
    var intitule = req.body.intitule;
    var debut = req.body.debut;
    var fin = req.body.fin;
    var matiereId = req.body.matiereId;
    var salleId = req.body.salleId;
    var intervenantId = req.body.intervenantId;

    models.Cours.findById( req.params.id )
    .then( ( coursFound ) => {
        if ( coursFound ) {
            models.Cours.update(
                { 
                    intitule: intitule,
                    debut: debut,
                    fin: fin,
                    matiereId: matiereId,
                    salleId: salleId,
                    intervenantId: intervenantId
                },
                { where: { id: req.params.id } }
            )
            .then( (updatedCours) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Lesson updated successfully',
                    updatedLesson: updatedCours
                })
            })
            .catch( (err) => {
                console.log(err);
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update lesson',
                    error: err
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Lesson can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find lesson'
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
                    message: 'Lesson deleted',
                    lesson: coursFound
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete lesson'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Lesson can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find lesson'
        });
    });
};
