import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"
import SocialMediaInput from "@/components/Core/SocialMediaInput"
import CommentMedia from "@/components/Core/CommentMedia"

const WeddingAnnouncementShow = (props) => {
	const { id } = useParams()

	const [weddingAnnouncement, setWeddingAnnouncement] = useState({})
	const [weddingAnnouncementComments, setWeddingAnnouncementComments] = useState([])
	const [deletedIds, setDeletedIds] = useState([])
	const [pageLoader, setPageLoader] = useState(true)

	useEffect(() => {
		Axios.get(`api/wedding-announcements/${id}`)
			.then((res) => {
				setPageLoader(false)
				// Set Wedding Announcement
				setWeddingAnnouncement(res.data.data)
			})
			.catch((err) => props.getErrors(err))

		// Fetch Wedding Announcements Comments
		props.get(`wedding-announcement-comments/${id}`, setWeddingAnnouncementComments)
	}, [])

	/*
	 * Function for liking comments */
	const onCommentLike = (commentId) => {
		// Add like to database
		Axios.post(`/api/wedding-announcement-comment-likes`, {
			commentId: commentId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				props.get(`wedding-announcement-comments/${id}`, setVideoComments)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Function for deleting comments */
	const onDeleteComment = (commentId) => {
		// Remove deleted comment
		setDeletedIds([...deletedIds, commentId])

		Axios.delete(`/api/wedding-announcement-comments/${commentId}`)
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	return (
		<div>
			{pageLoader && (
				<div
					id="preloader"
					style={{ top: 50 }}>
					<div className="preload-content mb-3">
						<div
							className="spinner-grow text-primary"
							style={{ width: "10em", height: "10em" }}></div>
					</div>
				</div>
			)}

			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-10">
					{/* Main Image */}
					<div className="death-announcement-poster">
						<Img
							src={weddingAnnouncement.poster}
							width="100%"
							height="auto"
						/>
					</div>
					{/* Main Image End */}

					{/* Wedding Announcement Info */}
					<div className="row">
						<div className="col-sm-3 mb-4 px-3">
							{/* User info */}
							<div
								className="d-flex p-1"
								style={{ maxWidth: "220em" }}>
								{/* Avatar */}
								<div
									className="py-2"
									style={{ minWidth: "40px" }}>
									<Link to={`/profile/show/${weddingAnnouncement.userId}`}>
										<Img
											src={weddingAnnouncement.userAvatar}
											className="rounded-circle"
											width="30px"
											height="30px"
											alt="user"
											loading="lazy"
										/>
									</Link>
								</div>
								{/* Avatar End */}
								{/* Service Provider Name */}
								<div className="flex-grow-1">
									<h6
										className="mt-1 pt-2 px-1"
										style={{
											width: "10em",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
											textAlign: "left",
										}}>
										{weddingAnnouncement.userName}
									</h6>
								</div>
								{/* Service Provider Name End */}
								{/* Edit Button */}
								<div>
									{weddingAnnouncement.userId == props.auth?.id && (
										<div>
											<MyLink
												linkTo={`/wedding-announcement/edit/${id}`}
												text="edit"
											/>
										</div>
									)}
									{/* Edit Button End */}
								</div>
							</div>
							{/* User info End */}
							<h2>{weddingAnnouncement.name}</h2>
						</div>
						<div className="col-sm-9 border-start">
							<h2>Eulogy</h2>
							<p>{weddingAnnouncement.eulogy}</p>
						</div>
					</div>
					{/* Wedding Announcement Info End */}

					{/* Comments */}
					<div>
						{weddingAnnouncement.userId != props.auth?.id && (
							<SocialMediaInput
								{...props}
								id={weddingAnnouncement.id}
								placeholder="Write Something"
								urlTo="/wedding-announcement-comments"
								editing={false}
								stateToUpdate={() => {
									props.get(
										`wedding-announcement-comments/${id}`,
										setWeddingAnnouncementComments
									)
								}}
							/>
						)}
						<br />
						{weddingAnnouncementComments
							.filter((comment) => !deletedIds.includes(comment.id))
							.map((comment, key) => (
								<CommentMedia
									{...props}
									key={key}
									comment={comment}
									onCommentLike={onCommentLike}
									onDeleteComment={onDeleteComment}
								/>
							))}
					</div>
					{/* Comments End */}

					<br />
					<center>
						<MyLink
							linkTo="/"
							text="back to wedding announcements"
						/>
					</center>
				</div>
				<div className="col-sm-1"></div>
			</div>
		</div>
	)
}

export default WeddingAnnouncementShow
