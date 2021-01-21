/**
 * Module dependencies.
 */
let path = require('path');

let posts = require(path.resolve('.build/data/posts.json'))

exports.show = function(req, res, next){
	var blog = req.params.post_id;
	if (!blog) return next('route');
	if (Object.keys(posts).indexOf(blog) < 0) return next('route');

	res.customRender(blog, 'md', path.resolve('blog'), { blog });
};


exports.list = function(req, res){
	res.render('index');
};