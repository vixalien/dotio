let List = ({ links }) => {
	return <>
		<ul>
			{Object.entries(links).map(([href, text], id) => 
				<li key={'nav-link-'+id}><a href={href}>{text}</a></li>
			)}
		</ul>
		<style jsx>{`
			ul {
				list-style-type: none;
			  display: flex;
			  padding: 0;
			  margin: auto 0;
			  flex-wrap: wrap;
			}

			li {
				padding: 0 5px 0 0;
				font-size: 1em;
			  display: flex;
			  min-height: 40px;
			}

			li:not(:last-child)::after {
			  content: "•";
			  margin: auto 0;
			  padding: 0 0 0 5px;
			}

			a {
				color: inherit;
				border-bottom: 1px solid transparent;
				margin: auto;
			}

			li a:hover {
				border-bottom: 1px solid;
				text-decoration: none;
			}
		`}</style>
	</>
}

export default List;