export default () => {
	return (<>
		<footer>
			<nav>
				<hr/>
				<a href="/#top">↑ Top</a>
				<div><a href="/">vixalien.io</a></div>
			</nav>
		</footer>
		<style jsx>{`
			/* Lil Footer */
			nav {
			  padding: 15px 10px 30px;
			}

			@supports (padding: max(env(safe-area-inset-left, 0px))) {
				nav {
					padding-bottom: max(env(safe-area-inset-bottom), 30px);
					padding-left  : max(env(safe-area-inset-left  ), 10px);
					padding-right : max(env(safe-area-inset-right ), 10px);
					max-width: calc(600px + max(env(safe-area-inset-right ), 10px) + max(env(safe-area-inset-left  ), 10px));
				}
			}

			nav {
			  display: flex;
			  justify-content: space-between;
			  flex-direction: column;
			  max-width: 600px;
				margin: auto;
			}

			hr {
				padding-bottom: 20px;
			}

			a {
				margin: 0;
				color: inherit;
			}

			div {
				margin: 5px 5rem 5px 0;
			}

			div a {
				color: inherit;
				margin: 0;
				border-bottom: 2px solid transparent;
				font-size: 2rem;
				font-weight: 700;
			}

			div a:hover {
				border-bottom: 2px solid;
				text-decoration: none;
			}
		`}</style>
	</>)
}