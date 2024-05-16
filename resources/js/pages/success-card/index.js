import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Success Card Announcements"
			announcement="success-card"
		/>
	)
}

export default index
