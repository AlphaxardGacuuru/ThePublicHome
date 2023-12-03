import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"
import OptionsSVG from "@/svgs/OptionsSVG"

const Death = (props) => {
	const [hasLiked, setHasLiked] = useState(props.death.hasLiked)

	useEffect(() => {
		// Set new cart with data with auth
		setHasLiked(props.death.hasLiked)
	}, [props.death])

	// Function for liking Death 
	const onLike = (deathId) => {
		setHasLiked(!hasLiked)

		// Add like to database
		Axios.post(`/api/death-likes`, {
			deathId: deathId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Death s
				props.get("deaths", props.setDeaths)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<span
			className="my-2 mx-2 pt-0 px-0 pb-2 card bg-white"
			style={{ display: "inline-block" }}>
			<div className="death-media">
				<div className="death-thumbnail">
					<Link to={`/deaths/show/${props.death.id}`}>
						<Img src={props.death.poster} />
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
						<Link to={`/profile/show/${props.death.userId}`}>
							<Img
								src={props.death.userAvatar}
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
							{props.death.userName}
						</h6>
					</div>
					{/* User Name End */}
				</div>
				{/* User info End */}
				<h3 className="death-name px-2 mb-0">
					{props.death.name}
				</h3>
				<p className="px-2 text-start">{props.death.announcement}</p>
				<div className="d-flex justify-content-between">
					{/* Death  likes */}
					<div
						className="p-2"
						style={{ cursor: "pointer" }}
						onClick={() => onLike(props.death.id)}>
						{hasLiked ? (
							<div>
								<span style={{ color: "#fb3958", fontSize: "1.2em" }}>
									<HeartFilledSVG />
								</span>
								<small
									className="ms-1"
									style={{ color: "#fb3958", fontWeight: "100" }}>
									{props.death.likes}
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
									{props.death.likes}
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
						id={props.death.id}
						placeholder="Write Something"
						urlTo="/death-comments"
						editing={false}
					/>
				</div>
				{/* SocialMedia Input End */}
				{/* Death  likes End */}
			</div>
		</span>
	)
}

export default Death
