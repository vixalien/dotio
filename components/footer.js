import List from './list';

export default () => {
	return (<>
		<header>
			<nav>
				<span><a href="/">vixalien.io</a></span>
				<List
					links={{
						'/projects': 'Projects',
						'/posts': 'Posts',
						'/about': 'About'
					}}
				/>
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

			a {
				color: inherit;
				margin: auto;
				border-bottom: 2px solid transparent;
			}

			span a:hover {
				border-bottom: 2px solid;
				text-decoration: none;
			}
		`}</style>
	</>)
}