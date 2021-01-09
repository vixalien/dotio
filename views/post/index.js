import { useState } from "react";

import Name from "components/name";
import Head from "components/Head";

export default (props = {}) => {
	let [names, setNames] = useState("User");
	return <main>
		<Head><title>Hello</title></Head>
		<Head><a/></Head>
		<h1><Name name={names} /></h1>
		<input type="text" defaultValue={names} onChange={event => setNames(event.target.value)}/>
	</main>;
}