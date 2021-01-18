let Entity = ({ src, alt, title, date, text, href }) => {
	return <>
		<a className="entity" href={href}>
			<h3>{title} &rarr;</h3>
			<h4>{date}</h4>
			<p>{text}</p>
		</a>
		<style jsx>{`
			h3 {
			  margin: 0;
			  font-size: 1.3rem;
			}

			h4 {
				margin: 0;
			  font-size: 0.9rem;
			  margin-bottom: 10px;
			}

			 p {
			  margin: 0;
			  line-height: 1.5;
			}

			.entity:hover, .entity:active, .entity:focus {
				box-shadow: 0 0 0px 3px #bac7d4;
			}

			.entity {
				margin: 0.5rem 0;
			  flex-basis: 45%;
			  padding: 1rem;
			  text-align: left;
			  color: inherit;
			  text-decoration: none;
			  border: 1px solid;
			  border-radius: 10px;
				transition: color 0.15s ease,border-color 0.15s ease, box-shadow 0.3s ease;
  		}
		`}</style>
	</>
}

export default Entity;