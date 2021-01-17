import { Fragment as F } from 'react';
import Container from '../container';
import Entity from './entity';

let Title = ({ heading, href, link }) => {
	return <F>
		<div>
			<h2>{heading}</h2>
			<span/>
			<a href={href}>{link} &rarr;</a>
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
				border-bottom: 1px solid;
				color: inherit;
			}
		`}</style>
	</F>
}

let SampleProject = () => {
	return <Entity
		text="Sample Project"
		src="/favicon/android-chrome-192x192.png"
		alt="Sample Project"
	/>
}

let Card = () => {
	return <>
		<section>
			<Container>
				<Title
					heading="Project"
					href="/projects"
					link="View All"
				/>
				<div>
					<SampleProject />
					<SampleProject />
					<SampleProject />
					<SampleProject />
					<SampleProject />
				</div>
			</Container>
		</section>
		<style jsx>{`
			section {
				background-color: #9e9e9e;
			}

			div {
				display: flex;
				overflow: auto;
			}
		`}</style>
	</>
}

export default Card;