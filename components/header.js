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
			  color: #b2b6bb;
			  background-color: #0a1826;
			  font-size: 2rem;
			}

			nav {
			  padding: 15px 10px;
			}

			@supports (padding: max(env(safe-area-inset-left, 0px))) {
				nav {
					padding-top   : max(env(safe-area-inset-top   ), 15px);
					padding-left  : max(env(safe-area-inset-left  ), 10px);
					padding-right : max(env(safe-area-inset-right ), 10px);
					max-width: calc(600px + max(env(safe-area-inset-right ), 10px) + max(env(safe-area-inset-left  ), 10px));
				}
			}

			nav {
			  display: flex;
			  justify-content: space-between;
			  flex-wrap: wrap;
			  max-width: 600px;
				margin: auto;
			}

			span {
				margin: 5px 5rem 5px 0;
			  font-weight: 700;
			}

			ul {
				list-style-type: none;
			  display: flex;
			  padding: 0;
			  margin: auto 0;
			  flex-wrap: wrap;
			}

			li {
				padding: 0 10px 0 0;
				font-size: 1em;
			}

			a {
				color: inherit;
			}

			span a:hover {
				border-bottom: 2px solid;
				text-decoration: none;
			}

			li a:hover {
				border-bottom: 1px solid;
				text-decoration: none;
			}
		`}</style>
	</>)
}