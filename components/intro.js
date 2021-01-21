import Container from './container';

let Intro = ({ title, description }) => {
	return <>
		<Container tag='section' tb={false}>
			<div>
				<h1>{title}</h1>
				{description ? <p className="description">{description}</p> : null}
			</div>
			<hr/>
		</Container>
		<style jsx>{`
			h1 {
				margin: 0;
			}
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
		`}</style>
	</>
}

export default Intro;