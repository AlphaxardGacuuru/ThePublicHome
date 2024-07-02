import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Success Card Announcements"
			announcement="success-card"
			announcements={props.successCards}
			setAnnouncements={props.setSuccessCards}
		/>
	)
}

export default index
