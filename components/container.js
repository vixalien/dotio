let Container = ({ tb = true, rl = true, t = true, b = true, ...props }) => {
	if (!tb) { t = false; b = false; };
	let pad = (param, variable) => {
		if (param) {
			if (parseInt(param)) {
				return parseInt(param) + 'px';
			} else {
				return 'var(--padding-' + variable + ');';
			}
		} else {
			return '0';
		}
	}
	return <>
		<div {...props}/>
		<style jsx>{`
			div {
				padding: ${pad(t, top)} ${pad(r, right)} ${pad(b, bottom)} ${pad(l, left)};
				max-width: var(--max-width);
				width: 100%;
				margin: auto;
			}
		`}</style>
	</>
}

export default Container;