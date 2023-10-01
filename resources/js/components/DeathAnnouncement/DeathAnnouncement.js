import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"

const DeathAnnouncement = (props) => {
	const [hasLiked, setHasLiked] = useState(props.deathAnnouncement.hasLiked)

	useEffect(() => {
		// Set new cart with data with auth
		setHasLiked(props.deathAnnouncement.hasLiked)
	}, [props.deathAnnouncement])

	// Function for liking Death Announcement
	const onLike = (deathAnnouncementId) => {
		setHasLiked(!hasLiked)

		// Add like to database
		Axios.post(`/api/death-announcement-likes`, {
			deathAnnouncementId: deathAnnouncementId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Death Announcements
				props.get("death-announcements", props.setDeathAnnouncements)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<span
			className="my-2 mx-2 pt-0 px-0 pb-2 card"
			style={{ display: "inline-block" }}>
			<div className="death-announcement-media">
				<div className="death-announcement-thumbnail">
					<Link to={`/death-announcement/show/${props.deathAnnouncement.id}`}>
						<Img src={props.deathAnnouncement.poster} />
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
						<Link to={`/profile/show/${props.deathAnnouncement.userId}`}>
							<Img
								src={props.deathAnnouncement.userAvatar}
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
					<div className="flex-grow-1">
						<h6 className="death-announcement-user-name mt-1 pt-2 px-1">
							{props.deathAnnouncement.userName}
						</h6>
					</div>
					{/* User Name End */}
				</div>
				{/* User info End */}
				<h3 className="death-announcement-name px-2 mb-0">
					{props.deathAnnouncement.name}
				</h3>
				<p className="m-0">{props.deathAnnouncement.eulogy}</p>
				<div className="d-flex justify-content-between px-4 py-2">
					{/* Death Announcement likes */}
					<div
						style={{ cursor: "pointer" }}
						onClick={() => onLike(props.deathAnnouncement.id)}>
						{hasLiked ? (
							<div>
								<span style={{ color: "#fb3958", fontSize: "1.2em" }}>
									<HeartFilledSVG />
								</span>
								<small
									className="ms-1"
									style={{ color: "#fb3958", fontWeight: "100" }}>
									{props.deathAnnouncement.likes}
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
									{props.deathAnnouncement.likes}
								</small>
							</div>
						)}
					</div>
				</div>
				{/* SocialMedia Input */}
				<div>
					<SocialMediaInput
						{...props}
						id={props.deathAnnouncement.id}
						placeholder="Write Something"
						urlTo="/death-announcement-comments"
						editing={false}
					/>
				</div>
				{/* SocialMedia Input End */}
				{/* Death Announcement likes End */}
			</div>
		</span>
	)
}

export default DeathAnnouncement
