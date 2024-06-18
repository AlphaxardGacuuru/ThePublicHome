import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min"

import Img from "@/components/Core/Img"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"
import CommentSVG from "@/svgs/CommentSVG"
import OptionsSVG from "@/svgs/OptionsSVG"
import HelpSVG from "@/svgs/HelpSVG"

const Media = (props) => {
	const location = useLocation()
	const [hasLiked, setHasLiked] = useState(props.announcement.hasLiked)

	useEffect(() => {
		// Set new cart with data with auth
		setHasLiked(props.announcement.hasLiked)
	}, [props.announcement])

	// Function for liking Announcement
	const onLike = (announcementId) => {
		setHasLiked(!hasLiked)

		// Add like to database
		Axios.post(`api/${props.announcementToGet}-likes`, {
			id: announcementId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Announcement
				props.fetchAnnouncements()
			})
			.catch((err) => props.getErrors(err))
	}

	const formatedAnnouncement = () => {
		return props.announcementToGet == "anniversary"
			? props.announcementToGet.replace("y", "ie")
			: props.announcementToGet
	}

	return (
		<span
			id={`media${props.index}`}
			className="my-2 mx-2 pt-0 px-0 pb-2 card bg-white"
			style={{ display: "inline-block" }}>
			<div className="announcement-media">
				<div className="announcement-thumbnail">
					<Link
						to={`/${formatedAnnouncement()}s/show/${props.announcement.id}`}>
						<Img src={props.announcement.poster} />
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
						<Link to={`/profile/show/${props.announcement.userId}`}>
							<Img
								src={props.announcement.userAvatar}
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
						<h6 className="announcement-user-name mt-1 pt-2 px-1">
							{props.announcement.userName}
						</h6>
					</div>
					{/* User Name End */}
				</div>
				{/* User info End */}
				<h3 className="announcement-name px-2 mb-0">
					{props.announcement.name ?? props.announcement.title}
				</h3>
				<p className="announcement-announcement mb-0 px-2 text-start">
					{props.announcement.announcement}
				</p>
				<p className="mb-0 px-2 text-start">
					<small
						className="bg-2 my-1 p-1 text-white text-uppercase"
						style={{ fontSize: "0.8em" }}>
						{props.announcement.tier}
					</small>
				</p>
				<div className="d-flex justify-content-start">
					{/* Announcement likes */}
					<div
						className="p-2"
						style={{ cursor: "pointer" }}
						onClick={() => onLike(props.announcement.id)}>
						{hasLiked ? (
							<div>
								<span style={{ color: "#fb3958", fontSize: "1.2em" }}>
									<HeartFilledSVG />
								</span>
								<small
									className="ms-1"
									style={{ color: "#fb3958", fontWeight: "100" }}>
									{props.announcement.likes}
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
									{props.announcement.likes}
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
							{props.announcement.comments}
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
							<a
								href={`mailto:thepublichome@gmail.com?subject=Issue with ${props.title} ID ${props.announcement.id}&body=Enquiry`}
								className="dropdown-item">
								<span className="me-2">
									<HelpSVG />
								</span>
								Report Issue
							</a>
						</ul>
					</div>
					{/* <!-- Options dropup button End --> */}
				</div>
				{/* SocialMedia Input */}
				<div className="border-top border-light">
					<SocialMediaInput
						{...props}
						id={props.announcement.id}
						placeholder={
							location.pathname == "/" || location.pathname.match("/deaths")
								? "Write your Condolences"
								: "Write Something"
						}
						urlTo={`${props.announcementToGet}-comments`}
						stateToUpdate={() => props.fetchAnnouncements()}
						editing={false}
					/>
				</div>
				{/* SocialMedia Input End */}
				{/* Announcement  likes End */}
			</div>
		</span>
	)
}

export default Media
