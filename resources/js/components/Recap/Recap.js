import React from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"

const Recap = (props) => {
	return (
		<div className="m-1 karaoke-media">
			<div>
				<video
					src={props.recap.recap}
					width="100%"
					preload="none"
					autoPlay
					muted
					loop
					playsInline></video>
			</div>
			<div className="d-flex">
				<div>
					<Link to={`/profile/show/${props.recap.userId}`}>
						<Img
							src={props.recap.userAvatar}
							className="rounded-circle"
							width="40em"
							height="40em"
							alt="user"
							loading="lazy"
						/>
					</Link>
				</div>
				<div
					className="mt-2 px-2"
					style={{
						textAlign: "left",
						width: "10em",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "clip",
					}}>
					<h6 className="m-0 px-1">{props.recap.userName}</h6>
					<Btn
						btnText="delete"
						btnClass="btn-sm"
						onClick={() => props.onDelete(props.recap.id, props.recap.model)}
					/>
				</div>
			</div>
		</div>
	)
}

export default Recap
