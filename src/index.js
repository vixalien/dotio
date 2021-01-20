/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var path = require('path');
var session = require('cookie-session');
var compression = require('compression');
// var methodOverride = require('method-override');

// load env
require('dotenv').config()

import init from './config/init';

var app = module.exports = express();

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  signed: false,
  httpOnly: false
}));

// session
app.use((req, res, next) => {
  res.locals.theme = req.session.theme;
  next();
})

// use compression
app.use(compression());

// set url on request
  app.use((req, res, next) => {
    res.locals.url = req._parsedUrl._raw;
    res.app = app;
    next();
  })

// define a custom res.message() method
// which stores messages in the session
app.response.message = function(msg){
  // reference `req.session` via the `this.req` reference
  var sess = this.req.session;
  // simply add the msg to an array for later
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};

// log
if (!module.parent) app.use(logger('dev'));

// serve static files
app.use(express.static(path.join(process.cwd(), 'public')));

// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))

// allow overriding methods in query (?_method=put)
// app.use(methodOverride('_method'));

// expose the "messages" local variable when views are rendered
app.use(function(req, res, next){
  var msgs = req.session.messages || [];

  // expose "messages" local variable
  res.locals.messages = msgs;

  // expose "hasMessages"
  res.locals.hasMessages = !! msgs.length;

  /* This is equivalent:
   res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
   });
  */

  next();
  // empty or "flush" the messages so they
  // don't build up
  req.session.messages = [];
});

// load controllers
init(app, { verbose: !module.parent });

app.use(function(err, req, res, next){
  // log it
  if (!module.parent) console.error(err.stack);

  // error page
  res.status(500).render('5xx', { name: err.name, stack: err.stack, message: err.message });
});

// offline page
app.get('/offline', (req, res) => {
  res.status(200);
  res.render("offline");
});

// set theme
app.get('/set-theme/:theme', (req, res) => {
  res.status(200);
  let was = req.session.theme;
  req.session.theme = req.params.theme;
  res.send("theme set to: " + req.params.theme + "was: " + was);
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});

app.listen(4000);
console.log('Panther is ready on port 4000');
