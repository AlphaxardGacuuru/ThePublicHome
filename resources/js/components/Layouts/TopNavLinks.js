import React from "react"
import { Link } from "react-router-dom"
import Img from "@/components/Core/Img"

import PersonSVG from "@/svgs/PersonSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import PrivacySVG from "@/svgs/PrivacySVG"

const TopNavLinks = (props) => {
	return (
		<>
			{/* Admin */}
			{props.auth?.id != "@blackmusic" && (
				<Link
					to="/admin"
					className="text-white me-2">
					<PersonSVG />
				</Link>
			)}

			{/* Avatar Dropdown */}
			<div className="dropdown-center pb-2">
				{/* Avatar */}
				<a
					href="#"
					role="button"
					className="hidden"
					data-bs-toggle="dropdown"
					aria-expanded="false">
					<Img
						src={props.auth?.avatar}
						className="rounded-circle"
						width="20px"
						height="20px"
						alt="Avatar"
					/>
				</a>
				{/* For small screens */}
				<span
					className="anti-hidden"
					onClick={() => {
						props.setBottomMenu(
							props.bottomMenu == "menu-open" ? "" : "menu-open"
						)
					}}>
					<Img
						src={props.auth?.avatar}
						className="rounded-circle anti-hidden"
						width="20px"
						height="20px"
						alt="Avatar"
					/>
				</span>
				{/* Avatar End */}
				<div className="dropdown-menu rounded-0 m-0 p-0">
					<Link
						to={`/profile/show/${props.auth?.id}`}
						className="p-2 px-3 pt-3 dropdown-item">
						<div className="d-flex">
							<div className="align-items-center">
								<Img
									src={props.auth?.avatar}
									className="rounded-circle"
									width="25px"
									height="25px"
									alt="Avatar"
								/>
							</div>
							<div className="ps-2">
								<h5>{props.auth?.name}</h5>
							</div>
						</div>
					</Link>
					<Link
						to="/download"
						className="p-2 px-3 dropdown-item"
						style={{
							display: props.downloadLink ? "block" : "none",
						}}>
						<h6>
							<span className="me-2">
								<DownloadSVG />
							</span>
							Get App
						</h6>
					</Link>
					<Link
						to="/privacy-policy"
						className="p-2 px-3 dropdown-item"
						title="Privacy Policy">
						<h6>
							<span className="me-2">
								<PrivacySVG />
							</span>
							Privacy Policy
						</h6>
					</Link>
					<Link
						to="#"
						className="p-2 px-3 dropdown-item"
						onClick={(e) => props.logout(e)}>
						<h6>
							<span className="me-2">
								<LogoutSVG />
							</span>
							Logout
						</h6>
					</Link>
				</div>
			</div>
			{/* Avatar Dropdown End */}
		</>
	)
}

export default TopNavLinks
