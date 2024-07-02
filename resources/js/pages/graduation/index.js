import React from "react"

import ListingPage from "@/components/Core/ListingPage"

const index = (props) => {
	return (
		<ListingPage
			{...props}
			title="Graduation Announcements"
			announcement="graduation"
			announcements={props.graduations}
			setAnnouncements={props.setGraduations}
		/>
	)
}

export default index
