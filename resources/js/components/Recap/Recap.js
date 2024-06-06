import React from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"

import OptionsSVG from "@/svgs/OptionsSVG"

const Recap = (props) => {
	return (
		<div
			id={`media${props.index}`}
			className="m-1 recap-media">
			<div>
				<video
					src={props.recap.video}
					width="100%"
					preload="none"
					autoPlay
					muted
					loop
					playsInline
					controls
					loading="lazy"></video>
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
						<span style={{ cursor: "pointer" }}>
							{props.auth.id == props.recap.userId && (
								<li
									className="dropdown-item"
									onClick={() => props.onDelete(props.recap.id)}>
									Delete
								</li>
							)}
						</span>
					</ul>
				</div>
				{/* <!-- Options dropup button End --> */}
			</div>
		</div>
	)
}

export default Recap
