import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"
import OptionsSVG from "@/svgs/OptionsSVG"
import LocationSVG from "@/svgs/LocationSVG"
import CalenderSVG from "@/svgs/CalenderSVG"

const Wedding = (props) => {
	const [hasLiked, setHasLiked] = useState(props.successCard.hasLiked)

	useEffect(() => {
		// Set new cart with data with auth
		setHasLiked(props.successCard.hasLiked)
	}, [props.successCard])

	// Function for liking Wedding
	const onLike = (successCardId) => {
		setHasLiked(!hasLiked)

		// Add like to database
		Axios.post(`/api/success-card-likes`, {
			successCardId: successCardId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Wedding s
				props.get("successCards", props.setWeddings)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<span
			className="my-2 mx-2 pt-0 px-0 pb-2 card bg-white"
			style={{ display: "inline-block" }}>
			<div className="death-media">
				<div className="death-thumbnail">
					<Link to={`/success-cards/show/${props.successCard.id}`}>
						<Img src={props.successCard.poster} />
					</Link>
				</div>
				{/* User info */}
				<div
					className="d-flex justify-content-start p-1"
					style={{ maxWidth: "220em" }}>
					{/* Avatar */}
					<div
						className="py-2"
						style={{ minWidth: "40px" }}>
						<Link to={`/profile/show/${props.successCard.userId}`}>
							<Img
								src={props.successCard.userAvatar}
								className="rounded-circle"
								width="30em"
								height="30em"
								alt="user"
								loading="lazy"
							/>
						</Link>
					</div>
					{/* Avatar End */}
					{/* User Name */}
					<div className="">
						<h6 className="death-user-name mt-1 pt-2 px-1">
							{props.successCard.userName}
						</h6>
					</div>
					{/* User Name End */}
				</div>
				{/* User info End */}
				<h3 className="death-name px-2 mb-0">{props.successCard.title}</h3>
				<p className="mb-1 px-2 text-start">{props.successCard.announcement}</p>
				<p className="my-1 px-2 text-start">
					<span className="bg-2 my-1 p-1 text-white">
						{props.successCard.tier}
					</span>
				</p>
				<div className="d-flex justify-content-between">
					{/* Wedding  likes */}
					<div
						className="p-2"
						style={{ cursor: "pointer" }}
						onClick={() => onLike(props.successCard.id)}>
						{hasLiked ? (
							<div>
								<span style={{ color: "#fb3958", fontSize: "1.2em" }}>
									<HeartFilledSVG />
								</span>
								<small
									className="ms-1"
									style={{ color: "#fb3958", fontWeight: "100" }}>
									{props.successCard.likes}
								</small>
							</div>
						) : (
							<div>
								<span style={{ color: "inherit", fontSize: "1.2em" }}>
									<HeartSVG />
								</span>
								<small
									className="ms-1"
									style={{ color: "inherit", fontWeight: "100" }}>
									{props.successCard.likes}
								</small>
							</div>
						)}
					</div>
					{/* <!-- Options dropup button --> */}
					<div className="btn-group dropup mt-1">
						<a
							href="#"
							className="p-2"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							<OptionsSVG />
						</a>
						<ul className="dropdown-menu dropdown-menu-right">
							{/* <!-- Dropdown menu links --> */}
							<a href="#">
								<li className="dropdown-item">Download</li>
							</a>
							<a href="#">
								<li className="dropdown-item">Mute</li>
							</a>
							<a href="#">
								<li className="dropdown-item">Report Issue</li>
							</a>
						</ul>
					</div>
					{/* <!-- Options dropup button End --> */}
				</div>
				{/* SocialMedia Input */}
				<div className="border-top border-light">
					<SocialMediaInput
						{...props}
						id={props.successCard.id}
						placeholder="Write Something"
						urlTo="/success-card-comments"
						editing={false}
					/>
				</div>
				{/* SocialMedia Input End */}
				{/* Wedding  likes End */}
			</div>
		</span>
	)
}

export default Wedding
