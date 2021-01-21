import Header from "components/header";
import Footer from "components/footer";
import Intro from "components/intro";
import Container from "components/container";

import React from "react";

function App({ wrapperProps: { attributes = {} }, ...props }) {
	return <>
		<Header/>
		<Intro {...attributes}/>
		<Container tag="main" {...props}/>
		<Footer/>
	</>
}

export default App;