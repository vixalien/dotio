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
				border-bottom: none;
			}

			a:hover {
				border-bottom: bottom;
			}
		`}</style>
	</F>
}

let Card = ({ title, href, link, column = '', children }) => {
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
		</section>
		<style jsx>{`
			div {
				display: flex;
			  justify-content: left;
			  flex-wrap: wrap;

			  margin-top: 1rem;
			}

			.column {
				flex-direction: column;
			}
		`}</style>
	</>
}

export default Card;