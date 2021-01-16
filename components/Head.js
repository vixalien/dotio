import React, { useContext } from 'react';
import ReactDOMServer from 'react-dom/server';
import Context from './head.context.js';


let Head = ({ children }) => {
	let context = useContext(Context);
	context = context || "";
	// WIP
	context += ReactDOMServer.renderToString(children)
	
	console.log('context in head', context);
	return null;
}

export function getContext () {
	let jsx = <Context.Consumer>
		{context => context}
	</Context.Consumer>
	return ReactDOMServer.renderToString(jsx);
}

export default Head;