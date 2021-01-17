let Welcome = () => {
	return <>
		<section>
			<h1>Welcome!</h1>
			<h2 className="description">
				Hello, my name is Shema Angelo, but you can call me vixalien.
				I am a web developer. This is my site, where you can find my
				posts and projects. You can learn more about me at <a href="/about">/about</a>
			</h2>
		</section>
		<style jsx>{`
			section {
				background-color: #dcb8fb;
				background-image: linear-gradient(45deg, #dcb8fb, #ad4ef9);
			}

			section h1 {
				font-size: 2.5rem;
			}

			section h2.description {
				color: var(--fg);
				font-size: 1.3rem;
				font-weight: 500;
			}
		`}</style>
	</>
}

export default Welcome;