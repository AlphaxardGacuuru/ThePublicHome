import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Death from "@/components/Death/Death"
import LoadingDeath from "@/components/Death/LoadingDeath"

import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	const [query, setQuery] = useState("")
	const [locale, setLocale] = useState("")
	const [loader, setLoader] = useState()

	useEffect(() => {
		props.get("deaths", props.setDeaths)
	}, [])

	const onSubmit = (e) => {
		e.preventDefault()
	}

	const active = (current) => {
		if (locale == current) {
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
						props.auth?.membershipTypes?.includes("death")
							? "/deaths/create"
							: "/deaths/create"
							// : "/profile/membership"
					}
					id="chatFloatBtn">
					<PlusSVG />
				</Link>

				<center>
					<h1>Death and Funeral Announcements</h1>

					<form
						className="mt-4 mx-auto w-75"
						onSubmit={onSubmit}>
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Search Death Announcements by Name"
								aria-label="Search Death Announcements by Name"
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
							onClick={() => setLocale("")}>
							All
						</div>
						<div
							className={`${active("home")} rounded-pill mx-2 px-5 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("home")}>
							Home
						</div>
						<div
							className={`${active(
								"international"
							)} rounded-pill mx-2 px-5 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("international")}>
							International
						</div>
					</div>

					<br />

					{/* Death Announcements */}
					<div className="d-flex flex-wrap justify-content-center">
						{/* Loading Death Announcement items */}
						{dummyArray
							.filter(() => props.deaths.length < 1)
							.map((item, key) => (
								<LoadingDeath key={key} />
							))}

						{/* Real Death Announcement items */}
						{props.deaths
							.filter((death) => death.name.toLowerCase().match(query))
							.filter((death) => (locale ? death.locale == locale : true))
							.map((death, key) => (
								<Death
									{...props}
									key={key}
									death={death}
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