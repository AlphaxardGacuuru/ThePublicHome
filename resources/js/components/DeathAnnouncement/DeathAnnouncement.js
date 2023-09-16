import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"

const DeathAnnouncement = (props) => {
	return (
		<span
			className="my-2 mx-2 pt-0 px-0 pb-2 card"
			style={{ display: "inline-block" }}>
			<div className="death-announcement-media">
				<div className="death-announcement-thumbnail">
					<Link to={`/death-announcement/show/${props.deathAnnouncement.id}`}>
						<Img src={props.deathAnnouncement.poster} />
					</Link>
				</div>
				{/* User info */}
				<div
					className="d-flex p-1"
					style={{ maxWidth: "220em" }}>
					{/* Avatar */}
					<div
						className="py-2"
						style={{ minWidth: "40px" }}>
						<Link
							to={`/profile/show/${props.deathAnnouncement.userId}`}>
							<Img
								src={props.deathAnnouncement.userAvatar}
								className="rounded-circle"
								width="30em"
								height="30em"
								alt="user"
								loading="lazy"
							/>
						</Link>
					</div>
					{/* Avatar End */}
					{/* Service Provider Name */}
					<div className="flex-grow-1">
						<h6 className="service-provider-name mt-1 pt-2 px-1">
							{props.deathAnnouncement.userName}
						</h6>
					</div>
					{/* Service Provider Name End */}
				</div>
				{/* User info End */}
				<center>
					<h3 className="death-announcement-name">
						{props.deathAnnouncement.name}
					</h3>
					<p className="m-0">
						<span
							className="me-1"
							style={{ color: "#0077B6" }}></span>
						{props.deathAnnouncement.eulogy}
					</p>
				</center>
			</div>
		</span>
	)
}

export default DeathAnnouncement
