import React from "react"

import ViewPage from "@/components/Core/ViewPage"

const view = (props) => {
	return (
		<ViewPage
			{...props}
			title="Anniversary Announcements"
			announcement="anniversary"
		/>
	)
}

export default view
