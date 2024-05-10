import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Celebration Announcements"
			model="celebration"
		/>
	)
}

export default index
