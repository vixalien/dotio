import List from './list';
import { version } from 'package.json';

let year = (new Date).getFullYear();

export default () => {
	return (<>
		<footer>
			<nav>
				<List
					links={{
						'#top': <>↑ Top</>,
						'/projects': 'Projects',
						'/posts': 'Posts',
						'/about': 'About'
					}}
				/>
				<div><a href="/">vixalien.io</a></div>
				<div> </div>
				<div>Have a nice day!</div>
				<div>&copy; {year} - v{version}</div>
			</nav>
		</footer>
		<style jsx>{`
			/* Lil Footer */
			footer {
			  color: #b2b6bb;
			  background-color: #0a1826;
			}

			nav {
			  padding: 15px 10px;
			}

			@supports (padding: max(env(safe-area-inset-left, 0px))) {
				nav {
					padding-bottom: max(env(safe-area-inset-bottom), 15px);
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

			div {
				margin: 5px 5rem 5px 0;
			}	

			a {
				color: inherit;
				margin: auto;
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