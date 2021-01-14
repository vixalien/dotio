'use strict';

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			}
		});
	}
	n['default'] = e;
	return Object.freeze(n);
}

const fs = require('fs');

const path = require('path');

const babel = require('@babel/core');

const React = require('react');

const {
  renderToString
} = require('react-dom/server');

let buildPath = path.join(process.cwd(), '.build');
let templatePath = path.join(process.cwd(), 'config', 'lib', 'react', 'template.html');
let wrapperPath = path.join(buildPath, 'lib', 'wrapper.js');
let hydratePath = path.join(buildPath, 'lib', 'hydrate.js');
var react = (async (filePath, options, callback) => {
  // define the template engine
  try {
    // Load required files
    let template = fs.readFileSync(templatePath).toString();

    let Wrapper = require(wrapperPath);

    let hydrate = fs.readFileSync(hydratePath).toString(); // Load the file

    let src = path.relative(process.cwd(), filePath);
    let buildSrc = path.join(buildPath, 'views', src);
    let Content = await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(buildSrc)); }).then(e => e.default);
    console.log('Content', Content); // Build props

    let props = options; // Build the file

    let rendered = renderToString(Wrapper(Content, props));
    rendered = template.replace('<!-- server-props -->', JSON.stringify(props)).replace('<!-- component-placeholder -->', rendered).replace('<!-- hydrate-path -->', src);
    return callback(null, rendered);
  } catch (err) {
    return callback(err);
  }
});

var fs$1 = require('fs');

var path$1 = require('path');

let serve = (filePath, options, callback) => {
  // define the template engine
  fs$1.readFile(filePath, function (err, content) {
    if (err) return callback(err); // this is an extremely simple template engine

    var rendered = content.toString();
    return callback(null, rendered);
  });
};

var views = (app => {
  // set our default template engine to "ejs"
  // which prevents the need for using file extensions
  app.engine('html', serve);
  app.engine('ejs', serve);
  app.engine('hbs', serve); // markdown

  app.engine('js', react);
  app.engine('jsx', react);
  app.set('view engine', 'js'); // set views for error and 404 pages

  app.set('views', path$1.join(process.cwd(), 'views', 'default'));
});

// This will run when the app boots
let text = `
Panther v1.0 booting
Initializing...`;
var boot = (() => {
  // We are not in a browser
  process.browser = false; // Let's print a booting message

  console.log(text);
});

/**
 * Module dependencies.
 */
var express = require('express');

var fs$2 = require('fs');

var path$2 = require('path');

var mvcRoutes = ((parent, options) => {
  var dir = path$2.join(process.cwd(), 'controllers');
  var verbose = options.verbose;
  fs$2.readdirSync(dir).forEach(function (name) {
    var file = path$2.join(dir, name); // iLoveFiles

    if (!fs$2.statSync(file).isDirectory() && !fs$2.statSync(file).isFile()) return;

    if (fs$2.statSync(file).isFile()) {
      file = file.replace(new RegExp(path$2.extname(file) + "$"), "");
      name = name.replace(new RegExp(path$2.extname(name) + "$"), "");
    }

    verbose && console.log('\n   %s:', name);

    var obj = require(file);

    var name = obj.name || name;
    var prefix = obj.prefix || '';
    var app = express();
    var handler;
    var method;
    var url; // allow specifying the view engine

    if (obj.engine) app.set('view engine', obj.engine);
    app.set('views', path$2.join(process.cwd(), 'views', name)); // generate routes based
    // on the exported methods

    for (var key in obj) {
      // "reserved" exports
      if (~['name', 'prefix', 'engine', 'before', 'after'].indexOf(key)) continue; // route exports

      switch (key) {
        case 'show':
          method = 'get';
          url = '/' + name + '/:' + name + '_id';
          break;

        case 'list':
          method = 'get';
          url = '/' + name + 's';
          break;

        case 'edit':
          method = 'get';
          url = '/' + name + '/:' + name + '_id/edit';
          break;

        case 'update':
          method = 'put';
          url = '/' + name + '/:' + name + '_id';
          break;

        case 'create':
          method = 'post';
          url = '/' + name;
          break;

        case 'index':
          method = 'get';
          url = '/';
          break;

        default:
          /* istanbul ignore next */
          throw new Error('unrecognized route: ' + name + '.' + key);
      } // setup


      handler = obj[key];
      url = prefix + url;
      let string = `     %s %s -> ${obj.before ? 'before ->' : ""} %s ${obj.after ? '-> after' : ""}`; // after runs no matter what

      let oldHandler = handler;

      if (obj.after) {
        handler = (...args) => {
          oldHandler(...args);
          obj.after();
        };
      } // before middleware support


      if (obj.before) {
        app[method](url, obj.before, handler);
        verbose && console.log(string, method.toUpperCase(), url, key);
      } else {
        app[method](url, handler);
        verbose && console.log(string, method.toUpperCase(), url, key);
      }
    } // mount the app


    parent.use(app);
  });
});

