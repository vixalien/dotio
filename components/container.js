let Container = ({ tag = 'div', tb = null, rl = true, t = true, b = true, ...props }) => {
	if (tb != null) { t = tb; b = tb; };
	let pad = (param, variable) => {
		if (param) {
			if (parseInt(param)) {
				return parseInt(param) + 'px';
			} else {
				return 'var(--padding-' + variable + ')';
			}
		} else {
			return '0';
		}
	}
	let Tag = ({ children, ...props }) => React.createElement(tag, props, children)
	return <>
		<Tag className="container" {...props}/>
		<style jsx>{`
			.container {
				padding: ${pad(t, 'top')} ${pad(rl, 'right')} ${pad(b, 'bottom')} ${pad(rl, 'left')};
				max-width: var(--max-width);
				width: 100%;
				margin: auto;
			}
		`}</style>
	</>
}

export default Container;