import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Anniversary from "@/components/Anniversary/Anniversary"
import LoadingAnniversary from "@/components/Anniversary/LoadingAnniversary"

import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	const [query, setQuery] = useState("")
	const [locale, setLocale] = useState("")
	const [tier, setTier] = useState("")
	const [loader, setLoader] = useState()

	useEffect(() => {
		props.get("anniversaries", props.setAnniversaries)
	}, [])

	const onSubmit = (e) => {
		e.preventDefault()
	}

	const activeLocale = (current) => {
		if (locale == current) {
			return "active"
		}
	}

	const activeTier = (current) => {
		if (tier == current) {
			return "active"
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
						props.auth?.membershipName == "anniversary"
							? "/anniversaries/create"
							: "/profile/membership"
					}
					id="chatFloatBtn">
					<PlusSVG />
				</Link>

				<center>
					<h1>Anniversary Announcements</h1>

					<form
						className="mt-4 mx-auto w-75"
						onSubmit={onSubmit}>
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control rounded-0"
								placeholder="Search Anniversary Announcements by Name"
								aria-label="Search Anniversary Announcements by Name"
								aria-describedby="button-addon2"
								required={true}
								onChange={(e) => setQuery(e.target.value)}
							/>
							<button
								id="button-addon2"
								type="submit"
								className="btn btn-outline-primary rounded-0"
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

					{/* Locales */}
					<div className="d-flex justify-content-center flex-wrap mb-2">
						<div
							className={`${activeLocale("")} px-4 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("")}>
							All
						</div>
						<div
							className={`${activeLocale("home")} px-4 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("home")}>
							Home
						</div>
						<div
							className={`${activeLocale("international")} px-4 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("international")}>
							International
						</div>
					</div>
					{/* Locales End */}

					{/* Tiers */}
					<div className="d-none d-lg-block">
						<div className="d-flex justify-content-center flex-wrap">
							<div
								className={`${activeTier("")} px-3 py-2`}
								style={{ cursor: "pointer" }}
								onClick={() => setTier("")}>
								All
							</div>
							<div
								className={`${activeTier("standard")} px-3 py-2`}
								style={{ cursor: "pointer" }}
								onClick={() => setTier("standard")}>
								Standard
							</div>
							<div
								className={`${activeTier("vip")} px-3 py-2`}
								style={{ cursor: "pointer" }}
								onClick={() => setTier("vip")}>
								VIP
							</div>
							<div
								className={`${activeTier("executive")} px-3 py-2`}
								style={{ cursor: "pointer" }}
								onClick={() => setTier("executive")}>
								Executive
							</div>
						</div>
					</div>
					{/* Tiers End */}

					{/* Anniversary Announcements */}
					<div className="d-flex flex-wrap justify-content-center mb-2">
						{/* Loading Anniversary Announcement items */}
						{dummyArray
							.filter(() => props.anniversaries.length < 1)
							.map((item, key) => (
								<LoadingAnniversary key={key} />
							))}

						{/* Real Anniversary Announcement items */}
						{props.anniversaries
							.filter((anniversary) => anniversary.title.toLowerCase().match(query))
							.filter((anniversary) => (locale ? anniversary.locale == locale : true))
							.filter((anniversary) => (tier ? anniversary.tier == tier : true))
							.map((anniversary, key) => (
								<Anniversary
									{...props}
									key={key}
									anniversary={anniversary}
								/>
							))}
					</div>
					{/* Anniversary Announcements End */}
				</center>
			</div>
			<div className="col-sm-1"></div>
			{/* Bottom Filter */}
			<div className="d-sm-none">
				<div className="fixed-bottom bg text-white p-1 d-flex justify-content-center flex-wrap">
					<div
						className={`${activeTier("")} px-3 py-2`}
						style={{ cursor: "pointer" }}
						onClick={() => setTier("")}>
						All
					</div>
					<div
						className={`${activeTier("standard")} px-3 py-2`}
						style={{ cursor: "pointer" }}
						onClick={() => setTier("standard")}>
						Standard
					</div>
					<div
						className={`${activeTier("vip")} px-3 py-2`}
						style={{ cursor: "pointer" }}
						onClick={() => setTier("vip")}>
						VIP
					</div>
					<div
						className={`${activeTier("executive")} px-3 py-2`}
						style={{ cursor: "pointer" }}
						onClick={() => setTier("executive")}>
						Executive
					</div>
				</div>
			</div>
			{/* Bottom Filter End */}
		</div>
	)
}

export default index
