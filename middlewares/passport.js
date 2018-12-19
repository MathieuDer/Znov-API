require('dotenv').config();
const models = require('../models');

var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ZNOV_API_SECRET;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    models.User.findOne({
        where: { id: jwt_payload.data.userId },
        attributes: { 
            exclude: ['password']
        }
    })
    .then( ( userFound ) => {
        if (userFound) {
            return done(null, userFound);
        } else {
            return done(null, false);
        }
    })
    .catch( (err) => {
        return done(err, false);
    });
}));