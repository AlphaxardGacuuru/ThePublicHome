import React from "react"

import ViewPage from "@/components/Core/ViewPage"

const view = (props) => {
	return (
		<ViewPage
			{...props}
			title="Wedding Announcements"
			announcement="wedding"
		/>
	)
}

export default view
