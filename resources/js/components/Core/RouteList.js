import React from "react"
import { Route } from "react-router-dom"

import Index from "@/pages/index"

import DeathAnnouncementIndex from "@/pages/death-announcement"
import DeathAnnouncementCreate from "@/pages/death-announcement/create"
import DeathAnnouncementShow from "@/pages/death-announcement/[id]"
import DeathAnnouncementEdit from "@/pages/death-announcement/edit/[id]"

import ProfileShow from "@/pages/profile/[id]"

import Socialite from "@/components/Auth/Socialite"

const RouteList = (GLOBAL_STATE) => {
	const routes = [
		{
			path: "/",
			component: <Index {...GLOBAL_STATE} />,
		},
		{
			path: "/socialite/:message/:token",
			component: <Socialite {...GLOBAL_STATE} />,
		},
		{
			path: "/death-announcement",
			component: <DeathAnnouncementIndex {...GLOBAL_STATE} />,
		},
		{
			path: "/death-announcement/create",
			component: <DeathAnnouncementCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/death-announcement/show/:id",
			component: <DeathAnnouncementShow {...GLOBAL_STATE} />,
		},
		{
			path: "/death-announcement/edit/:id",
			component: <DeathAnnouncementEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/profile/show/:id",
			component: <ProfileShow {...GLOBAL_STATE} />,
		},
	]

	return (
		<React.Fragment>
			{routes.map((route, key) => (
				<Route
					key={key}
					path={route.path}
					exact
					render={() => route.component}
				/>
			))}
		</React.Fragment>
	)
}

export default RouteList
