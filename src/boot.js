// This will run when the app boots

let text = `
Panther v1.0 booting
Initializing...`

export default (app) => {

	// We are not in a browser
	process.browser = false;

	// DEPLOY_URL
	let deploy_url = process.env.VERCEL_URL || process.env.URL || 'vixaliendotio.vercel.app';
	deploy_url.startsWith('localhost') ? deploy_url = "http://" + deploy_url : deploy_url = "https://" + deploy_url
	process.DEPLOY_URL = deploy_url;

  // Let's print a booting message
  console.log(text);

  // Let's implement the new render method
  app.response.customRender = function (path, engine, views, options) {
		let tmp = [];
		let app = this.req.app;

		tmp[0] = app.get('views');
		tmp[1] = app.get('view engine');
		app.set('views', views);
		app.set('view engine', engine);

		this.render(path, options);

		app.set('views', tmp[0]);
		app.set('view engine', tmp[1]);
  }
}