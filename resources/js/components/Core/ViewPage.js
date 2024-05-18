import React, { useEffect, useState } from "react"
import {
	Link,
	useParams,
	useLocation,
} from "react-router-dom/cjs/react-router-dom.min"

import { Document, Page, Outline } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"
import SocialMediaInput from "@/components/Core/SocialMediaInput"
import CommentMedia from "@/components/Core/CommentMedia"

import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import HeartSVG from "@/svgs/HeartSVG"
import CommentSVG from "@/svgs/CommentSVG"

const ViewPage = (props) => {
	const location = useLocation()
	const { id } = useParams()

	const [announcement, setAnnouncement] = useState({})
	const [comments, setComments] = useState([])
	const [hasLiked, setHasLiked] = useState()
	const [deletedIds, setDeletedIds] = useState([])
	const [pageLoader, setPageLoader] = useState(true)
	const [eulogy, setEulogy] = useState("text")

	const [numPages, setNumPages] = useState()
	const [pageNumber, setPageNumber] = useState(1)
	const [zoomNumber, setZoomNumber] = useState(1)

	useEffect(() => {
		Axios.get(`api/${formatedAnnouncement()}s/${id}`)
			.then((res) => {
				setPageLoader(false)
				setAnnouncement(res.data.data)
				setHasLiked(res.data.data.hasLiked)
			})
			.catch((err) => props.getErrors(err))

		// Fetch Announcements Comments
		props.get(`${props.announcement}-comments/${id}`, setComments)
	}, [])

	// Function for liking Announcement
	const onLike = (announcementId) => {
		setHasLiked(!hasLiked)

		// Add like to database
		Axios.post(`/api/${props.announcement}-likes`, {
			id: announcementId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Announcements
				props.get(`${formatedAnnouncement()}s/${id}`, setAnnouncement)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Function for liking comments */
	const onCommentLike = (commentId) => {
		// Add like to database
		Axios.post(`/api/${props.announcement}-comment-likes`, {
			commentId: commentId,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Fetch Comments
				props.get(`${props.announcement}-comments/${id}`, setComments)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Function for deleting comments */
	const onDeleteComment = (commentId) => {
		// Remove deleted comment
		setDeletedIds([...deletedIds, commentId])

		Axios.delete(`/api/${props.announcement}-comments/${commentId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Announcements
				props.get(`${formatedAnnouncement()}s/${id}`, setAnnouncement)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * React PDF functions
	 */
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages)
	}

	function changePage(offset) {
		setPageNumber((prevPageNumber) => prevPageNumber + offset)
	}

	function previousPage() {
		changePage(-1)
	}

	function nextPage() {
		changePage(1)
	}

	function changeZoom(offset) {
		setZoomNumber((prevZoomNumber) => prevZoomNumber + offset)
	}

	function previousZoom() {
		changeZoom(-0.1)
	}

	function nextZoom() {
		changeZoom(0.1)
	}

	function onItemClick({ pageNumber: itemPageNumber }) {
		setPageNumber(itemPageNumber)
	}

	const formatedAnnouncement = () => {
		return props.announcement == "anniversary"
			? props.announcement.replace("y", "ie")
			: props.announcement
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
					<div className="announcement-poster">
						<Img
							src={announcement.poster}
							width="100%"
							height="auto"
						/>
					</div>
					{/* Main Image End */}

					{/* Announcement  Info */}
					<div className="row p-0">
						<div className="col-sm-3 mb-4">
							<div className="border rounded my-2 px-2 pb-5">
								{/* User info */}
								<div
									className="d-flex p-1"
									style={{ maxWidth: "220em" }}>
									{/* Avatar */}
									<div
										className="py-2"
										style={{ minWidth: "40px" }}>
										<Link to={`/profile/show/${announcement.userId}`}>
											<Img
												src={announcement.userAvatar}
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
										<h4
											className="mt-1 pt-2 px-1"
											style={{
												width: "10em",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip",
												textAlign: "left",
											}}>
											{announcement.userName}
										</h4>
									</div>
									{/* Service Provider Name End */}
								</div>
								<div className="d-flex">
									{/* Likes */}
									<div
										className="me-2"
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
													{announcement.likes}
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
													{announcement.likes}
												</small>
											</div>
										)}
									</div>
									{/* Likes End */}

									{/* Comments */}
									<div className="flex-grow-1 text-start">
										<span style={{ fontSize: "1.2em" }}>
											<CommentSVG />
										</span>
										<small
											className="ms-1"
											style={{ color: "inherit", fontWeight: "100" }}>
											{announcement.comments}
										</small>
									</div>
									{/* Comments End */}
								</div>
								{/* User info End */}

								<hr />

								<h2>{announcement.name}</h2>
								<h2>{announcement.title}</h2>

								<hr />

								<h6 className="text-capitalize">
									Locale: {announcement.locale}
								</h6>
								{announcement.venue && <h6>Venue: {announcement.venue}</h6>}
								{location.pathname.match("/deaths") ? (
									<React.Fragment>
										<h6>Sunrise: {announcement.sunriseFormated}</h6>
										<h6>Sunset: {announcement.sunsetFormated}</h6>
										<h6>Burial Date: {announcement.burialDateFormated}</h6>
									</React.Fragment>
								) : (
									<h6>
										<span className="text-capitalize me-1">
											{props.announcement} Date:
										</span>
										{announcement.dateFormated}
									</h6>
								)}
							</div>
						</div>
						<div className="col-sm-9 p-0">
							<div className="border rounded my-2 px-2 pt-3 pb-5">
								{/* Announcement */}
								<h5>Announcement</h5>
								<h6 className="mb-4">{announcement.announcement}</h6>
								{/* Announcement End */}

								{/* Eulogy */}
								{location.pathname.match("/deaths") && (
									<React.Fragment>
										<h5>Eulogy</h5>

										{/* Confirm Delete Modal End */}
										<div
											className="modal fade"
											id={`eulogyModal`}
											tabIndex="-1"
											aria-labelledby="eulogyModalLabel"
											aria-hidden="true">
											<div
												className="modal-dialog"
												style={{ minWidth: "90%" }}>
												<div className="modal-content">
													<div className="modal-header">
														<h1
															id="eulogyModalLabel"
															className="modal-title fs-5">
															Eulogy
														</h1>
														<button
															type="button"
															className="btn-close"
															data-bs-dismiss="modal"
															aria-label="Close"></button>
													</div>
													<div className="modal-body text-start text-wrap">
														{announcement.eulogyWords ? (
															<h6>{announcement.eulogyWords}</h6>
														) : (
															<div>
																{/* PDF Viewer */}
																<div className="d-flex justify-content-center p-2">
																	<Document
																		// className="w-100"
																		file={`/storage/${announcement.eulogy}`}
																		onLoadSuccess={onDocumentLoadSuccess}
																		loading={
																			<div
																				className="spinner-border my-auto"
																				style={{ color: "inherit" }}></div>
																		}>
																		<Outline onItemClick={onItemClick} />
																		<Page
																			className="hidden"
																			width={720}
																			pageNumber={pageNumber}
																			scale={zoomNumber}
																			loading={
																				<div
																					className="spinner-border my-auto"
																					style={{ color: "inherit" }}></div>
																			}
																		/>
																		<Page
																			className="anti-hidden"
																			pageNumber={pageNumber}
																			scale={zoomNumber}
																			width={300}
																			loading={
																				<div
																					className="spinner-border my-auto"
																					style={{ color: "inherit" }}></div>
																			}
																		/>
																	</Document>
																</div>
																{/* PDF Viewer End */}
																<p className="text-center mt-2">
																	Page {pageNumber} of {numPages}
																</p>
																{/* Navigation Buttons */}
																<div className="d-flex justify-content-center">
																	<Btn
																		btnText="zoom out"
																		btnClass="me-1"
																		onClick={previousZoom}
																		disabled={zoomNumber <= 1}
																	/>
																	<Btn
																		btnText="previous"
																		btnClass="me-1"
																		onClick={previousPage}
																		disabled={pageNumber <= 1}
																	/>
																	<Btn
																		btnText="next"
																		btnClass="ms-1"
																		onClick={nextPage}
																		disabled={pageNumber >= numPages}
																	/>
																	<Btn
																		btnText="zoom in"
																		btnClass="ms-1"
																		onClick={nextZoom}
																		disabled={zoomNumber >= 2}
																	/>
																</div>
																{/* Navigation Buttons End */}
															</div>
														)}
													</div>
													{!announcement.eulogyWords && (
														<div className="modal-footer">
															<a
																href={`/storage/${announcement.eulogy}`}
																className="btn rounded-0 text-uppercase">
																download
															</a>
														</div>
													)}
												</div>
											</div>
										</div>
										{/* Confirm Delete Modal End */}

										{/* Button trigger modal */}
										<button
											type="button"
											className="btn rounded-0 text-uppercase mb-4"
											data-bs-toggle="modal"
											data-bs-target={`#eulogyModal`}>
											view eulogy
										</button>
										{/* Button trigger modal */}
										{/* Eulogy End */}
									</React.Fragment>
								)}
								{/* Eulogy End */}

								{/* List Images */}
								<h5>Photos</h5>
								<div className="d-flex justify-content-start mb-4 p-2 overflow-x-scroll custom-scroll">
									{announcement.photos?.map((photo, key) => (
										<div
											key={key}
											className="shadow m-1 p-1">
											<a href={`/storage/${photo}`}>
												<Img
													src={`/storage/${photo}`}
													className="mx-2"
													style={{ width: "10em", height: "auto" }}
												/>
											</a>
										</div>
									))}
								</div>
								{/* List Images End */}

								{/* List Videos */}
								{announcement.videoLimit > 0 && (
									<React.Fragment>
										<h5>Videos</h5>
										<div className="d-flex justify-content-start mb-4 p-2 overflow-x-scroll">
											{announcement.videos?.map((video, key) => (
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
					{/* Announcement  Info End */}

					<div className="text-center my-4">
						{/* Edit Button */}
						{announcement.userId == props.auth?.id && (
							<div className="mb-2">
								<MyLink
									linkTo={`/${formatedAnnouncement()}s/edit/${id}`}
									text={`edit ${props.announcement} announcement`}
								/>
							</div>
						)}
						{/* Edit Button End */}
						<MyLink
							linkTo={`/${formatedAnnouncement()}s`}
							text={`back to ${props.announcement} announcements`}
						/>
					</div>

					{/* Comments */}
					<div>
						{announcement.userId != props.auth?.id && (
							<SocialMediaInput
								{...props}
								id={announcement.id}
								placeholder="Write Something"
								urlTo={`/${props.announcement}-comments`}
								editing={false}
								stateToUpdate={() => {
									props.get(`${formatedAnnouncement()}s/${id}`, setAnnouncement)
									props.get(`${props.announcement}-comments/${id}`, setComments)
								}}
							/>
						)}
						<br />
						{comments
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

export default ViewPage
