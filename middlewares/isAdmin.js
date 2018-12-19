require('dotenv').config();

const models = require('../models');

module.exports = (req, res, next) => {
    
    models.Role.findById( req.user.roleId )
    .then( ( roleFound ) => {
        if ( roleFound ) {
            if (roleFound.nom.toLowerCase() == 'admin') {
                return next();
            }
            else {
                return res.status(403).json({ 
                    success: false,
                    message: 'Access denied (not admin).' 
                });
            }
        } else {
            return res.status(409).json({ 
                success: false,
                message: 'Role can\'t be found' 
            });
        }
    })
    .catch( (err) => {
        return res.status(500).json({ 
            success: false,
            message: 'Unable to find role'
        });
    });
};