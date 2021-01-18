import Header from "components/header";
import Footer from "components/footer";
import Welcome from "components/welcome";
import Projects from "components/card/projects";
import Posts from "components/card/posts";

export default () => {
	return (<>
	<Header/>
	<Welcome/>
	<Posts/>
	<Projects/>
	<Footer/>
	</>
	)
}