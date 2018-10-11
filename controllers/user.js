// Appel des variables d'environnement
require('dotenv').config();
// Appel des packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Appel des models
const models = require('../models');


/**
 * Enregistre un nouvel utilisateur
 * @param {*} req 
 * @param {*} res 
 */
module.exports.registerUser = (req, res) => {

    // Récupération des informations utilisateur
    var prenom = req.body.prenom;
    var nom = req.body.nom;
    var email_perso = req.body.email_perso;
    var email_ecole = req.body.email_ecole;
    var password = req.body.password;
    var telephone = req.body.telephone;
    var adresse = req.body.adresse;
    var date_naissance = req.body.date_naissance;
    var ville_naissance = req.body.ville_naissance;

    // Vérifie la présence de l'utilisateur en base de données
    models.User.findOne({
        where: { email_ecole: email_ecole }
    })
    .then( ( userFound ) => {
        if ( !userFound ) {
            bcrypt.hash(password, 7, ( err, bcryptedPassword ) => {
                var newUser = models.User.create({
                    prenom: prenom,
                    nom: nom,
                    email_perso: email_perso,
                    email_ecole: email_ecole,
                    password: bcryptedPassword,
                    telephone: telephone,
                    adresse: adresse,
                    date_naissance: date_naissance,
                    ville_naissance: ville_naissance
                })
                .then ( (newUser) => {
                    return res.status(200).json({ 
                        'success': true,
                        'message': `User ${newUser.email_ecole} correctly registered`
                    })
                })
                .catch( (err) => {
                    console.log(err);
                    return res.status(500).json({ 
                        'success': false,
                        'message': 'User can\'t be registered'
                    })
                })
            })
        } else {
            return res.status(409).json({ 
                'success': false,
                'message': 'User already exist'
             });
        }
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).json({ 
            'success': false,
            'message': 'Unable to verify user'
        });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.authenticateUser = (req, res) => {
    var email_ecole = req.body.email_ecole;
    var password = req.body.password;

    models.User.findOne({
        where: { email_ecole: email_ecole }
    })
    .then( ( userFound ) => {
        if ( userFound ) {
            bcrypt.compare(password, userFound.password, ( errBcrypt, resBcrypt ) => {
                if ( resBcrypt ) {
                    return res.status(200).json({
                        success: true,
                        token: 'Bearer ' + jwt.sign({data: {
                            userId: userFound.id
                        }}, process.env.ZNOV_API_SECRET, { expiresIn: 604800 }), 
                        user: {
                            id: userFound.id,
                            prenom: userFound.prenom,
                            nom: userFound.nom,
                            email_ecole: userFound.email_ecole,
                            date_naissance: userFound.date_naissance
                        }
                    });
                } else {
                    return res.status(403).json({ 
                        success : false,
                        message: 'Invalid password'
                    });
                }
            })
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'User not found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to verify user' 
        });
    });
};