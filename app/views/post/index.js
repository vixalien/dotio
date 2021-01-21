import Header from "components/header";
import Intro from "components/intro";
import Container from "components/container";
import Footer from "components/footer";
import Posts from "components/card/posts";

export default () => {
	return (<>
	<Header/>
	<Intro
		title="Posts"
	/>
	<Container tag="main" b={0}>
		<p>
			Here are accumulated articles I have written.
		</p>
	</Container>
	<Posts link={false}/>
	<Footer/>
	</>
	)
}