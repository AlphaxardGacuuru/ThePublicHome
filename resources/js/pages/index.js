import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import DeathAnnouncement from "@/components/DeathAnnouncement/DeathAnnouncement"
import LoadingDeathAnnouncement from "@/components/DeathAnnouncement/LoadingDeathAnnouncement"

import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	const [location, setLocation] = useState("home")

	useEffect(() => {
		props.get("death-announcements", props.setDeathAnnouncements)
	}, [])

	const active = (current) => {
		if (location == current) {
			return "bg-primary-subtle"
		}
	}

	const dummyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	return (
		<div className="row">
			<div className="col-sm-1"></div>
			<div className="col-sm-10">
				{/* Chat button */}
				{props.auth?.username != "@guest" && (
					<Link
						to="/death-announcement/create"
						id="chatFloatBtn">
						<PlusSVG />
					</Link>
				)}
				<center>
					<h1>Death and Funeral Announcements</h1>

					<div className="d-flex justify-content-around w-25">
						<div
							className={`${active("home")} rounded-pill mx-2 px-5 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocation("home")}>
							Home
						</div>
						<div
							className={`${active(
								"international"
							)} rounded-pill mx-2 px-5 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocation("international")}>
							International
						</div>
					</div>

					<br />

					{/* Death Announcements */}
					<div className="d-flex flex-wrap justify-content-center">
						{/* Loading Death Announcement items */}
						{dummyArray
							.filter(() => props.deathAnnouncements.length < 1)
							.map((item, key) => (
								<LoadingDeathAnnouncement key={key} />
							))}

						{/* Real Death Announcement items */}
						{props.deathAnnouncements
							.filter((announcement) => announcement.location == location)
							.map((deathAnnouncement, key) => (
								<DeathAnnouncement
									{...props}
									key={key}
									deathAnnouncement={deathAnnouncement}
								/>
							))}
					</div>
					{/* Death Announcements End */}
				</center>
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

export default index
