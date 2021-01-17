let Entity = ({ src, alt, text }) => {
	return <>
		<div className="entity">
			<div className="radius">
				<img src={src} alt={alt} width="120px" height="120px"/>
				<span>{text}</span>
			</div>
		</div>
		<style jsx>{`
			.entity span {
			  display: inline-flex;
			  padding: 40px 15px 10px 10px;
			  position: absolute;
			  bottom: 0;
			  background: linear-gradient(0deg, #fff9, #fff5 60%, transparent 80%);
			  right: 0;
			  left: 0;
				color: #000;
				display: block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.entity {
			  display: flex;
			  margin: 10px;
			  flex-direction: column;
			  cursor: pointer;
			  transition: .3s;
			}

			.entity:first-child {
				margin-left: 0;
			}

			.entity:last-child {
				margin-right: 0;
			}

			.entity:hover, .entity:active, .entity:focus {
				color: var(--link);
			}
			.entity .radius {
				overflow: hidden;
				border-radius: 20px;
				position: relative;
				border: 3px solid;
				width: 120px;
				height: 120px;
			}
		`}</style>
	</>
}

export default Entity;