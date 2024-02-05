import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Recap from "@/components/Recap/Recap"
import LoadingRecap from "@/components/Recap/LoadingRecap"

import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	const [recaps, setRecaps] = useState([])

	const [locale, setLocale] = useState("")
	const [tier, setTier] = useState("")
	const [loader, setLoader] = useState()

	useEffect(() => {
		props.get("recaps", setRecaps)
	}, [])

	/*
	 * Delete Recap
	 */
	const onDelete = (id, model) => {
		/*
		 * Check Model
		 */
		const url = () => {
			switch (model) {
				case model == "Death":
					return "deaths"
				case model == "Weddings":
					return "Weddings"
				case model == "Graduations":
					return "Graduations"
				case model == "SuccessCards":
					return "SuccessCards"
				case model == "Anniversary":
					return "Anniversary"

				default:
					return "celebrations"
			}
		}

		Axios.put(`/api/${url()}/${id}`, { recap: "remove" })
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
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
				<center>
					<h1>Recaps</h1>

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

					{/* Recaps */}
					<div className="d-flex flex-wrap justify-content-center my-2">
						{/* Loading Recap items */}
						{dummyArray
							.filter(() => recaps.length < 1)
							.map((item, key) => (
								<LoadingRecap key={key} />
							))}

						{/* Real Recap items */}
						{recaps
							.filter((recap) => recap.recap)
							.filter((recap) => (locale ? recap.locale == locale : true))
							.filter((recap) => (tier ? recap.tier == tier : true))
							.map((recap, key) => (
								<Recap
									{...props}
									key={key}
									recap={recap}
									onDelete={onDelete}
								/>
							))}
					</div>
					{/* Recaps End */}
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
