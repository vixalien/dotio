import Container from 'components/container';

export default () => {
	return (<>
		<footer>
			<Container t={'50'}>
				<hr/>
				<a href="#top">↑ Top</a>
				<div><a href="/">vixalien.io</a></div>
			</Container>
		</footer>
		<style jsx>{`
			/* Lil Footer */
			footer {
			  color: var(--heading-fg);
			}

			hr {
				padding-bottom: 20px;
			}

			a {
				color: inherit;
			}

			div {
				margin: 5px 5rem 5px 0;
			}

			div a {
				border-bottom-width: 2px;
				font-size: 2rem;
				font-weight: 700;
			}
		`}</style>
	</>)
}