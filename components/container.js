let Container = ({ tb = true, rl = true, ...props }) => {
	return <>
		<div {...props}/>
		<style jsx>{`
			div {
				padding: ${tb ? '30px' : '0'} ${rl ? '10px' : '0'};
				max-width: 620px;
				margin: auto;
			}

			@supports (padding: max(env(safe-area-inset-left, 0px))) {
				div {
					${rl ? '' : `
					padding-left  : max(env(safe-area-inset-left  ), 10px);
					padding-right : max(env(safe-area-inset-right ), 10px);
					`}
					max-width: calc(600px + max(env(safe-area-inset-right ), 10px) + max(env(safe-area-inset-left  ), 10px));
				}
			}
		`}</style>
	</>
}

export default Container;