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
let templatePath = path.join(buildPath, 'lib', 'template.html');
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
