import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Graduation from "@/components/Graduation/Graduation"
import LoadingGraduation from "@/components/Graduation/LoadingGraduation"

import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	const [query, setQuery] = useState("")
	const [loader, setLoader] = useState()

	useEffect(() => {
		props.get("graduations", props.setGraduations)
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
						props.auth?.membershipTypes?.includes("graduation")
							? "/graduations/create"
							: "/graduations/create"
							// : "/profile/membership"
					}
					id="chatFloatBtn">
					<PlusSVG />
				</Link>

				<center>
					<h1>Graduation Announcements</h1>

					<form
						className="mt-4 mx-auto w-75"
						onSubmit={onSubmit}>
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Search Graduation Announcements by Name"
								aria-label="Search Graduation Announcements by Name"
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

					<br />

					{/* Graduation Announcements */}
					<div className="d-flex flex-wrap justify-content-center">
						{/* Loading Graduation Announcement items */}
						{dummyArray
							.filter(() => props.graduations.length < 1)
							.map((item, key) => (
								<LoadingGraduation key={key} />
							))}

						{/* Real Graduation Announcement items */}
						{props.graduations
							.filter((graduation) => graduation.title.toLowerCase().match(query))
							.map((graduation, key) => (
								<Graduation
									{...props}
									key={key}
									graduation={graduation}
								/>
							))}
					</div>
					{/* Graduation Announcements End */}
				</center>
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

export default index
