import List from './list';
import Container from './container';

export default ({ hero = false }) => {
	return (<>
		<header>
			<Container tag='nav' tb={'15'}>
				<span><a href="/">vixalien.io</a></span>
				<List
					links={{
						'/projects': 'Projects',
						'/posts': 'Posts',
						'/about': 'About'
					}}
				/>
			</Container>
		</header>
		<style jsx>{`
			/* Lil Header */
			header {
			  color: #b2b6bb;
			  background-color: #0a1826;
			  font-size: 2rem;
			}

			header :global(nav) {
			  display: flex;
			  justify-content: space-between;
			  flex-wrap: wrap;
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