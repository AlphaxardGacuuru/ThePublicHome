import React from "react"
import { Link } from "react-router-dom"

const MyLink = ({ text, linkTo, className }) => (
	<Link
		to={linkTo}
		className={`btn rounded-0 text-uppercase ${className}`}>
		{text}
	</Link>
)

MyLink.defaultProps = {
	linkTo: "/",
	className: "",
}

export default MyLink
