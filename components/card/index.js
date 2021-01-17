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
				font-size: 1.3rem;
				border-bottom: none;
			}

			a:hover {
				border-bottom: none;
				color: var(--link);
			}
		`}</style>
	</F>
}

let Card = ({ title, href, link, children }) => {
	return <>
		<section>
			<Container>
				<Title
					heading={title}
					href={href}
					link={link}
				/>
				<div>
					{children}
				</div>
			</Container>
		</section>
		<style jsx>{`
			div {
				display: flex;
				overflow: auto;
			}
		`}</style>
	</>
}

export default Card;