var fs$3 = require('fs');

var path$3 = require('path');

var express$1 = require('express');

let libName = lib => process.env.NODE_ENV.match(/production/) ? `${lib}/umd/${lib}.production.min.js` : `${lib}/umd/${lib}.development.js`;

var staticRoutes = (app => {
  // React and his sister
  app.use('/lib/react.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=2592000');
    res.status(200);
    res.send(fs$3.readFileSync(require.resolve(libName('react'))).toString());
  });
  app.use('/lib/react-dom.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=2592000');
    res.status(200);
    res.send(fs$3.readFileSync(require.resolve(libName('react-dom'))).toString());
  }); // Public

  app.use(express$1.static(path$3.join(process.cwd(), 'public/'))); // Libraries

  app.use('/lib/', express$1.static(path$3.join(process.cwd(), '.build/lib/'))); // Views

  app.use('/views/', express$1.static(path$3.join(process.cwd(), '.build/views/')));
});

var routes = ((app, options) => {
  // MVC routes
  mvcRoutes(app, options); // Static routes

  staticRoutes(app);
});

var init = ((app, options) => {
  // load controllers
  boot(); // set views

  views(app); // register routes

  routes(app, options);
});

/**
 * Module dependencies.
 */
var express$2 = require('express');

var logger = require('morgan');

var path$4 = require('path');

var session = require('express-session');

var compression = require('compression'); // var methodOverride = require('method-override');
var app = module.exports = express$2(); // use compression

app.use(compression()); // define a custom res.message() method
// which stores messages in the session

app.response.message = function (msg) {
  // reference `req.session` via the `this.req` reference
  var sess = this.req.session; // simply add the msg to an array for later

  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
}; // log


if (!module.parent) app.use(logger('dev')); // serve static files

app.use(express$2.static(path$4.join(process.cwd(), 'public'))); // session support

app.use(session({
  resave: false,
  // don't save session if unmodified
  saveUninitialized: false,
  // don't create session until something stored
  secret: 'some secret here'
})); // parse request bodies (req.body)

app.use(express$2.urlencoded({
  extended: true
})); // allow overriding methods in query (?_method=put)
// app.use(methodOverride('_method'));
// expose the "messages" local variable when views are rendered

app.use(function (req, res, next) {
  var msgs = req.session.messages || []; // expose "messages" local variable

  res.locals.messages = msgs; // expose "hasMessages"

  res.locals.hasMessages = !!msgs.length;
  /* This is equivalent:
   res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
   });
  */

  next(); // empty or "flush" the messages so they
  // don't build up

  req.session.messages = [];
}); // load controllers

init(app, {
  verbose: !module.parent
});
app.use(function (err, req, res, next) {
  // log it
  if (!module.parent) console.error(err.stack); // error page

  res.status(500).render('5xx', {
    name: err.name,
    stack: err.stack,
    message: err.message
  });
}); // offline page

app.get('/offline', (req, res) => {
  res.status(200);
  res.render("offline");
}); // assume 404 since no middleware responded

