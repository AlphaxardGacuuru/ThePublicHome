import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Anniversary Announcements"
			announcement="anniversary"
		/>
	)
}

export default index
