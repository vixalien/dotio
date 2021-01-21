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
		description="Articles about my different projects."
	/>
	<Projects link={false}/>
	<Footer/>
	</>
	)
}