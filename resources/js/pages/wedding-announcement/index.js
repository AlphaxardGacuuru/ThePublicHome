import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import WeddingAnnouncement from "@/components/WeddingAnnouncement/WeddingAnnouncement"
import LoadingWeddingAnnouncement from "@/components/WeddingAnnouncement/LoadingWeddingAnnouncement"

import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	const [query, setQuery] = useState("")
	const [location, setLocation] = useState("")
	const [loader, setLoader] = useState()

	useEffect(() => {
		props.get("wedding-announcements", props.setWeddingAnnouncements)
	}, [])

	const onSubmit = (e) => {
		e.preventDefault()
	}

	const active = (current) => {
		if (location == current) {
			return "bg-primary-subtle"
		}
	}

	const dummyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	return (
		<div className="row p-0">
			<div className="col-sm-1"></div>
			<div className="col-sm-10 p-0">
				{/* Chat button */}

				<Link
					to={
						props.auth?.membershipTypes?.includes("wedding")
							? "/wedding-announcement/create"
							: "/wedding-announcement/create"
							// : "/profile/membership"
					}
					id="chatFloatBtn">
					<PlusSVG />
				</Link>

				<center>
					<h1>Wedding and Funeral Announcements</h1>

					<form
						className="mt-4 mx-auto w-75"
						onSubmit={onSubmit}>
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Search Wedding Announcements by Name"
								aria-label="Search Wedding Announcements by Name"
								aria-describedby="button-addon2"
								required={true}
								onChange={(e) => setQuery(e.target.value)}
							/>
							<button
								id="button-addon2"
								type="submit"
								className="btn btn-outline-primary"
								disabled={loader}>
								Search
								{loader && (
									<div
										className="spinner-border my-auto"
										style={{ color: "inherit" }}></div>
								)}
							</button>
						</div>
					</form>

					<div className="d-flex justify-content-center flex-wrap">
						<div
							className={`${active("")} rounded-pill mx-2 px-5 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocation("")}>
							All
						</div>
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

					{/* Wedding Announcements */}
					<div className="d-flex flex-wrap justify-content-center">
						{/* Loading Wedding Announcement items */}
						{dummyArray
							.filter(() => props.weddingAnnouncements.length < 1)
							.map((item, key) => (
								<LoadingWeddingAnnouncement key={key} />
							))}

						{/* Real Wedding Announcement items */}
						{props.weddingAnnouncements
							.filter((wedding) => wedding.name.toLowerCase().match(query))
							.filter((wedding) => (location ? wedding.location == location : true))
							.map((weddingAnnouncement, key) => (
								<WeddingAnnouncement
									{...props}
									key={key}
									weddingAnnouncement={weddingAnnouncement}
								/>
							))}
					</div>
					{/* Wedding Announcements End */}
				</center>
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

export default index
