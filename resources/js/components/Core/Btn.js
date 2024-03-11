import React from "react"

const Btn = ({ btnStyle, btnClass, btnText, onClick, loading }) => (
	<button
		style={btnStyle}
		className={`btn text-uppercase rounded-0 ${btnClass}`}
		onClick={onClick}
		disabled={loading}>
		{btnText}
		{loading && (
			<div
				className="spinner-border my-auto"
				style={{ color: "inherit" }}></div>
		)}
	</button>
)

Btn.defaultProps = {
	btnClass: "",
	loading: false,
	disabled: false,
}

export default Btn
