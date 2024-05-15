import React from "react"

import ViewPage from "@/components/Core/ViewPage"

const view = (props) => {
	return (
		<ViewPage
			{...props}
			title="Death and Funeral Announcements"
			announcement="death"
		/>
	)
}

export default view
