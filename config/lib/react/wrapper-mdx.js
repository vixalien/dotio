import Header from "components/header";
import Footer from "components/footer";
import Intro from "components/intro";

import React from "react";

function App({ wrapperProps: { attributes = {} }, ...props }) {
	return <>
		<Header/>
		<Intro {...attributes}/>
		<main {...props}/>
		<Footer/>
	</>
}

export default App;