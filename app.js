const express         = require('express');
const path            = require('path');
const cookieParser    = require('cookie-parser');
const logger          = require('morgan');
const passport        = require('passport');
const cors            = require('cors');

// Déclaration des routes 
let authRouter      = require('./routes/authentification');
let usersRouter     = require('./routes/users');
let schoolsRouter   = require('./routes/ecoles');
let classRouter     = require('./routes/classes');
let roomsRouter     = require('./routes/salles');
let rolesRouter     = require('./routes/roles');
let modulesRouter   = require('./routes/modules');
let subjectsRouter  = require('./routes/matieres');
let lessonsRouter   = require('./routes/cours');
let reportsRouter   = require('./routes/bulletins');

// Instanciation du serveur express
let app = express();

app.use(cors());
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
