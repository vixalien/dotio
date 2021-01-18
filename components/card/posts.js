import Card from './index';
import Line from './line';

import postsJSON from '.build/data/posts.json'

let posts = Object.entries(postsJSON)
	.filter((_, id) => id < 4)

let Posts = (props) => {
	return posts.map(([slug, {title, description, created}]) => <Line
		title={title}
		date={new Date(created).toDateString()}
		text={description}
		href={"/post/"+slug}
	/>)
}

let PostsCard = () => {
	return <Card
		title="Recent Posts"
		link="View All"
		href="/posts"
		column
		hr={true}
	>
		<Posts/>
	</Card>
}

export default PostsCard;