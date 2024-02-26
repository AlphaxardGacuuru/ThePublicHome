import React from "react"
import { Link } from "react-router-dom"

const MyLink = ({ text, linkTo, className, style }) => (
	<Link
		to={linkTo}
		className={`btn rounded-0 text-uppercase ${className}`}
		style={style}>
		{text}
	</Link>
)

MyLink.defaultProps = {
	linkTo: "/",
	className: "",
}

export default MyLink
