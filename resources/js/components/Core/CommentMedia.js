import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"

import OptionsSVG from "@/svgs/OptionsSVG"
import HeartSVG from "@/svgs/HeartSVG"
import HeartFilledSVG from "@/svgs/HeartFilledSVG"
import CloseSVG from "@/svgs/CloseSVG"

const CommentMedia = (props) => {
	const [hasLiked, setHasLiked] = useState(props.comment.hasLiked)
	const [bottomMenu, setBottomMenu] = useState("")

	useEffect(() => {
		// Set new cart with data with auth
		setHasLiked(props.comment.hasLiked)
	}, [props.comment])

	return (
		<div>
			<div className="d-flex">
				<div className="py-2">
					<div className="avatar-thumbnail-xs">
						<Link to={`/profile/show/${props.comment.userId}`}>
							<Img
								src={props.comment.avatar}
								className="rounded-circle"
								width="40em"
								height="40em"
							/>
						</Link>
					</div>
				</div>
				<div
					className="p-1 flex-grow-1"
					style={{ textAlign: "left" }}>
					<h6
						className="media-heading m-0"
						style={{
							width: "100%",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip",
						}}>
						<b>{props.comment.name}</b>
						<small>
							<b>
								<i className="float-end text-secondary me-1">
									{props.comment.createdAt}
								</i>
							</b>
						</small>
					</h6>
					<p className="mb-0">{props.comment.text}</p>

					{/* Comment likes */}
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault()
							props.onCommentLike(props.comment.id)
							setHasLiked(!hasLiked)
						}}>
						{hasLiked ? (
							<span style={{ color: "#fb3958" }}>
								<HeartFilledSVG />
								<small
									className="ms-1"
									style={{ color: "inherit" }}>
									{props.comment.likes}
								</small>
							</span>
						) : (
							<span>
								<HeartSVG />
								<small
									className="ms-1"
									style={{ color: "inherit" }}>
									{props.comment.likes}
								</small>
							</span>
						)}
					</a>
					{/* Comment likes End */}

					<small className="ms-1">{props.comment.comments}</small>

					{/* <!-- Default dropup button --> */}
					<div className="dropup-center dropup hidden float-end">
						<a
							href="#"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							<OptionsSVG />
						</a>
						<div
							className="dropdown-menu dropdown-menu-right">
							{props.comment.userId == props.auth.id && (
								<a
									href="#"
									className="dropdown-item"
									onClick={(e) => {
										e.preventDefault()
										props.onDeleteComment(props.comment.id)
									}}>
									<h6>Delete comment</h6>
								</a>
							)}
						</div>
					</div>
					{/* For small screens */}
					<div className="float-end anti-hidden">
						<span
							className="text-secondary"
							onClick={() => {
								if (props.comment.userId == props.auth.id) {
									setBottomMenu("menu-open")
								}
							}}>
							<OptionsSVG />
						</span>
					</div>
				</div>
			</div>

			{/* Sliding Bottom Nav */}
			<div
				className={bottomMenu}
				onClick={() => setBottomMenu("")}>
				<div
					className="bottomMenu"
					style={{ margin: "5% 3%" }}>
					<div className="d-flex align-items-center justify-content-between">
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon float-end mr-3"
							style={{ fontSize: "0.8em" }}>
							<CloseSVG />
						</div>
					</div>
					{/* Delete Comment */}
					<div onClick={() => props.onDeleteComment(props.comment.id)}>
						<h6 className="pb-2">Delete comment</h6>
					</div>
					{/* Delete Comment End */}
				</div>
			</div>
			{/* Sliding Bottom Nav End */}
		</div>
	)
}

export default CommentMedia
