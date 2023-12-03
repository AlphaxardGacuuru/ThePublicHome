import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import SuccessCard from "@/components/SuccessCard/SuccessCard"
import LoadingSuccessCard from "@/components/SuccessCard/LoadingSuccessCard"

import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	const [query, setQuery] = useState("")
	const [loader, setLoader] = useState()

	useEffect(() => {
		props.get("success-cards", props.setSuccessCards)
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
						props.auth?.membershipTypes?.includes("success_card")
							? "/success-card/create"
							: "/success-card/create"
							// : "/profile/membership"
					}
					id="chatFloatBtn">
					<PlusSVG />
				</Link>

				<center>
					<h1>Success Card Announcements</h1>

					<form
						className="mt-4 mx-auto w-75"
						onSubmit={onSubmit}>
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Search Success Card Announcements by Name"
								aria-label="Search Success Card Announcements by Name"
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

					{/* Success Card Announcements */}
					<div className="d-flex flex-wrap justify-content-center">
						{/* Loading Success Card Announcement items */}
						{dummyArray
							.filter(() => props.successCards.length < 1)
							.map((item, key) => (
								<LoadingSuccessCard key={key} />
							))}

						{/* Real Success Card Announcement items */}
						{props.successCards
							.filter((successCard) => successCard.title.toLowerCase().match(query))
							.map((successCard, key) => (
								<SuccessCard
									{...props}
									key={key}
									successCard={successCard}
								/>
							))}
					</div>
					{/* Success Card Announcements End */}
				</center>
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

export default index
