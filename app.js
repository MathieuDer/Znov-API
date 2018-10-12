var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

// Déclaration des routes 
var usersRouter = require('./routes/users');

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

module.exports = app;
