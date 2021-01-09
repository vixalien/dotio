import { useState } from "react";

import Name from "components/name";

export default (props = {}) => {
	let [names, setNames] = useState("Angelo");
	return <main>
		<h1>Hello</h1>
		<Name name={name} / >
		<input type="text" defaultValue={names} onChange={event => setNames(event.target.value)}/>
		<div>Props: {JSON.stringify(props)}</div>
	</main>;
}