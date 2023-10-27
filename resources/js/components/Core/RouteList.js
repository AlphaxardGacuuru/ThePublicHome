import React from "react"
import { Route } from "react-router-dom"

import ProfileNav from "@/components/Layouts/ProfileNav"

import Index from "@/pages/index"

import DeathAnnouncementIndex from "@/pages/death-announcement"
import DeathAnnouncementCreate from "@/pages/death-announcement/create"
import DeathAnnouncementShow from "@/pages/death-announcement/[id]"
import DeathAnnouncementEdit from "@/pages/death-announcement/edit/[id]"

import ProfileShow from "@/pages/profile/[id]"
import ProfileEdit from "@/pages/profile/edit/[id]"

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
	]

	const profileRoutes = [
		{
			path: "/profile/show",
			component: <ProfileShow {...GLOBAL_STATE} />,
		},
		{
			path: "/profile/edit",
			component: <ProfileEdit {...GLOBAL_STATE} />,
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

			<ProfileNav {...GLOBAL_STATE}>
				{profileRoutes.map((route, key) => (
					<Route
						key={key}
						path={route.path}
						exact
						render={() => route.component}
					/>
				))}
			</ProfileNav>
		</React.Fragment>
	)
}

export default RouteList
