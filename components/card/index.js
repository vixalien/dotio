import { Fragment as F } from 'react';
import Container from '../container';

let Title = ({ heading, href, link }) => {
	return <F>
		<div>
			<h2>{heading}</h2>
			<span/>
			{link ? <a href={href}>{link} &rarr;</a> : null }
		</div>
		<style jsx>{`
			div {
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 10px;
			}

			span {
				flex: 1;
			}

			h2 {
				font-size: 2rem;
				margin: auto;
			}

			a {
				margin: auto;
				font-size: 1.1rem;
				color: var(--link);
			}

			:global([data-dark]) a {
				border: 1px solid;
			  padding: 5px 10px;
			  border-radius: 10px;
			}

			a:hover {
				border-bottom: bottom;
			}
		`}</style>
	</F>
}

let Card = ({ hr, title, href, link, column = '', children }) => {
	return <>
		<section>
			<Container>
				<Title
					heading={title}
					href={href}
					link={link}
				/>
				<div className={(column && 'column')}>
					{children}
				</div>
			</Container>
			{hr ? <Container tb={false}><hr/></Container> : null}
		</section>
		<style jsx>{`
			div {
				display: flex;
			  justify-content: left;
			  margin-top: 1rem;
			  flex-direction: column;
			}

			.column {
				flex-direction: column;
			}
		`}</style>
	</>
}

export default Card;