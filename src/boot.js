// This will run when the app boots

let text = `
Panther v1.0 booting
Initializing...`

export default () => {
	// We are not in a browser
	process.browser = false;
	// DEPLOY_URL
	let deploy_url = process.env.VERCEL_URL || process.env.URL || 'vixaliendotio.vercel.app';
	deploy_url.startsWith('localhost') ? deploy_url = "http://" + deploy_url : deploy_url = "https://" + deploy_url
	process.DEPLOY_URL = deploy_url;
  // Let's print a booting message
  console.log(text);
}