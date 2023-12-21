import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	const [location, setLocation] = useState("home")

	useEffect(() => {
		props.get("deaths", props.setDeaths)
		props.get("weddings", props.setWeddings)
		props.get("graduations", props.setGraduations)
		props.get("success-cards", props.setSuccessCards)
		props.get("anniversaries", props.setAnniversaries)
		props.get("celebrations", props.setCelebrations)
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
					backgroundImage: "url(storage/death-posters/1.jpg)",
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
							to="/deaths"
							className="card m-2 p-5 mx-auto">
							<h3>Death Announcements</h3>
						</Link>
					</div>
					<div className="m-2">
						<Link
							to="/weddings"
							className="card m-2 p-5 mx-auto">
							<h3>Wedding Announcements</h3>
						</Link>
					</div>
					<div className="m-2">
						<Link
							to="/graduations"
							className="card m-2 p-5 mx-auto">
							<h3>Graduation Announcements</h3>
						</Link>
					</div>
					<div className="m-2">
						<Link
							to="/success-cards"
							className="card m-2 p-5 mx-auto">
							<h3>Success Card Announcements</h3>
						</Link>
					</div>
					<div className="m-2">
						<Link
							to="/anniversaries"
							className="card m-2 p-5 mx-auto">
							<h3>Anniversary Announcements</h3>
						</Link>
					</div>
					<div className="m-2">
						<Link
							to="/celebrations"
							className="card m-2 p-5 mx-auto">
							<h3>Celebration Announcements</h3>
						</Link>
					</div>
				</div>
			</center>
		</div>
	)
}

export default index
