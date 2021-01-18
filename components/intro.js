let Intro = ({ title, description }) => {
	return <>
		<section>
			<div>
				<h1>{title}</h1>
				<p className="description">{description}</p>
			</div>
			<hr/>
		</section>
		<style jsx>{`
			p.description {
				color: var(--secondary);
				font-weight: 400;
				font-size: 1.5rem;
				margin: 0;
				line-height: 1.3;
			}
			div {
				padding-top: 30px;
				padding-bottom: 30px;
			}

			section {
				max-width: 620px;
				margin: auto;
				padding-left: 10px;
				padding-right: 10px;
			}

			@supports (padding: max(env(safe-area-inset-left, 0px))) {
				section {
					padding-left  : max(env(safe-area-inset-left  ), 10px);
					padding-right : max(env(safe-area-inset-right ), 10px);
				}
			}
		`}</style>
	</>
}

export default Intro;