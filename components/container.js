let Container = ({ tb = true, rl = true, t = true, b = true, ...props }) => {
	if (!tb) { t = false; b = false; };
	let paddingTop    = (t  ? 'var(--padding-top)   ' : '0');
	let paddingBottom = (b  ? 'var(--padding-bottom)' : '0');
	let paddingRight  = (rl ? 'var(--padding-right) ' : '0');
	let paddingLeft   = (rl ? 'var(--padding-left)  ' : '0');
	return <>
		<div {...props}/>
		<style jsx>{`
			div {
				padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft};
				max-width: var(--max-width);
				width: 100%;
				margin: auto;
			}
		`}</style>
	</>
}

export default Container;