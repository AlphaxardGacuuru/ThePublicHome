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

import GraduationIndex from "@/pages/graduation"
import GraduationCreate from "@/pages/graduation/create"
import GraduationShow from "@/pages/graduation/[id]"
import GraduationEdit from "@/pages/graduation/edit/[id]"

import SuccessCardIndex from "@/pages/success-card"
import SuccessCardCreate from "@/pages/success-card/create"
import SuccessCardShow from "@/pages/success-card/[id]"
import SuccessCardEdit from "@/pages/success-card/edit/[id]"

import AnniversaryIndex from "@/pages/anniversary"
import AnniversaryCreate from "@/pages/anniversary/create"
import AnniversaryShow from "@/pages/anniversary/[id]"
import AnniversaryEdit from "@/pages/anniversary/edit/[id]"

import CelebrationIndex from "@/pages/celebration"
import CelebrationCreate from "@/pages/celebration/create"
import CelebrationShow from "@/pages/celebration/[id]"
import CelebrationEdit from "@/pages/celebration/edit/[id]"

import ProfileShow from "@/pages/profile/[id]"
import ProfileEdit from "@/pages/profile/edit/[id]"
import Membership from "@/pages/profile/membership"

import RecapIndex from "@/pages/recap"

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
			path: "/deaths",
			component: <DeathIndex {...GLOBAL_STATE} />,
		},
		{
			path: "/deaths/create",
			component: <DeathCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/deaths/show/:id",
			component: <DeathShow {...GLOBAL_STATE} />,
		},
		{
			path: "/deaths/edit/:id",
			component: <DeathEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/weddings",
			component: <WeddingIndex {...GLOBAL_STATE} />,
		},
		{
			path: "/weddings/create",
			component: <WeddingCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/weddings/show/:id",
			component: <WeddingShow {...GLOBAL_STATE} />,
		},
		{
			path: "/weddings/edit/:id",
			component: <WeddingEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/graduations",
			component: <GraduationIndex {...GLOBAL_STATE} />,
		},
		{
			path: "/graduations/create",
			component: <GraduationCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/graduations/show/:id",
			component: <GraduationShow {...GLOBAL_STATE} />,
		},
		{
			path: "/graduations/edit/:id",
			component: <GraduationEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/success-cards",
			component: <SuccessCardIndex {...GLOBAL_STATE} />,
		},
		{
			path: "/success-cards/create",
			component: <SuccessCardCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/success-cards/show/:id",
			component: <SuccessCardShow {...GLOBAL_STATE} />,
		},
		{
			path: "/success-cards/edit/:id",
			component: <SuccessCardEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/anniversaries",
			component: <AnniversaryIndex {...GLOBAL_STATE} />,
		},
		{
			path: "/anniversaries/create",
			component: <AnniversaryCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/anniversaries/show/:id",
			component: <AnniversaryShow {...GLOBAL_STATE} />,
		},
		{
			path: "/anniversaries/edit/:id",
			component: <AnniversaryEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/celebrations",
			component: <CelebrationIndex {...GLOBAL_STATE} />,
		},
		{
			path: "/celebrations/create",
			component: <CelebrationCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/celebrations/show/:id",
			component: <CelebrationShow {...GLOBAL_STATE} />,
		},
		{
			path: "/celebrations/edit/:id",
			component: <CelebrationEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/recaps",
			component: <RecapIndex {...GLOBAL_STATE} />,
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
