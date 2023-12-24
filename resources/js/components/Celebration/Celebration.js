import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"
import OptionsSVG from "@/svgs/OptionsSVG"

const Celebration = (props) => {
	const [hasLiked, setHasLiked] = useState(props.celebration.hasLiked)

	useEffect(() => {
		// Set new cart with data with auth
		setHasLiked(props.celebration.hasLiked)
	}, [props.celebration])

	// Function for liking Celebration
	const onLike = (celebrationId) => {
		setHasLiked(!hasLiked)

		// Add like to database
		Axios.post(`/api/celebration-likes`, {
			celebrationId: celebrationId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Celebrations
				props.get("celebrations", props.setCelebrations)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<span
			className="my-2 mx-2 pt-0 px-0 pb-2 card bg-white"
			style={{ display: "inline-block" }}>
			<div className="death-media">
				<div className="death-thumbnail">
					<Link to={`/celebrations/show/${props.celebration.id}`}>
						<Img src={props.celebration.poster} />
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
						<Link to={`/profile/show/${props.celebration.userId}`}>
							<Img
								src={props.celebration.userAvatar}
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
							{props.celebration.userName}
						</h6>
					</div>
					{/* User Name End */}
				</div>
				{/* User info End */}
				<h3 className="death-name px-2 mb-0">{props.celebration.title}</h3>
				<p className="mb-0 px-2 text-start">{props.celebration.announcement}</p>
				<p className="mb-0 px-2 text-start">
					<small
						className="bg-2 my-1 p-1 text-white text-uppercase"
						style={{ fontSize: "0.8em" }}>
						{props.celebration.tier}
					</small>
				</p>
				<div className="d-flex justify-content-between">
					{/* Celebration  likes */}
					<div
						className="p-2"
						style={{ cursor: "pointer" }}
						onClick={() => onLike(props.celebration.id)}>
						{hasLiked ? (
							<div>
								<span style={{ color: "#fb3958", fontSize: "1.2em" }}>
									<HeartFilledSVG />
								</span>
								<small
									className="ms-1"
									style={{ color: "#fb3958", fontWeight: "100" }}>
									{props.celebration.likes}
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
									{props.celebration.likes}
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
						id={props.celebration.id}
						placeholder="Write Something"
						urlTo="/celebration-comments"
						editing={false}
					/>
				</div>
				{/* SocialMedia Input End */}
				{/* Celebration  likes End */}
			</div>
		</span>
	)
}

export default Celebration
