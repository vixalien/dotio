/**
 * Module dependencies.
 */

var db = require('../db');

exports.engine = 'md';

exports.show = function(req, res, next){
	var blog = req.params.post_id;
  if (!blog) return next('route');
  res.render('../../blog/hello', { blog });
};
