var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoosed = require('mongoose');

// Routes 
var indexRouter = require('./routes/index');
var BlogRouter = require('./routes/blogRoutes')
var authRouter = require('./routes/authRoutes')
var UserRouter = require('./routes/userRoutes')

const cors = require('cors');


var app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use(cors()); //  allow frontend to access backend
app.use(express.json()); //  parse JSON bodies

const MongodbDriver = "mongodb+srv://vickisoftware:Vicki9117@db1.fm8proe.mongodb.net/WebBlog?retryWrites=true&w=majority&appName=DB1"

async function ConnectDB() {
  try {
    await mongoosed.connect(MongodbDriver, {});
    console.log('Connect to MongoDB');
  }

  catch (error) {
    console.log('Error Connecting to MongoDB');
  }
}
ConnectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/blog', BlogRouter);
app.use('/user', UserRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handling, etc...
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
