import Header from "components/header";
import Intro from "components/intro";
import Container from "components/container";
import Footer from "components/footer";
import Projects from "components/card/projects";

export default () => {
	return (<>
	<Header/>
	<Intro
		title="Projects"
	/>
	<Container tag="main" b={0}>
		<p>
			Articles about my different projects.
		</p>
	</Container>
	<Projects link={false}/>
	<Footer/>
	</>
	)
}