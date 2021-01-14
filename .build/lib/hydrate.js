var hydrate = (function (react, reactDom) {
	'use strict';

	var hydrate = (App => reactDom.hydrate( /*#__PURE__*/react.createElement(App, null), document.getElementById('root')));

	return hydrate;

}(React, ReactDOM));
