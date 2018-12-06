// Appel des variables d'environnement
require('dotenv').config();
// Appel des packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Appel des models
const models = require('../models');


//affiche les modules
module.exports.getAllModules= (req, res) => {
    models.Module.findAll({
        attributes: {
          }
    })
};



//Creer intitule module 
module.exports.createModule= (req, res) => {
    var intitule = req.body.intitule;
    models.Module.findOne({
        where: {
          }
    })
};

//Update module 
module.exports.updateModule= (req, res) => {

    var intitule = req.body.intitule;
    models.Module.findOne({
        where: {
          }
    })
};


//Update module 
module.exports.deleteModule= (req, res) => {

    var intitule = req.body.intitule;
    models.Module.findOne({
        where: {
          }
    })
};