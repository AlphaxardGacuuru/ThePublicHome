import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"
import CommentSVG from "@/svgs/CommentSVG"
import OptionsSVG from "@/svgs/OptionsSVG"

const Media = (props) => {
	const [hasLiked, setHasLiked] = useState(props.model.hasLiked)

	useEffect(() => {
		// Set new cart with data with auth
		setHasLiked(props.model.hasLiked)
	}, [props.model])

	// Function for liking Model
	const onLike = (modelId) => {
		setHasLiked(!hasLiked)

		// Add like to database
		Axios.post(`api/${props.modelToGet}-likes`, {
			id: modelId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Model
				props.get(
					`${
						props.modelToGet == "anniversary"
							? props.modelToGet.replace("y", "ie")
							: props.modelToGet
					}s`,
					props.setModel
				)
			})
			.catch((err) => props.getErrors(err))
	}

	const formatedModel = () => {
		return props.modelToGet == "anniversary"
			? props.modelToGet.replace("y", "ie")
			: props.modelToGet
	}

	return (
		<span
			id={`media${props.index}`}
			className="my-2 mx-2 pt-0 px-0 pb-2 card bg-white"
			style={{ display: "inline-block" }}>
			<div className="model-media">
				<div className="model-thumbnail">
					<Link to={`/${formatedModel()}s/show/${props.model.id}`}>
						<Img src={props.model.poster} />
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
						<Link to={`/profile/show/${props.model.userId}`}>
							<Img
								src={props.model.userAvatar}
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
						<h6 className="model-user-name mt-1 pt-2 px-1">
							{props.model.userName}
						</h6>
					</div>
					{/* User Name End */}
				</div>
				{/* User info End */}
				<h3 className="model-name px-2 mb-0">
					{props.model.name ?? props.model.title}
				</h3>
				<p className="mb-0 px-2 text-start">{props.model.announcement}</p>
				<p className="mb-0 px-2 text-start">
					<small
						className="bg-2 my-1 p-1 text-white text-uppercase"
						style={{ fontSize: "0.8em" }}>
						{props.model.tier}
					</small>
				</p>
				<div className="d-flex justify-content-start">
					{/* Model likes */}
					<div
						className="p-2"
						style={{ cursor: "pointer" }}
						onClick={() => onLike(props.model.id)}>
						{hasLiked ? (
							<div>
								<span style={{ color: "#fb3958", fontSize: "1.2em" }}>
									<HeartFilledSVG />
								</span>
								<small
									className="ms-1"
									style={{ color: "#fb3958", fontWeight: "100" }}>
									{props.model.likes}
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
									{props.model.likes}
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
							{props.model.comments}
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
						id={props.model.id}
						placeholder="Write Condolences"
						urlTo={`${props.modelToGet}-comments`}
						stateToUpdate={() =>
							props.get(`${formatedModel()}s`, props.setModel)
						}
						editing={false}
					/>
				</div>
				{/* SocialMedia Input End */}
				{/* Model  likes End */}
			</div>
		</span>
	)
}

export default Media
