var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var denglu = require('./routes/denglu');
var zhuce = require('./routes/zhuce');
var chaxun = require('./routes/chaxun');
var imgsc = require('./routes/imgsc');
var list = require('./routes/list');
var listp = require('./routes/listp');
var listf = require('./routes/listf');
var lists = require('./routes/lists');
var listps = require('./routes/listps');
var listpc = require('./routes/listpc');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/denglu', denglu);
app.use('/zhuce', zhuce);
app.use('/chaxun', chaxun);
app.use('/imgsc', imgsc);
app.use('/list', list);
app.use('/listp', listp);
app.use('/listf', listf);
app.use('/lists', lists);
app.use('/listps', listps);
app.use('/listpc', listpc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen('8000',function(){	
	console.log('你好！！！')
})

module.exports = app;