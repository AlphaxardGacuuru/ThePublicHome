import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Graduation Announcements"
			announcement="graduation"
		/>
	)
}

export default index
