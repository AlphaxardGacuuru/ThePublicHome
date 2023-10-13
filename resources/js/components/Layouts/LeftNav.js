import React, { useState } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import PersonSVG from "@/svgs/PersonSVG"
import MembershipSVG from "@/svgs/MembershipSVG"

const LeftNav = (props) => {
	const location = useLocation()

	// Location
	const show = location.pathname.match("profile") ? "d-block" : "d-none"

	// Function for showing active color
	const active = (check) => {
		return location.pathname.match(check) && "nav-link-active"
	}

	return (
		<div
			id="MyElement"
			className={props.leftMenu + " " + show}>
			{/* <!-- ***** Side Menu Area Start ***** --> */}
			<div className="leftMenu d-flex align-items-center justify-content-start">
				<div
					className="sonarNav wow fadeInUp w-100 mt-5"
					data-wow-delay="1s">
					<nav>
						<ul className="m-0 p-0">
							<li className="nav-item active">
								<Link
									to={`/profile/show/${props.auth.id}`}
									className={`nav-link ${
										active("/profile/show") || active("/profile/edit")
									}`}>
									<span>
										<PersonSVG />
									</span>
									Profile
								</Link>
							</li>
							{props.notCurrentUser && (
								<React.Fragment>
									<li className="nav-item active">
										<Link
											to={`/profile/membership`}
											className={`nav-link ${active("/profile/membership")}`}>
											<span>
												<MembershipSVG />
											</span>
											Membership
										</Link>
									</li>
									<li className="nav-item active">
										<Link
											to="/profile/transaction"
											className={`nav-link ${active("/profile/transaction")}`}>
											<span>
												<TransactionSVG />
											</span>
											Transaction History
										</Link>
									</li>
									<li className="nav-item active">
										<Link
											to="/profile/event"
											className={`nav-link ${active("/profile/event")}`}>
											<span>
												<EventSVG />
											</span>
											Event Bookings
										</Link>
									</li>
									<li className="nav-item active">
										<Link
											to="/profile/loyalty"
											className={`nav-link ${active("/profile/loyalty")}`}>
											<span>
												<LoyaltySVG />
											</span>
											Loyatly Points
										</Link>
									</li>
								</React.Fragment>
							)}
						</ul>
					</nav>
				</div>

				<br />
			</div>
			{/* <!-- ***** Side Menu Area End ***** --> */}
		</div>
	)
}

LeftNav.defaultProps = {
	notCurrentUser: false,
}

export default LeftNav
