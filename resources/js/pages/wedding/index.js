import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Wedding Announcements"
			announcement="wedding"
			announcements={props.weddings}
			setAnnouncements={props.setWeddings}
		/>
	)
}

export default index
