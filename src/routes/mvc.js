/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var path = require('path');

export default (parent, options) => {
  var dir = path.join(process.cwd(), 'app', 'controllers');
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
    let start = '/';
    let plural = '/';
    if (name != 'index') start = '/' + name;
    if (name != 'index') plural = '/' + (obj.plural || (name + 's'));

    // allow specifying the view engine
    app.set('views', path.join(process.cwd(), '.build', 'views', name));
    if (obj.engine) app.set('view engine', obj.engine);
    if (obj.views) app.set('views', obj.views);

    // generate routes based
    // on the exported methods
    for (var key in obj) {
      // "reserved" exports
      if (~['name', 'prefix', 'engine', 'views', 'before', 'after', 'plural'].indexOf(key)) continue;
      // route exports
      switch (key) {
        case 'show':
          method = 'get';
          url = start + '/:' + name + '_id';
          break;
        case 'list':
          method = 'get';
          url = plural;
          break;
        case 'edit':
          method = 'get';
          url = start + '/:' + name + '_id/edit';
          break;
        case 'update':
          method = 'put';
          url = start + '/:' + name + '_id';
          break;
        case 'create':
          method = 'post';
          url = start;
          break;
        case 'index':
          method = 'get';
          url = '/';
          break;
        default:
          /* istanbul ignore next */
          throw new Error('unrecognized route: ' + name + '.' + key);
      }
      // if setting view engine or view path

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
