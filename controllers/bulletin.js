// Appel des variables d'environnement
require('dotenv').config();

// Appel des models
const models = require('../models');

/**
 * Enregistre un nouveau Bulletin
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createBulletin = (req, res) => {

    // Récupération des informations du bulletin
    var note = req.body.note;
    var present = req.body.present;
    var justificatif = req.body.justificatif;
    var coursId = req.body.coursId;
    var userId = req.body.userId;

    // Vérifie la présence du bulletin en base de données
    models.Bulletin.findOne(
        { where: { $and: [{coursId: coursId}, {userId: userId}] } }
    )
    .then( ( bulletinFound ) => {
        if ( !bulletinFound ) {
            var newBulletin = models.Bulletin.create({
                note: note,
                present: present,
                justificatif: justificatif,
                coursId: coursId,
                userId: userId
            })
            .then ( (newBulletin) => {
                return res.status(200).json({ 
                    success: true,
                    message: `Report correctly registered`
                })
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Report can\'t be registered',
                    error: err
                })
            })
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Report already exist'
             });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to verify report',
            error: err
        });
    });
};

/**
 * Retourne la liste des bulletins
 * @param {*} req
 * @param {*} res 
 */
module.exports.getAllBulletin = (req, res) => {
    models.Bulletin.findAll()
    .then( ( BulletinsFound ) => {
        if ( BulletinsFound ) {
            return res.status(201).json({ 
                success: true,
                totalReports: BulletinsFound.length,
                reports: BulletinsFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No report found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find report'
        });
    });
};

/**
 * Retourne une bulletin grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.getBulletin = (req, res) => {
    models.Bulletin.findOne({
        where: { id: req.params.id }
    })
    .then( ( bulletinFound ) => {
        if ( bulletinFound ) {
            return res.status(201).json({ 
                success: true,
                report: bulletinFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Report can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find report'
        });
    });
};

/**
 * Met à jour une bulletin grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.updateBulletin = (req, res) => {

    var note = req.body.note;
    var present = req.body.present;
    var justificatif = req.body.justificatif;
    var coursId = req.body.coursId;
    var userId = req.body.userId;

    models.Bulletin.findById( req.params.id )
    .then( ( bulletinFound ) => {
        if ( bulletinFound ) {
            models.Bulletin.update(
                { 
                    note: note,
                    present: present,
                    justificatif: justificatif,
                    coursId: coursId,
                    userId: userId
                },
                { where: { id: req.params.id } }
            )
            .then( (updatedBulletin) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Report updated successfully',
                    updatedReport: updatedBulletin
                })
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update report'
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Report can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find report'
        });
    });
};

/**
 * Supprime une bulletin grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.deleteBulletinById = (req, res) => {
    models.Bulletin.findOne({
        where: { id: req.params.id }
    })
    .then( ( bulletinFound ) => {
        if ( bulletinFound ) {
            models.Bulletin.destroy({
                where : {id: req.params.id}
            })
            .then( (deletedBulletin) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'Report deleted',
                    report: bulletinFound
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete report'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Report can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find report'
        });
    });
};



/**
 * Retourne les informations du dashboard d'un utilisateur
 * @param {*} req
 * @param {*} res 
 */
module.exports.getReportStatsByUser = (req, res) => {

    models.Bulletin.findAll({
        where: { userId: req.params.idUser },
        order: [
            ['id', 'DESC'],
        ]
    })
    .then( ( reportsFound ) => {
        if ( reportsFound ) {

            const lastNote = reportsFound[0].note;
            let accNotes = 0;
            let cptAbs = 0;
            let cptAbsInj = 0;

            reportsFound.forEach(report => {
                accNotes += report.note;
                if (report.present == 0) {
                    cptAbs++;
                    if (report.justificatif == "") {
                        cptAbsInj++
                    }
                }
            });


            return res.status(201).json({ 
                success: true,
                lastNote: lastNote,
                noteAvg: (accNotes / reportsFound.length),
                AbsTotal: cptAbs,
                AbsInjTotal: cptAbsInj
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No report found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find report'
        });
    });
};