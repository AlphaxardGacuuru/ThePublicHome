import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Death and Funeral Announcements"
			model="death"
		/>
	)
}

export default index