app.use(function (req, res, next) {
  res.status(404).render('404', {
    url: req.originalUrl
  });
});
app.listen(4000);
console.log('Panther is ready on port 4000');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbmZpZy92aWV3cy9yZWFjdC5qcyIsIi4uLy4uL2NvbmZpZy92aWV3cy5qcyIsIi4uLy4uL2NvbmZpZy9ib290LmpzIiwiLi4vLi4vY29uZmlnL3JvdXRlcy9tdmMuanMiLCIuLi8uLi9jb25maWcvcm91dGVzL3N0YXRpYy5qcyIsIi4uLy4uL2NvbmZpZy9yb3V0ZXMvaW5kZXguanMiLCIuLi8uLi9jb25maWcvaW5pdC5qcyIsIi4uLy4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJwYXRoIiwiYmFiZWwiLCJSZWFjdCIsInJlbmRlclRvU3RyaW5nIiwiYnVpbGRQYXRoIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJ0ZW1wbGF0ZVBhdGgiLCJ3cmFwcGVyUGF0aCIsImh5ZHJhdGVQYXRoIiwiZmlsZVBhdGgiLCJvcHRpb25zIiwiY2FsbGJhY2siLCJ0ZW1wbGF0ZSIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiV3JhcHBlciIsImh5ZHJhdGUiLCJzcmMiLCJyZWxhdGl2ZSIsImJ1aWxkU3JjIiwiQ29udGVudCIsInRoZW4iLCJlIiwiZGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJwcm9wcyIsInJlbmRlcmVkIiwicmVwbGFjZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnIiLCJzZXJ2ZSIsInJlYWRGaWxlIiwiY29udGVudCIsImFwcCIsImVuZ2luZSIsInJlYWN0Iiwic2V0IiwidGV4dCIsImJyb3dzZXIiLCJleHByZXNzIiwicGFyZW50IiwiZGlyIiwidmVyYm9zZSIsInJlYWRkaXJTeW5jIiwiZm9yRWFjaCIsIm5hbWUiLCJmaWxlIiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImlzRmlsZSIsIlJlZ0V4cCIsImV4dG5hbWUiLCJvYmoiLCJwcmVmaXgiLCJoYW5kbGVyIiwibWV0aG9kIiwidXJsIiwia2V5IiwiaW5kZXhPZiIsIkVycm9yIiwic3RyaW5nIiwiYmVmb3JlIiwiYWZ0ZXIiLCJvbGRIYW5kbGVyIiwiYXJncyIsInRvVXBwZXJDYXNlIiwidXNlIiwibGliTmFtZSIsImxpYiIsImVudiIsIk5PREVfRU5WIiwibWF0Y2giLCJyZXEiLCJyZXMiLCJzZXRIZWFkZXIiLCJzdGF0dXMiLCJzZW5kIiwicmVzb2x2ZSIsInN0YXRpYyIsIm12Y1JvdXRlcyIsInN0YXRpY1JvdXRlcyIsImJvb3QiLCJ2aWV3cyIsInJvdXRlcyIsImxvZ2dlciIsInNlc3Npb24iLCJjb21wcmVzc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJtc2ciLCJzZXNzIiwibWVzc2FnZXMiLCJwdXNoIiwicmVzYXZlIiwic2F2ZVVuaW5pdGlhbGl6ZWQiLCJzZWNyZXQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJuZXh0IiwibXNncyIsImxvY2FscyIsImhhc01lc3NhZ2VzIiwibGVuZ3RoIiwiaW5pdCIsImVycm9yIiwic3RhY2siLCJyZW5kZXIiLCJnZXQiLCJvcmlnaW5hbFVybCIsImxpc3RlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsTUFBTUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFFQSxNQUFNRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxhQUFELENBQXJCOztBQUNBLE1BQU1HLEtBQUssR0FBR0gsT0FBTyxDQUFDLE9BQUQsQ0FBckI7O0FBQ0EsTUFBTTtBQUFFSSxFQUFBQTtBQUFGLElBQXFCSixPQUFPLENBQUMsa0JBQUQsQ0FBbEM7O0FBRUEsSUFBSUssU0FBUyxHQUFHSixJQUFJLENBQUNLLElBQUwsQ0FBVUMsT0FBTyxDQUFDQyxHQUFSLEVBQVYsRUFBeUIsUUFBekIsQ0FBaEI7QUFDQSxJQUFJQyxZQUFZLEdBQUdSLElBQUksQ0FBQ0ssSUFBTCxDQUFVQyxPQUFPLENBQUNDLEdBQVIs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
