import React, { useState } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import CloseSVG from "@/svgs/CloseSVG"
import PersonSVG from "@/svgs/PersonSVG"
import MembershipSVG from "@/svgs/MembershipSVG"

const ProfileNav = (props) => {
	const location = useLocation()

	// Location
	const show = location.pathname.match("profile") ? "d-block" : "d-none"

	// Function for showing active color
	const active = (check) => {
		return location.pathname.match(check) && "active"
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return location.pathname == check && "active"
	}

	return (
		<div
			id="MyElement"
			className={`${props.leftMenu} ${show}`}>
			{/* <!-- ***** Side Menu Area Start ***** --> */}
			<div className="leftMenu d-flex align-items-center justify-content-start">
				<div
					className="sonarNav wow fadeInUp w-100 mt-4"
					data-wow-delay="1s">
					<nav>
						<ul className="m-0 p-0">
							<li className={`nav-item`}>
								<Link
									to={`/profile/show/${props.auth.id}`}
									className={`nav-link ${
										active("/profile/show") || active("/profile/edit")
									}`}>
									<div className="nav-link-icon">
										<PersonSVG />
									</div>
									<div className="nav-link-text">Profile</div>
								</Link>
							</li>
							<li className={`nav-item`}>
								<Link
									to={`/profile/membership`}
									className={`nav-link ${active("/profile/membership")}`}>
									<div className="nav-link-icon">
										<MembershipSVG />
									</div>
									<div className="nav-link-text">Membership</div>
								</Link>
							</li>
						</ul>
					</nav>
				</div>

				<br />
			</div>
			{/* <!-- ***** Side Menu Area End ***** --> */}
			<div className="left-main">{props.children}</div>
		</div>
	)
}

ProfileNav.defaultProps = {
	notCurrentUser: false,
}

export default ProfileNav
