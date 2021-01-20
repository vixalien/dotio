/**
 * Module dependencies.
 */
let path = require('path')

exports.engine = 'md';

exports.show = function(req, res, next){
	var blog = req.params.post_id;
  if (!blog) return next('route');
  res.render(path.resolve('blog/hello'), { blog });
};
