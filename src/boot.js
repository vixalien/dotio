// This will run when the app boots

let text = `
Panther v1.0 booting
Initializing...`

export default () => {
	// We are not in a browser
	process.browser = false;
  // Let's print a booting message
  console.log(text);
}