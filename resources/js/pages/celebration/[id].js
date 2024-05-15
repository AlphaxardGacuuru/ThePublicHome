import React from "react"

import ViewPage from "@/components/Core/ViewPage"

const view = (props) => {
	return (
		<ViewPage
			{...props}
			title="Celebration Announcements"
			announcement="celebration"
		/>
	)
}

export default view
