var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

// Déclaration des routes 
var usersRouter = require('./routes/users');
var schoolsRouter = require('./routes/ecoles');
var classRouter = require('./routes/classes');
var roomsRouter = require('./routes/salles');
var rolesRouter = require('./routes/roles');

// Instanciation du serveur express
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Import des midlewares
require('./middlewares/passport');

app.use('/users', usersRouter);
app.use('/schools', schoolsRouter);
app.use('/class', classRouter);
app.use('/rooms', roomsRouter);
app.use('/roles', rolesRouter);

module.exports = app;
