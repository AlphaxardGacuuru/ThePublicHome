import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Graduation Announcements"
			model="graduation"
		/>
	)
}

export default index
