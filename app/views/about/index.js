import Header from "components/header";
import Intro from "components/intro";
import Container from "components/container";
import Footer from "components/footer";
import Button from "components/button";
import ThemeButton from "components/theme-button";

export default () => {
	return (<>
	<Header/>
	<Intro
		title="About vixalien"
	/>
	<Container tag="main">
		<p>
			Hi! I'm Shema Angelo, or vixalien. I'm a web developer and (designer? maybe).
			I love to build things from scratch while I can. Here you can find my projects,
			posts and whatever. Stay tuned!
		</p>
		<h2>Settings</h2>
		<p>
			<ThemeButton/>
		</p>
		<h2>Links</h2>
		<p>
			<Button text="Github" icon="github" href="https://www.github.com/vixalien"/>
			<Button text="Donate" icon="paypal" href="https://www.paypal.com"/>
		</p>
	</Container>
	<Footer/>
	</>
	)
}