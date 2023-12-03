import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"
import SocialMediaInput from "@/components/Core/SocialMediaInput"
import CommentMedia from "@/components/Core/CommentMedia"

const WeddingShow = (props) => {
	const { id } = useParams()

	const [wedding, setWedding] = useState({})
	const [weddingComments, setWeddingComments] = useState([])
	const [deletedIds, setDeletedIds] = useState([])
	const [pageLoader, setPageLoader] = useState(true)

	useEffect(() => {
		Axios.get(`api/weddings/${id}`)
			.then((res) => {
				setPageLoader(false)
				// Set Wedding Announcement
				setWedding(res.data.data)
			})
			.catch((err) => props.getErrors(err))

		// Fetch Wedding Announcements Comments
		props.get(`wedding-comments/${id}`, setWeddingComments)
	}, [])

	/*
	 * Function for liking comments */
	const onCommentLike = (commentId) => {
		// Add like to database
		Axios.post(`/api/wedding-comment-likes`, {
			commentId: commentId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				props.get(`wedding-comments/${id}`, setVideoComments)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Function for deleting comments */
	const onDeleteComment = (commentId) => {
		// Remove deleted comment
		setDeletedIds([...deletedIds, commentId])

		Axios.delete(`/api/wedding-comments/${commentId}`)
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
					<div className="death-poster">
						<Img
							src={wedding.poster}
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
									<Link to={`/profile/show/${wedding.userId}`}>
										<Img
											src={wedding.userAvatar}
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
										{wedding.userName}
									</h6>
								</div>
								{/* Service Provider Name End */}
								{/* Edit Button */}
								<div>
									{wedding.userId == props.auth?.id && (
										<div>
											<MyLink
												linkTo={`/wedding/edit/${id}`}
												text="edit"
											/>
										</div>
									)}
									{/* Edit Button End */}
								</div>
							</div>
							{/* User info End */}
							<h2>{wedding.name}</h2>
						</div>
						<div className="col-sm-9 border-start">
							<h2>Eulogy</h2>
							<p>{wedding.eulogy}</p>
						</div>
					</div>
					{/* Wedding Announcement Info End */}

					{/* Comments */}
					<div>
						{wedding.userId != props.auth?.id && (
							<SocialMediaInput
								{...props}
								id={wedding.id}
								placeholder="Write Something"
								urlTo="/wedding-comments"
								editing={false}
								stateToUpdate={() => {
									props.get(
										`wedding-comments/${id}`,
										setWeddingComments
									)
								}}
							/>
						)}
						<br />
						{weddingComments
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

export default WeddingShow
