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
 * Connecte un utilisateur 
 * @param {*} req 
 * @param {*} res 
 * Retourne le profil utilisateur avec son JsonWebToken
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

/**
 * Retourne la liste des utilisateurs sans leur mot de passe
 * @param {*} req
 * @param {*} res 
 */
module.exports.getAllUsers = (req, res) => {
    models.User.findAll({
        attributes: {
            exclude: ['password']
          }
    })
    .then( ( usersFound ) => {
        if ( usersFound ) {
            return res.status(201).json({ 
                success: true,
                totalUsers: usersFound.length,
                user: usersFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'No user found' 
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
 * Retourne un utilisateur grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.getUserProfile = (req, res) => {
    models.User.findOne({
        attributes: {
            exclude: ['password']
          },
        where: { id: req.params.id }
    })
    .then( ( userFound ) => {
        if ( userFound ) {
            return res.status(201).json({ 
                success: true,
                user: userFound
            });
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'User can\'t be found' 
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
 * Met à jour un utilisateur grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.updateUserProfile = (req, res) => {

    models.User.findById( req.params.id )
    .then( ( userFound ) => {
        if ( userFound ) {
            models.User.update(
                {
                    prenom: req.body.prenom,
                    nom: req.body.nom,
                    email_perso: req.body.email_perso,
                    email_ecole: req.body.email_ecole,
                    password: req.body.password,
                    telephone: req.body.telephone,
                    adresse: req.body.adresse,
                    date_naissance: req.body.date_naissance,
                    ville_naissance: req.body.ville_naissance
                },
                {where: { id: req.params.id }
            })
            .then( (updatedUser) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'User updated successfully',
                    updatedUser: updatedUser
                })
            })
            .catch( (err) => {
                console.log(err);
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to update user'
                })
            }); 
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'User can\'t be found' 
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
 * Supprime un utilisateur grace à l'Id
 * @param {*} req
 * @param {*} res 
 */
module.exports.deleteUserById = (req, res) => {
    models.User.findOne({
        where: { id: req.params.id }
    })
    .then( ( userFound ) => {
        if ( userFound ) {
            models.User.destroy({
                where : {id: req.params.id}
            })
            .then( (deletedUser) => {
                return res.status(200).json({ 
                    success: true,
                    message: 'User deleted',
                    user: deletedUser
                });
            })
            .catch( (err) => {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unable to delete user'
                });
            });

        } else {
            return res.status(409).json({ 
                success: false,
                message: 'User can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find user'
        });
    });
};
