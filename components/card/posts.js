import Card from './index';
import Line from './line';

let text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

let random = () => {
	let arr = text.split(' ');
	return arr.splice(0, Math.floor(Math.random() * (arr.length - 1))).join(' ')
}

let SamplePost = (props) => {
	return <Line
		title="Sample Post"
		alt="Sample Post"
		href="/post/random"
		{...props}
	/>
}

let ProjectsCard = () => {
	return <Card
		title="Posts"
		link="View All"
		href="/posts"
		column
		hr={true}
	>
		<SamplePost text={random()}/>
		<SamplePost text={random()}/>
		<SamplePost text={random()}/>
		<SamplePost text={random()}/>
	</Card>
}

export default ProjectsCard;