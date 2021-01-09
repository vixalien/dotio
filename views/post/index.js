import { useState } from "react";

export default (props = {}) => {
	let [names, setNames] = useState("Angelo");
	return <main>
		<h1>Hello</h1>
		<div>Your names are: {names}</div>
		<input type="text" defaultValue={names} onChange={event => setNames(event.target.value)}/>
		<div>Props: {JSON.stringify(props)}</div>
	</main>;
}