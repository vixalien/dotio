/**
 * Module dependencies.
 */

exports.engine = 'js';

exports.list = function(req, res, next){
  res.render('index');
};

exports.after = (req, res, next) => {
	console.log("Done with post");
}