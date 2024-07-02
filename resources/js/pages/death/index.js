import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Death and Funeral Announcements"
			announcement="death"
			announcements={props.deaths}
			setAnnouncements={props.setDeaths}
		/>
	)
}

export default index
