import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Anniversary Announcements"
			model="anniversary"
		/>
	)
}

export default index
