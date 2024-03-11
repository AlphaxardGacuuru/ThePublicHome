import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"
import CommentSVG from "@/svgs/CommentSVG"
import OptionsSVG from "@/svgs/OptionsSVG"
import LocationSVG from "@/svgs/LocationSVG"

const Wedding = (props) => {
	const [hasLiked, setHasLiked] = useState(props.wedding.hasLiked)

	useEffect(() => {
		// Set new cart with data with auth
		setHasLiked(props.wedding.hasLiked)
	}, [props.wedding])

	// Function for liking Wedding
	const onLike = (weddingId) => {
		setHasLiked(!hasLiked)

		// Add like to database
		Axios.post(`/api/wedding-likes`, {
			weddingId: weddingId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Weddings
				props.get("weddings", props.setWeddings)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<span
			className="my-2 mx-2 pt-0 px-0 pb-2 card bg-white"
			style={{ display: "inline-block" }}>
			<div className="death-media">
				<div className="death-thumbnail">
					<Link to={`/weddings/show/${props.wedding.id}`}>
						<Img src={props.wedding.poster} />
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
						<Link to={`/profile/show/${props.wedding.userId}`}>
							<Img
								src={props.wedding.userAvatar}
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
							{props.wedding.userName}
						</h6>
					</div>
					{/* User Name End */}
				</div>
				{/* User info End */}
				<h3 className="death-name px-2 mb-0">{props.wedding.title}</h3>
				<p className="mb-0 px-2 text-start">{props.wedding.announcement}</p>
				<p className="death-name mb-1 px-2 text-start">
					<LocationSVG /> {props.wedding.venue}
				</p>
				<p className="mb-0 px-2 text-start">
					<small
						className="bg-2 my-1 p-1 text-white text-uppercase"
						style={{ fontSize: "0.8em" }}>
						{props.wedding.tier}
					</small>
				</p>
				<div className="d-flex justify-content-between">
					{/* Wedding  likes */}
					<div
						className="p-2"
						style={{ cursor: "pointer" }}
						onClick={() => onLike(props.wedding.id)}>
						{hasLiked ? (
							<div>
								<span style={{ color: "#fb3958", fontSize: "1.2em" }}>
									<HeartFilledSVG />
								</span>
								<small
									className="ms-1"
									style={{ color: "#fb3958", fontWeight: "100" }}>
									{props.wedding.likes}
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
									{props.wedding.likes}
								</small>
							</div>
						)}
					</div>

					{/* Comments */}
					<div className="flex-grow-1 text-start p-2">
						<span style={{ fontSize: "1.2em" }}>
							<CommentSVG />
						</span>
						<small
							className="ms-1"
							style={{ color: "inherit", fontWeight: "100" }}>
							{props.wedding.comments}
						</small>
					</div>
					{/* Comments End */}

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
						id={props.wedding.id}
						placeholder="Write Something"
						urlTo="wedding-comments"
						stateToUpdate={() => props.get("weddings", props.setWeddings)}
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
