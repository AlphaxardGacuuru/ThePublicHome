import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Anniversary Announcements"
			announcement="anniversary"
			announcements={props.anniversaries}
			setAnnouncements={props.setAnniversaries}
		/>
	)
}

export default index
