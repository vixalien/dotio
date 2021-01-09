import views from './views';
import boot from './boot';
import routes from './routes';

export default (app, options) => {

	// load controllers
	boot(app, options);

	// set views
	views(app);

	// register routes
	routes(app, options);
}