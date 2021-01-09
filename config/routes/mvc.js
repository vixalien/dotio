/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var path = require('path');

export default (parent, options) => {
  var dir = path.join(process.cwd(), 'controllers');
  var verbose = options.verbose;
  fs.readdirSync(dir).forEach(function(name){
    var file = path.join(dir, name)
    // iLoveFiles
    if (!fs.statSync(file).isDirectory() && !fs.statSync(file).isFile()) return;
    if (fs.statSync(file).isFile()) {
      file = file.replace(new RegExp(path.extname(file) + "$"), "");
      name = name.replace(new RegExp(path.extname(name) + "$"), "");
    }
    verbose && console.log('\n   %s:', name);
    var obj = require(file);
    var name = obj.name || name;
    var prefix = obj.prefix || '';
    var app = express();
    var handler;
    var method;
    var url;

    // allow specifying the view engine
    if (obj.engine) app.set('view engine', obj.engine);
    app.set('views', path.join(process.cwd(), 'views', name));

    // generate routes based
    // on the exported methods
    for (var key in obj) {
      // "reserved" exports
      if (~['name', 'prefix', 'engine', 'before', 'after'].indexOf(key)) continue;
      // route exports
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
      }

      // setup
      handler = obj[key];
      url = prefix + url;

      let string = `     %s %s -> ${obj.before ? 'before ->' : ""} %s ${obj.after ? '-> after' : ""}`

      // after runs no matter what
      let oldHandler = handler;
      if (obj.after) {
        handler = (...args) => {
          oldHandler(...args);
          obj.after();
        }
      }

      // before middleware support
      if (obj.before) {
        app[method](url, obj.before, handler);
        verbose && console.log(string, method.toUpperCase(), url, key);
      } else {
        app[method](url, handler);
        verbose && console.log(string, method.toUpperCase(), url, key);
      }
    }

    // mount the app
    parent.use(app);
  });
};
