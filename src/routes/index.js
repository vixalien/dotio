import mvcRoutes from './mvc';
import staticRoutes from './static';

export default (app, options) => {
	// MVC routes
	mvcRoutes(app, options);

	// Static routes
	staticRoutes(app);
}