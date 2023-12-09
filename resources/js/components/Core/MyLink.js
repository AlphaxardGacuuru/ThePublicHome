import React from "react"
import { Link } from "react-router-dom"

const MyLink = ({ text, linkTo }) => (
	<Link
		to={linkTo}
		className="btn btn-outline-primary rounded-0 text-uppercase">
		{text}
	</Link>
)

MyLink.defaultProps = {
	linkTo: "/",
}

export default MyLink
