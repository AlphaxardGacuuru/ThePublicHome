import React from "react"

import ViewPage from "@/components/Core/ViewPage"

const view = (props) => {
	return (
		<ViewPage
			{...props}
			title="Graduation Announcements"
			announcement="graduation"
		/>
	)
}

export default view
