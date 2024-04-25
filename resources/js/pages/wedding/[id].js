import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"
import SocialMediaInput from "@/components/Core/SocialMediaInput"
import CommentMedia from "@/components/Core/CommentMedia"

import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"
import CommentSVG from "@/svgs/CommentSVG"

const show = (props) => {
	const { id } = useParams()

	const [wedding, setWedding] = useState({})
	const [weddingComments, setWeddingComments] = useState([])
	const [hasLiked, setHasLiked] = useState()
	const [deletedIds, setDeletedIds] = useState([])
	const [pageLoader, setPageLoader] = useState(true)

	useEffect(() => {
		Axios.get(`api/weddings/${id}`)
			.then((res) => {
				setPageLoader(false)
				setWedding(res.data.data)
				setHasLiked(res.data.data.hasLiked)
			})
			.catch((err) => props.getErrors(err))

		// Fetch Wedding s Comments
		props.get(`wedding-comments/${id}`, setWeddingComments)
	}, [])

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
				props.get(`weddings/${id}`, setWedding)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Function for liking comments */
	const onCommentLike = (commentId) => {
		// Add like to database
		Axios.post(`/api/wedding-comment-likes`, {
			commentId: commentId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				props.get(`wedding-comments/${id}`, setWeddingComments)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Function for deleting comments */
	const onDeleteComment = (commentId) => {
		// Remove deleted comment
		setDeletedIds([...deletedIds, commentId])

		Axios.delete(`/api/wedding-comments/${commentId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Weddings
				props.get(`weddings/${id}`, setWedding)
			})
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

					{/* Wedding  Info */}
					<div className="row">
						<div className="col-sm-3 mb-4 px-3">
							<div className="border rounded my-2 px-2 pb-5">
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
									{/* Likes */}
									<div
										className="p-2"
										style={{ cursor: "pointer" }}
										onClick={() => onLike(id)}>
										{hasLiked ? (
											<div>
												<span style={{ color: "#fb3958", fontSize: "1.2em" }}>
													<HeartFilledSVG />
												</span>
												<small
													className="ms-1"
													style={{ color: "#fb3958", fontWeight: "100" }}>
													{wedding.likes}
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
													{wedding.likes}
												</small>
											</div>
										)}
									</div>
									{/* Likes End */}

									{/* Comments */}
									<div className="flex-grow-1 text-start p-2">
										<span style={{ fontSize: "1.2em" }}>
											<CommentSVG />
										</span>
										<small
											className="ms-1"
											style={{ color: "inherit", fontWeight: "100" }}>
											{wedding.comments}
										</small>
									</div>
									{/* Comments End */}
								</div>
								{/* User info End */}
								<h2>{wedding.title}</h2>
								<hr />
								<h6>{wedding.announcement}</h6>
								<hr />
								<h6 className="text-start">
									Tier:{" "}
									<small
										className="bg-2 my-1 p-1 text-white text-uppercase"
										style={{ fontSize: "0.8em" }}>
										{wedding.tier}
									</small>
								</h6>
								<h6 className="text-capitalize">Locale: {wedding.locale}</h6>
								<h6>Wedding Date: {wedding.weddingDateFormated}</h6>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="border rounded my-2 px-2 pt-3 pb-5">
								{/* List Images */}
								<h5>Photos</h5>
								<div className="d-flex justify-content-start mb-4 p-2 overflow-x-scroll custom-scroll">
									{wedding.photos?.map((photo, key) => (
										<div
											key={key}
											className="shadow m-1 p-1">
											<Img
												src={`/storage/${photo}`}
												className="mx-2"
												style={{ width: "10em", height: "auto" }}
											/>
										</div>
									))}
								</div>
								{/* List Images End */}

								{/* List Videos */}
								{wedding.videoLimit > 0 && (
									<React.Fragment>
										<h5>Videos</h5>
										<div className="d-flex justify-content-start mb-4 p-2 overflow-x-scroll">
											{wedding.videos?.map((video, key) => (
												<div
													key={key}
													className="shadow m-1 p-1">
													<video
														className="mx-2"
														style={{ width: "25em", height: "auto" }}
														controls>
														<source
															src={`/storage/${video}`}
															// type="video/mp4"
														/>
														Your browser does not support the video tag.
													</video>
												</div>
											))}
										</div>
									</React.Fragment>
								)}
								{/* List Videos End */}
							</div>
						</div>
					</div>
					{/* Wedding  Info End */}

					<div className="text-center my-4">
						{/* Edit Button */}
						{wedding.userId == props.auth?.id && (
							<div className="mb-2">
								<MyLink
									linkTo={`/weddings/edit/${id}`}
									text="edit wedding announcement"
								/>
							</div>
						)}
						{/* Edit Button End */}
						<MyLink
							linkTo="/"
							text="back to wedding announcements"
						/>
					</div>

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
									props.get(`weddings/${id}`, setWedding)
									props.get(`wedding-comments/${id}`, setWeddingComments)
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
				</div>
				<div className="col-sm-1"></div>
			</div>
		</div>
	)
}

export default show
