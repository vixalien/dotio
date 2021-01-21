import { createElement } from 'react';
import { hydrate } from 'react-dom';

export default (App) => hydrate(createElement(App, null), document.getElementById('root'));