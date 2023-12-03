import React from "react"
import { Route } from "react-router-dom"

import ProfileNav from "@/components/Layouts/ProfileNav"

import Index from "@/pages/index"

import DeathIndex from "@/pages/death"
import DeathCreate from "@/pages/death/create"
import DeathShow from "@/pages/death/[id]"
import DeathEdit from "@/pages/death/edit/[id]"

import WeddingIndex from "@/pages/wedding"
import WeddingCreate from "@/pages/wedding/create"
import WeddingShow from "@/pages/wedding/[id]"
import WeddingEdit from "@/pages/wedding/edit/[id]"

import ProfileShow from "@/pages/profile/[id]"
import ProfileEdit from "@/pages/profile/edit/[id]"
import Membership from "@/pages/profile/membership"

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
			path: "/death",
			component: <DeathIndex {...GLOBAL_STATE} />,
		},
		{
			path: "/death/create",
			component: <DeathCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/death/show/:id",
			component: <DeathShow {...GLOBAL_STATE} />,
		},
		{
			path: "/death/edit/:id",
			component: <DeathEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/wedding",
			component: <WeddingIndex {...GLOBAL_STATE} />,
		},
		{
			path: "/wedding/create",
			component: <WeddingCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/wedding/show/:id",
			component: <WeddingShow {...GLOBAL_STATE} />,
		},
		{
			path: "/wedding/edit/:id",
			component: <WeddingEdit {...GLOBAL_STATE} />,
		},
	]

	const profileRoutes = [
		{
			path: "/profile/show/:id",
			component: <ProfileShow {...GLOBAL_STATE} />,
		},
		{
			path: "/profile/edit",
			component: <ProfileEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/profile/membership",
			component: <Membership {...GLOBAL_STATE} />,
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
