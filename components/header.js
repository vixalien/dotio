export default () => {
	return (<>
		<header>
			<nav>
				<span><a href="/">vixalien.io</a></span>
				<ul>
					<li><a href="/projects">Projects</a></li>
					<li><a href="/posts">Posts</a></li>
					<li><a href="/about">About</a></li>
				</ul>
			</nav>
		</header>
		<style jsx>{`
			/* Lil Header */
			header {
			  padding: 15px 10px;
			  color: #b2b6bb;
			  background-color: #0a1826;
			  font-size: 2rem;
			}

			@supports (padding: max(env(safe-area-inset-left, 0px))) {
				header {
					padding-top   : max(env(safe-area-inset-top   ), 15px);
					padding-left  : max(env(safe-area-inset-left  ), 10px);
					padding-right : max(env(safe-area-inset-right ), 10px);
					max-width: calc(600px + max(env(safe-area-inset-right ), 10px) + max(env(safe-area-inset-left  ), 10px));
				}
			}

			header nav {
			  display: flex;
			  justify-content: space-between;
			  flex-wrap: wrap;
			  max-width: 600px;
				margin: auto;
			}

			header span {
				margin: 5px 5rem 5px 0;
			  font-weight: 700;
			}

			header ul {
				list-style-type: none;
			  display: flex;
			  padding: 0;
			  margin: auto 0;
			  flex-wrap: wrap;
			}

			header li {
				padding: 0 10px 0 0;
				font-size: 1em;
			}

			header a {
				color: inherit;
			}

			header span a:hover {
				border-bottom: 2px solid;
				text-decoration: none;
			}

			header li a:hover {
				border-bottom: 1px solid;
				text-decoration: none;
			}
		`}</style>
	</>)
}