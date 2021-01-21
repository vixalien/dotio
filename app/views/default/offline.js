export default () => {
	if (process.browser) {
		navigator.ononline = () => location.reload();
	}
  return <>
  	<main>
      <h1>You are offline!</h1>
      <p>We will reload when you get connected back</p>
    </main>
    <script dangerouslySetInnerHTML={{__html: `
    	window.ononline = () => location.reload();
		`}}></script>
  </>
}