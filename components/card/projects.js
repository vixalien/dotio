import Card from './index';
import Entity from './entity';

let SampleProject = () => {
	return <Entity
		text="Sample Project"
		src="/favicon/android-chrome-192x192.png"
		alt="Sample Project"
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