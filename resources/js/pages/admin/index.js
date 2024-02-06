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
		<div className="row">
			<div className="col-sm-1"></div>
			<div className="col-sm-10">
				<div className="d-flex flex-wrap justify-content-start">
					{/* Deaths */}
					<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
						<div className="d-flex justify-content-between align-items-center">
							<div className="px-4">
								<h4>Deaths</h4>
								<h6>{deaths.length}</h6>
							</div>
							<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
								<GraphUpSVG />
							</div>
						</div>
					</div>
					{/* Deaths End */}
					{/* Weddings */}
					<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
						<div className="d-flex justify-content-between align-items-center">
							<div className="px-4">
								<h4>Weddings</h4>
								<h6>{weddings.length}</h6>
							</div>
							<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
								<GraphUpSVG />
							</div>
						</div>
					</div>
					{/* Weddings End */}
					{/* Graduation */}
					<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
						<div className="d-flex justify-content-between align-items-center">
							<div className="px-4">
								<h4>Graduation</h4>
								<h6>{graduations.length}</h6>
							</div>
							<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
								<GraphUpSVG />
							</div>
						</div>
					</div>
					{/* Graduation End */}
					{/* Success Card */}
					<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
						<div className="d-flex justify-content-between align-items-center">
							<div className="px-4">
								<h4>Success Card</h4>
								<h6>{successCards.length}</h6>
							</div>
							<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
								<GraphUpSVG />
							</div>
						</div>
					</div>
					{/* Success Card End */}
					{/* Anniversaries */}
					<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
						<div className="d-flex justify-content-between align-items-center">
							<div className="px-4">
								<h4>Anniversaries</h4>
								<h6>{anniversaries.length}</h6>
							</div>
							<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
								<GraphUpSVG />
							</div>
						</div>
					</div>
					{/* Weddings End */}
					{/* Celebrations */}
					<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
						<div className="d-flex justify-content-between align-items-center">
							<div className="px-4">
								<h4>Celebrations</h4>
								<h6>{celebrations.length}</h6>
							</div>
							<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
								<GraphUpSVG />
							</div>
						</div>
					</div>
					{/* Celebrations End */}
					{/* Recaps */}
					<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card">
						<div className="d-flex justify-content-between align-items-center">
							<div className="px-4">
								<h4>Recaps</h4>
								<h6>{recaps.length}</h6>
							</div>
							<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
								<GraphUpSVG />
							</div>
						</div>
					</div>
					{/* Recaps End */}
				</div>

				<hr className="w-75 mx-auto" />

				{/* Death Announcements */}
				<h1 className="my-2 text-center">Death Announcements</h1>

				{/* Loading Death Announcement items */}
				{deaths.length < 1 && (
					<h5 className="text-muted text-center">No Death Announcements</h5>
				)}

				<div className="d-flex flex-wrap justify-content-center mb-2">
					<div className="table-responsive">
						<table className="table table-hover table-light">
							<thead>
								<tr>
									<th>#</th>
									<th>Locale</th>
									<th>Tier</th>
									<th>Name</th>
									<th>Sunrise</th>
									<th>Sunset</th>
									<th>Burial</th>
									<th>Has Recap</th>
									<th>Likes</th>
									<th>Date Created</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{deaths.map((death, key) => (
									<tr>
										<td>{key + 1}</td>
										<td className="text-capitalize">{death.locale}</td>
										<td className="text-capitalize">{death.tier}</td>
										<td className="text-capitalize">{death.name}</td>
										<td className="text-capitalize">{death.sunriseFormated}</td>
										<td className="text-capitalize">{death.sunsetFormated}</td>
										<td className="text-capitalize">
											{death.burialDateFormated}
										</td>
										<td className="text-capitalize">
											{death.recap ? "Yes" : "No"}
										</td>
										<td className="text-capitalize">{death.likes}</td>
										<td className="text-capitalize">{death.createdAt}</td>
										<td>
											<MyLink
												linkTo={`/deaths/show/${death.id}`}
												className="btn-sm"
												text="view"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Death Announcements End */}

				<hr className="w-75 mx-auto" />

				{/* Wedding Announcements */}
				<h1 className="my-2 text-center">Wedding Announcements</h1>

				{/* Loading Wedding Announcement items */}
				{weddings.length < 1 && (
					<h5 className="text-muted text-center">No Wedding Announcements</h5>
				)}

				<div className="d-flex flex-wrap justify-content-center mb-2">
					<div className="table-responsive">
						<table className="table table-hover table-light">
							<thead>
								<tr>
									<th></th>
									<th>Locale</th>
									<th>Tier</th>
									<th>Title</th>
									<th>Venue</th>
									<th>Date</th>
									<th>Has Recap</th>
									<th>Likes</th>
									<th>Date Created</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{weddings.map((wedding, key) => (
									<tr>
										<td>{key + 1}</td>
										<td className="text-capitalize">{wedding.locale}</td>
										<td className="text-capitalize">{wedding.tier}</td>
										<td className="text-capitalize">{wedding.title}</td>
										<td className="text-capitalize">{wedding.venue}</td>
										<td className="text-capitalize">
											{wedding.weddingDateFormated}
										</td>
										<td className="text-capitalize">
											{wedding.recap ? "Yes" : "No"}
										</td>
										<td className="text-capitalize">{wedding.likes}</td>
										<td className="text-capitalize">{wedding.createdAt}</td>
										<td>
											<MyLink
												linkTo={`/weddings/show/${wedding.id}`}
												className="btn-sm"
												text="view"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Wedding Announcements End */}

				<hr className="w-75 mx-auto" />

				{/* Graduation Announcements */}
				<h1 className="my-2 text-center">Graduation Announcements</h1>

				{/* Loading Graduation Announcement items */}
				{graduations.length < 1 && (
					<h5 className="text-muted text-center">
						No Graduation Announcements
					</h5>
				)}

				<div className="d-flex flex-wrap justify-content-center mb-2">
					<div className="table-responsive">
						<table className="table table-hover table-light">
							<thead>
								<tr>
									<th></th>
									<th>Locale</th>
									<th>Tier</th>
									<th>Title</th>
									<th>Venue</th>
									<th>Date</th>
									<th>Has Recap</th>
									<th>Likes</th>
									<th>Date Created</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{graduations.map((graduation, key) => (
									<tr>
										<td>{key + 1}</td>
										<td className="text-capitalize">{graduation.locale}</td>
										<td className="text-capitalize">{graduation.tier}</td>
										<td className="text-capitalize">{graduation.title}</td>
										<td className="text-capitalize">{graduation.venue}</td>
										<td className="text-capitalize">
											{graduation.graduationDateFormated}
										</td>
										<td className="text-capitalize">
											{graduation.recap ? "Yes" : "No"}
										</td>
										<td className="text-capitalize">{graduation.likes}</td>
										<td className="text-capitalize">{graduation.createdAt}</td>
										<td>
											<MyLink
												linkTo={`/graduations/show/${graduation.id}`}
												className="btn-sm"
												text="view"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Graduation Announcements End */}

				<hr className="w-75 mx-auto" />

				{/* Success Card Announcements */}
				<h1 className="my-2 text-center">Success Card Announcements</h1>

				{/* Loading Success Card Announcement items */}
				{successCards.length < 1 && (
					<h5 className="text-muted text-center">
						No Success Card Announcements
					</h5>
				)}

				<div className="d-flex flex-wrap justify-content-center mb-2">
					<div className="table-responsive">
						<table className="table table-hover table-light">
							<thead>
								<tr>
									<th></th>
									<th>Locale</th>
									<th>Tier</th>
									<th>Title</th>
									<th>Has Recap</th>
									<th>Likes</th>
									<th>Date Created</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{successCards.map((successCard, key) => (
									<tr>
										<td>{key + 1}</td>
										<td className="text-capitalize">{successCard.locale}</td>
										<td className="text-capitalize">{successCard.tier}</td>
										<td className="text-capitalize">{successCard.title}</td>
										<td className="text-capitalize">
											{successCard.recap ? "Yes" : "No"}
										</td>
										<td className="text-capitalize">{successCard.likes}</td>
										<td className="text-capitalize">{successCard.createdAt}</td>
										<td>
											<MyLink
												linkTo={`/success-cards/show/${successCard.id}`}
												className="btn-sm"
												text="view"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Success Card Announcements End */}

				<hr className="w-75 mx-auto" />

				{/* Anniversary Announcements */}
				<h1 className="my-2 text-center">Anniversary Announcements</h1>

				{/* Loading Anniversary Announcement items */}
				{anniversaries.length < 1 && (
					<h5 className="text-muted text-center">
						No Anniversary Announcements
					</h5>
				)}

				<div className="d-flex flex-wrap justify-content-center mb-2">
					<div className="table-responsive">
						<table className="table table-hover table-light">
							<thead>
								<tr>
									<th></th>
									<th>Locale</th>
									<th>Tier</th>
									<th>Title</th>
									<th>Venue</th>
									<th>Date</th>
									<th>Has Recap</th>
									<th>Likes</th>
									<th>Date Created</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{anniversaries.map((anniversary, key) => (
									<tr>
										<td>{key + 1}</td>
										<td className="text-capitalize">{anniversary.locale}</td>
										<td className="text-capitalize">{anniversary.tier}</td>
										<td className="text-capitalize">{anniversary.title}</td>
										<td className="text-capitalize">{anniversary.venue}</td>
										<td className="text-capitalize">
											{anniversary.anniversaryDateFormated}
										</td>
										<td className="text-capitalize">
											{anniversary.recap ? "Yes" : "No"}
										</td>
										<td className="text-capitalize">{anniversary.likes}</td>
										<td className="text-capitalize">{anniversary.createdAt}</td>
										<td>
											<MyLink
												linkTo={`/anniversaries/show/${anniversary.id}`}
												className="btn-sm"
												text="view"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Anniversary Announcements End */}

				<hr className="w-75 mx-auto" />

				{/* Celebration Announcements */}
				<h1 className="my-2 text-center">Celebration Announcements</h1>

				{/* Loading Celebration Announcement items */}
				{celebrations.length < 1 && (
					<h5 className="text-muted text-center">
						No Celebration Announcements
					</h5>
				)}

				<div className="d-flex flex-wrap justify-content-center mb-2">
					<div className="table-responsive">
						<table className="table table-hover table-light">
							<thead>
								<tr>
									<th></th>
									<th>Locale</th>
									<th>Tier</th>
									<th>Title</th>
									<th>Venue</th>
									<th>Date</th>
									<th>Has Recap</th>
									<th>Likes</th>
									<th>Date Created</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{celebrations.map((celebration, key) => (
									<tr>
										<td>{key + 1}</td>
										<td className="text-capitalize">{celebration.locale}</td>
										<td className="text-capitalize">{celebration.tier}</td>
										<td className="text-capitalize">{celebration.title}</td>
										<td className="text-capitalize">{celebration.venue}</td>
										<td className="text-capitalize">
											{celebration.celebrationDateFormated}
										</td>
										<td className="text-capitalize">
											{celebration.recap ? "Yes" : "No"}
										</td>
										<td className="text-capitalize">{celebration.likes}</td>
										<td className="text-capitalize">{celebration.createdAt}</td>
										<td>
											<MyLink
												linkTo={`/celebrations/show/${celebration.id}`}
												className="btn-sm"
												text="view"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Celebration Announcements End */}
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

export default index
