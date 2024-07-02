import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Celebration Announcements"
			announcement="celebration"
			announcements={props.celebrations}
			setAnnouncements={props.setCelebrations}
		/>
	)
}

export default index
