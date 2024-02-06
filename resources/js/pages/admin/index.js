import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"

import GraphUpSVG from "@/svgs/GraphUpSVG"

const index = (props) => {
	const [deaths, setDeaths] = useState([])
	const [weddings, setWeddings] = useState([])
	const [graduations, setGraduations] = useState([])
	const [successCards, setSuccesCards] = useState([])
	const [anniversaries, setAnniversaries] = useState([])
	const [celebrations, setCelebrations] = useState([])
	const [recaps, setRecaps] = useState([])

	useEffect(() => {
		props.get("deaths", setDeaths)
		props.get(`weddings`, setWeddings)
		props.get(`graduations`, setGraduations)
		props.get(`success-cards`, setSuccesCards)
		props.get(`anniversaries`, setAnniversaries)
		props.get(`celebrations`, setCelebrations)
		props.get(`recaps`, setRecaps)
	}, [])

	return (
		<div className="d-flex flex-wrap justify-content-start">
			{/* Deaths */}
			<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
				<div className="d-flex justify-content-between align-items-center">
					<div className="px-4">
						<h1>Deaths</h1>
						<h3>{deaths.length}</h3>
					</div>
					<div className="px-4 fs-1 bg-primary-subtle text-primary rounded">
						<GraphUpSVG />
					</div>
				</div>
			</div>
			{/* Deaths End */}
			{/* Weddings */}
			<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
				<div className="d-flex justify-content-between align-items-center">
					<div className="px-4">
						<h1>Weddings</h1>
						<h3>{weddings.length}</h3>
					</div>
					<div className="px-4 fs-1 bg-primary-subtle text-primary rounded">
						<GraphUpSVG />
					</div>
				</div>
			</div>
			{/* Weddings End */}
			{/* Graduation */}
			<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
				<div className="d-flex justify-content-between align-items-center">
					<div className="px-4">
						<h1>Graduation</h1>
						<h3>{graduations.length}</h3>
					</div>
					<div className="px-4 fs-1 bg-primary-subtle text-primary rounded">
						<GraphUpSVG />
					</div>
				</div>
			</div>
			{/* Graduation End */}
			{/* Success Card */}
			<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
				<div className="d-flex justify-content-between align-items-center">
					<div className="px-4">
						<h1>Success Card</h1>
						<h3>{successCards.length}</h3>
					</div>
					<div className="px-4 fs-1 bg-primary-subtle text-primary rounded">
						<GraphUpSVG />
					</div>
				</div>
			</div>
			{/* Success Card End */}
			{/* Anniversaries */}
			<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
				<div className="d-flex justify-content-between align-items-center">
					<div className="px-4">
						<h1>Anniversaries</h1>
						<h3>{anniversaries.length}</h3>
					</div>
					<div className="px-4 fs-1 bg-primary-subtle text-primary rounded">
						<GraphUpSVG />
					</div>
				</div>
			</div>
			{/* Weddings End */}
			{/* Celebrations */}
			<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
				<div className="d-flex justify-content-between align-items-center">
					<div className="px-4">
						<h1>Celebrations</h1>
						<h3>{celebrations.length}</h3>
					</div>
					<div className="px-4 fs-1 bg-primary-subtle text-primary rounded">
						<GraphUpSVG />
					</div>
				</div>
			</div>
			{/* Celebrations End */}
			{/* Recaps */}
			<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
				<div className="d-flex justify-content-between align-items-center">
					<div className="px-4">
						<h1>Recaps</h1>
						<h3>{recaps.length}</h3>
					</div>
					<div className="px-4 fs-1 bg-primary-subtle text-primary rounded">
						<GraphUpSVG />
					</div>
				</div>
			</div>
			{/* Recaps End */}
		</div>
	)
}

export default index
