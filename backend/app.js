require('dotenv').config();
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var classifiedsRouter = require('./routes/classifieds');
var commentsRouter = require('./routes/comments');
var notificationRouter = require("./routes/notification");

var authMiddleware = require('./middlewares/auth');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/classifieds', authMiddleware.authenticate, classifiedsRouter);
app.use('/comments', authMiddleware.authenticate, commentsRouter);
app.use('/notification', authMiddleware.authenticate, notificationRouter);


module.exports = app;
