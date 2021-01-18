import Card from './index';
import Entity from './line';

let SampleProject = () => {
	return <Entity
		title="Title"
		text="Sample Project"
		date="Tue Jan 19 2021"
		href="/project/random"
	/>
}

let ProjectsCard = () => {
	return <Card
		title="Projects"
		link="View All"
		href="/projects"
	>
		<SampleProject />
		<SampleProject />
		<SampleProject />
		<SampleProject />
	</Card>
}

export default ProjectsCard;