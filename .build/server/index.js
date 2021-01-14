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

    let props = options;
    let deploy_url = process.env.VERCEL_URL || process.env.URL || 'vixaliendotio.vercel.app';
    deploy_url.startsWith('localhost') ? deploy_url = "http://" + deploy_url : deploy_url = "https://" + deploy_url; // Build the file

    let rendered = renderToString(Wrapper(Content, props));
    rendered = template.replace('<!-- canonical-url -->', deploy_url).replace('<!-- server-props -->', JSON.stringify(props)).replace('<!-- component-placeholder -->', rendered).replace('<!-- hydrate-path -->', src);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbmZpZy92aWV3cy9yZWFjdC5qcyIsIi4uLy4uL2NvbmZpZy92aWV3cy5qcyIsIi4uLy4uL2NvbmZpZy9ib290LmpzIiwiLi4vLi4vY29uZmlnL3JvdXRlcy9tdmMuanMiLCIuLi8uLi9jb25maWcvcm91dGVzL3N0YXRpYy5qcyIsIi4uLy4uL2NvbmZpZy9yb3V0ZXMvaW5kZXguanMiLCIuLi8uLi9jb25maWcvaW5pdC5qcyIsIi4uLy4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJwYXRoIiwiYmFiZWwiLCJSZWFjdCIsInJlbmRlclRvU3RyaW5nIiwiYnVpbGRQYXRoIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJ0ZW1wbGF0ZVBhdGgiLCJ3cmFwcGVyUGF0aCIsImh5ZHJhdGVQYXRoIiwiZmlsZVBhdGgiLCJvcHRpb25zIiwiY2FsbGJhY2siLCJ0ZW1wbGF0ZSIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiV3JhcHBlciIsImh5ZHJhdGUiLCJzcmMiLCJyZWxhdGl2ZSIsImJ1aWxkU3JjIiwiQ29udGVudCIsInRoZW4iLCJlIiwiZGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJwcm9wcyIsImRlcGxveV91cmwiLCJlbnYiLCJWRVJDRUxfVVJMIiwiVVJMIiwic3RhcnRzV2l0aCIsInJlbmRlcmVkIiwicmVwbGFjZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnIiLCJzZXJ2ZSIsInJlYWRGaWxlIiwiY29udGVudCIsImFwcCIsImVuZ2luZSIsInJlYWN0Iiwic2V0IiwidGV4dCIsImJyb3dzZXIiLCJleHByZXNzIiwicGFyZW50IiwiZGlyIiwidmVyYm9zZSIsInJlYWRkaXJTeW5jIiwiZm9yRWFjaCIsIm5hbWUiLCJmaWxlIiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImlzRmlsZSIsIlJlZ0V4cCIsImV4dG5hbWUiLCJvYmoiLCJwcmVmaXgiLCJoYW5kbGVyIiwibWV0aG9kIiwidXJsIiwia2V5IiwiaW5kZXhPZiIsIkVycm9yIiwic3RyaW5nIiwiYmVmb3JlIiwiYWZ0ZXIiLCJvbGRIYW5kbGVyIiwiYXJncyIsInRvVXBwZXJDYXNlIiwidXNlIiwibGliTmFtZSIsImxpYiIsIk5PREVfRU5WIiwibWF0Y2giLCJyZXEiLCJyZXMiLCJzZXRIZWFkZXIiLCJzdGF0dXMiLCJzZW5kIiwicmVzb2x2ZSIsInN0YXRpYyIsIm12Y1JvdXRlcyIsInN0YXRpY1JvdXRlcyIsImJvb3QiLCJ2aWV3cyIsInJvdXRlcyIsImxvZ2dlciIsInNlc3Npb24iLCJjb21wcmVzc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJtc2ciLCJzZXNzIiwibWVzc2FnZXMiLCJwdXNoIiwicmVzYXZlIiwic2F2ZVVuaW5pdGlhbGl6ZWQiLCJzZWNyZXQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJuZXh0IiwibXNncyIsImxvY2FscyIsImhhc01lc3NhZ2VzIiwibGVuZ3RoIiwiaW5pdCIsImVycm9yIiwic3RhY2siLCJyZW5kZXIiLCJnZXQiLCJvcmlnaW5hbFVybCIsImxpc3RlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsTUFBTUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFFQSxNQUFNRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxhQUFELENBQXJCOztBQUNBLE1BQU1HLEtBQUssR0FBR0gsT0FBTyxDQUFDLE9BQUQsQ0FBckI7O0FBQ0EsTUFBTTtBQUFFSSxFQUFBQTtBQUFGLElBQXFCSixPQUFPLENBQUMsa0JBQUQsQ0FBbEM7O0FBRUEsSUFBSUssU0FBUyxHQUFHSixJQUFJLENBQUNLLElBQUwsQ0FBVUMsT0FBTyxDQUFDQyxHQUFSLEVBQVYsRUFBeUIsUUFBekIsQ0FBaEI7QUFDQSxJQUFJQyxZQUFZ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
