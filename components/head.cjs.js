(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom/server')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom/server'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.wrapper = {}, global.React, global.ReactDOMServer));
}(this, (function (exports, React, ReactDOMServer) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
	var ReactDOMServer__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOMServer);

	//context.js
	var Context = /*#__PURE__*/React__default['default'].createContext();

	let Head = ({
	  children
	}) => {
	  let context = React.useContext(Context);
	  context = context || ""; // WIP

	  context += ReactDOMServer__default['default'].renderToString(children);
	  console.log('context in head', context);
	  return null;
	};

	function getContext() {
	  let jsx = /*#__PURE__*/React__default['default'].createElement(Context.Consumer, null, context => context);
	  return ReactDOMServer__default['default'].renderToString(jsx);
	}

	exports.default = Head;
	exports.getContext = getContext;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
