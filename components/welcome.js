let Welcome = () => {
	return <>
		<section>
			<div>
				<h1>Welcome!</h1>
				<h2 className="description">
					Hello, my name is Shema Angelo, but you can call me vixalien.
					I am a web developer. This is my site, where you can find my
					posts and projects. You can learn more about me at <a href="/about">/about</a>
				</h2>
			</div>
		</section>
		<style jsx>{`
			section {
				background-color: #dcb8fb;
				background-image: linear-gradient(45deg, #dcb8fb, #ad4ef9);
			}

			h1 {
				font-size: 2.5rem;
			}

			h2.description {
				color: var(--fg);
				font-size: 1.3rem;
				font-weight: 500;
			}

			div {
				padding: 30px 10px;
				max-width: 620px;
				margin: auto;
			}

			@supports (padding: max(env(safe-area-inset-left, 0px))) {
				div {
					padding-left  : max(env(safe-area-inset-left  ), 10px);
					padding-right : max(env(safe-area-inset-right ), 10px);
					max-width: calc(600px + max(env(safe-area-inset-right ), 10px) + max(env(safe-area-inset-left  ), 10px));
				}
			}
		`}</style>
	</>
}

export default Welcome;