var fs = require('fs');
var path = require('path');

let serve = (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    // this is an extremely simple template engine
    var rendered = content.toString()
    return callback(null, rendered)
  })
}

module.exports = function (app) {
	// set our default template engine to "ejs"
	// which prevents the need for using file extensions
	app.engine('html', serve);
	app.engine('ejs', serve);
	app.engine('hbs', serve);

	app.set('view engine', 'html');

	// set views for error and 404 pages
	app.set('views', path.join(__dirname, 'views'));
}