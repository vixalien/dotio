import External from "./icons/external";
import Github from "./icons/github";
import PayPal from "./icons/paypal";

let getIcon = (icon) => {
	if (icon=='github') {
		return <Github/>
	} else if (icon=='paypal') {
		return <PayPal/>
	} else {
		return icon;
	}
}

let Button = ({ text = "Button", icon=<span/>, href , ...props }) => {
	let Icon = getIcon(icon);
	return <>
		{href ? <a href={href} target="_blank" {...props}>
			<span className="icon b">{getIcon(icon)}</span>
			<span>{text}</span>
			<span className="icon e"><External/></span>
		</a> :
		<button {...props}>
			<span>{text}</span>
		</button>}
		<style jsx>{`
			button, a {
				padding: 10px;
				display: flex;
				border: 2px solid;
				margin: 10px 0;
				border-radius: 10px;
				background-color: inherit;
				color: inherit;
				font: inherit;
				transition: color .3s;
				cursor: pointer;
				width: 100%;
				text-align: start;
				outline: 0;
			}
			button:hover, a:hover {
				color: var(--link);
			}
			button span, a span {
				margin: auto 0;
			}
			button .e, a .e {
				height: 24px;
				width: 24px;
				margin-left: auto;
			}
			button .b, a .icon.b {
				height: 30px;
				width: 30px;
				margin-right: 10px;
			}
		`}</style>
	</>
}

export default Button;