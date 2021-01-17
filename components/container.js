let Container = (props) => {
	return <>
		<div {...props}/>
		<style jsx>{`
			div {
				padding: 30px 10px;
				max-width: 620px;
				margin: auto;
			}

			@supports (padding: max(env(safe-area-inset-left, 0px))) {
				div {
					padding-left  : max(env(safe-area-inset-left  ), 10px);
					padding-right : max(env(safe-area-inset-right ), 10px);
					max-width: calc(600px + max(env(safe-area-inset-right ), 10px) + max(env(safe-area-inset-left  ), 10px));
				}
			}
		`}</style>
	</>
}

export default Container;