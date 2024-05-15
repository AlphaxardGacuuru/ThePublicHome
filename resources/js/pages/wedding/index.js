import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Wedding Announcements"
			announcement="wedding"
		/>
	)
}

export default index
