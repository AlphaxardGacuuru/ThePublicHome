import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"

const membership = (props) => {
	const [groupedMemberships, setGroupedMemberships] = useState([])
	const [loading, setLoading] = useState("")

	useEffect(() => {
		Axios.get("api/memberships").then((res) => {
			// Format data
			var data = [
				res.data.data.death,
				res.data.data.wedding,
				res.data.data.graduation,
				res.data.data.success_card,
				res.data.data.anniversary,
				res.data.data.celebration,
			]
			setGroupedMemberships(data)
		})
	}, [])

	const onMembership = (membershipId) => {
		// Show Loader
		setLoading(membershipId)

		Axios.post("api/user-memberships", { membershipId: membershipId })
			.then((res) => {
				// Remove loader
				setLoading()
				// Set Messages
				props.setMessages([res.data.message])
				// Update Auth
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => {
				// Remove loader
				setLoading()
				// Set Errors
				props.getErrors(err)
			})
	}

	return (
		<React.Fragment>
			<div
				className="container-fluid m-0 p-0"
				style={{ height: "100vh" }}>
				{/* Background Image */}
				<div
					className="d-flex justify-content-center flex-wrap"
					style={{
						height: "50vh",
						backgroundImage: 'url("/storage/img/our_projects-1.jpg")',
						backgroundSize: "cover",
						backgroundPosition: "top",
					}}>
					{/* Cards */}
					{groupedMemberships.map((memberships, key) => (
						<div
							key={key}
							className="card bg-2 border-0 mb-3 mt-5"
							style={{
								maxWidth: "20rem",
								minWidth: "19rem",
								backgroundImage:
									"linear-gradient(to bottom, rgb(186, 173, 123), rgb(255, 255, 255))",
							}}>
							<div className="card-header text-white border-0 py-4">
								<h5 className="card-title text-center">
									{memberships[0].name.split("_").map((name, key) => (
										<span
											key={key}
											className="me-1 text-capitalize">
											{name}
										</span>
									))}
								</h5>
							</div>
							<div className="card-body pt-4 pb-5">
								{memberships.map((membership, key) => (
									<div
										key={key}
										className="card-text mb-2">
										<div className="d-flex justify-content-between">
											<h4 className="text-capitalize">{membership.tier}</h4>
											{props.auth.membershipName ? (
												<React.Fragment>
													{props.auth.membershipName.match(
														memberships[0].name
													) &&
													props.auth.membershipTier.match(membership.tier) ? (
														<Btn
															btnText="current"
															btnClass="btn-sm px-4"
														/>
													) : (
														""
													)}
												</React.Fragment>
											) : (
												<Btn
													btnText="get"
													btnClass="btn-sm px-4"
													onClick={() => onMembership(membership.id)}
													loading={loading == membership.id}
												/>
											)}
										</div>
										<div>
											Announcement:{" "}
											{membership.features.announcement == 1000000
												? "Unlimited"
												: membership.features.announcement}{" "}
											words
										</div>
										<div>
											Photos:{" "}
											{membership.features.photos == 1000000
												? "Unlimited"
												: membership.features.photos}{" "}
											photos
										</div>
										{membership.features.videos ? (
											<div>
												Videos:{" "}
												{membership.features.videos == 1000000
													? "Unlimited"
													: membership.features.videos}{" "}
												MBs
											</div>
										) : (
											""
										)}
										<div>
											Eulogy:{" "}
											{membership.features.eulogy == 1000000
												? "Unlimited"
												: membership.features.eulogy}{" "}
											pages
										</div>
										<div>Price: ${membership.price}</div>
									</div>
								))}
							</div>
							<div className="card-footer text-center border-0 py-4"></div>
						</div>
					))}
				</div>
			</div>

			{/* Membership Info */}
			<div className="row mt-5">
				<div className="col-12">
					<h2>Membership Information</h2>
					{/* Add your membership information content here */}
				</div>
			</div>
		</React.Fragment>
	)
}

export default membership
