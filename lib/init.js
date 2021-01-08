module.exports = (app, options) => {

	// set views
	require('./views')(app);

	// load controllers
	require('./boot')(app, options);
}