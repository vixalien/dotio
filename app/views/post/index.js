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
		description="Here are accumulated articles I have written."
	/>
	<Posts link={false}/>
	<Footer/>
	</>
	)
}