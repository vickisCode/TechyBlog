var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

// Routes 
var indexRouter = require('./routes/index');
var BlogRouter = require('./routes/blogRoutes');
var authRouter = require('./routes/authRoutes');
var UserRouter = require('./routes/userRoutes');

const cors = require('cors');

var app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON bodies

// MongoDB Connect
const MongodbDriver = process.env.MONGODB_URI;


async function ConnectDB() {
  try {
    await mongoose.connect(MongodbDriver, {});
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.log('❌ Error Connecting to MongoDB');
  }
}
ConnectDB();

// View engine (if needed)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/blog', BlogRouter);
app.use('/user', UserRouter);

// 🔥 Serve React frontend build (after backend routes)
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// 404 Handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
