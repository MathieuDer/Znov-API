var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var passport        = require('passport');

// Déclaration des routes 
var authRouter      = require('./routes/authentification');
var usersRouter     = require('./routes/users');
var schoolsRouter   = require('./routes/ecoles');
var classRouter     = require('./routes/classes');
var roomsRouter     = require('./routes/salles');
var rolesRouter     = require('./routes/roles');
var modulesRouter   = require('./routes/modules');
var subjectsRouter  = require('./routes/matieres');
var lessonsRouter   = require('./routes/cours');
var reportsRouter   = require('./routes/bulletins');

// Instanciation du serveur express
var app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Import des midlewares
require('./middlewares/passport');

// Associations des routes à leur fichier router
app.use('/auth',        authRouter);
app.use('/users',       passport.authenticate('jwt', { session: false }), usersRouter);
app.use('/schools',     passport.authenticate('jwt', { session: false }), schoolsRouter);
app.use('/class',       passport.authenticate('jwt', { session: false }), classRouter);
app.use('/rooms',       passport.authenticate('jwt', { session: false }), roomsRouter);
app.use('/roles',       passport.authenticate('jwt', { session: false }), rolesRouter);
app.use('/modules',     passport.authenticate('jwt', { session: false }), modulesRouter);
app.use('/subjects',    passport.authenticate('jwt', { session: false }), subjectsRouter);
app.use('/lessons',     passport.authenticate('jwt', { session: false }), lessonsRouter);
app.use('/reports',     passport.authenticate('jwt', { session: false }), reportsRouter);

module.exports = app;
