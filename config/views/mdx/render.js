import fs from 'fs'
import path from 'path'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'

import babel from '@babel/core'
import renderMdx from '@mdx-js/mdx'
import {MDXProvider, mdx} from '@mdx-js/react'

// import babelrc
const babelrc = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.babelrc.json'), 'utf8'))

const transform = code => babel.transform(code, babelrc).code

let resolve = (...args) => path.join(process.cwd(), '.build', ...args)
let wrapperPath = resolve('lib', 'wrapper-mdx.js');

const renderWithReact = async (mdxCode, props = {}) => {
	const jsx = await renderMdx(mdxCode, {skipExport: true})
	const code = transform(jsx)
	const scope = {mdx, ...props}

	const fn = new Function(
		'React',
		...Object.keys(scope),
		`${code}; return React.createElement(MDXContent)`
	)

	const element = fn(React, ...Object.values(scope))

	const components = {
		wrapper: (data) => require(wrapperPath)({ wrapperProps: props , ...data })
	}

	const elementWithProvider = React.createElement(
		MDXProvider,
		{components},
		element
	)
	return renderToStaticMarkup(elementWithProvider)
}

export default renderWithReact;