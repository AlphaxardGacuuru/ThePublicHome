import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

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
			{/* Background */}
			<div
				className="row p-0 m-0"
				style={{
					backgroundImage: "url(storage/death-announcement-posters/1.jpg)",
					backgroundPosition: "center",
					backgroundSize: "cover",
					position: "relative",
					minHeight: "20em",
				}}></div>
			{/* Background End */}

			<h1 className="mt-4 ms-3">What would you like to do?</h1>
			<h6 className="text-muted ms-3">Pick an option</h6>

			<center>
				<div className="d-flex flex-wrap justify-content-center">
					<div className="m-2">
						<Link
							to="/death-announcement"
							className="card m-2 p-5 mx-auto text-white"
							style={{ backgroundColor: "#2A0134" }}>
							<h3>Death Announcements</h3>
						</Link>
					</div>
					<div className="m-2">
						<Link
							to="/wedding-announcement"
							className="card m-2 p-5 mx-auto text-white"
							style={{ backgroundColor: "#FF00D8" }}>
							<h3>Wedding Announcements</h3>
						</Link>
					</div>
					<div className="m-2">
						<Link
							to="/graduation-announcement"
							className="card m-2 p-5 mx-auto text-white"
							style={{ backgroundColor: "#FF00D8" }}>
							<h3>Graduation Announcements</h3>
						</Link>
					</div>
					<div className="m-2">
						<Link
							to="/success-card-announcement"
							className="card m-2 p-5 mx-auto text-white"
							style={{ backgroundColor: "#FF00D8" }}>
							<h3>Success Card</h3>
						</Link>
					</div>
				</div>
			</center>
		</div>
	)
}

export default index
