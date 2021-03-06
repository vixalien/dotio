import Container from './container';

let Welcome = () => {
	return <>
		<section>
			<Container>
				<h1>Welcome!</h1>
				<h2 className="description">
					Hello, my name is Shema Angelo, but you can call me vixalien.
					I am a web developer. This is my site, where you can find my
					posts and projects. You can learn more about me at <a href="/about">/about</a>
				</h2>
			</Container>
		</section>
		<style jsx>{`
			section {
				background-color: #dcb8fb;
				background-image: linear-gradient(45deg, #dcb8fb, #ad4ef9);
			}

			:global([data-dark]) section {
				background: var(--bg);
			}

			h1 {
				font-size: 2.5rem;
			}

			h2.description {
				color: var(--fg);
				font-size: 1.3rem;
				font-weight: 500;
			}

			a {
				border-bottom-color: currentColor;
			}
		`}</style>
	</>
}

export default Welcome;