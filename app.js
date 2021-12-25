const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const expressValidator = require('express-validator');

const userMiddleware = require('./middleware/user');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const courseRouter = require('./routes/course');
const profileRouter = require('./routes/profile');
const teacherRouter = require('./routes/teachers');
const authRouter = require('./routes/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { secure: false, maxAge: 14400000 }
}));
app.use(flash());
app.use(expressValidator());

app.use(userMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teachers', teacherRouter);
app.use('/courses', courseRouter);
app.use('/profile', profileRouter);
app.use('/auth', authRouter);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.error);

module.exports = app;
