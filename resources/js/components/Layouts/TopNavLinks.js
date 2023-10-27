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
					{/* Avatar Dropdown */}
					<div className="dropdown-center">
						{/* Avatar */}
						<a
							href="#"
							role="button"
							className="hidden"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							<Img
								src={props.auth?.avatar}
								className="rounded-circle bg-light p-1"
								width="40px"
								height="40px"
								alt="Avatar"
							/>
						</a>
						{/* For small screens */}
						<span
							className="anti-hidden me-2"
							onClick={() => {
								setBottomMenu(bottomMenu ? "" : "menu-open")
								setAvatarVisibility("block")
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
						<div className="dropdown-menu rounded-0 m-0 p-0 bg-white">
							<Link
								to={`/profile/show`}
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
										<h5 className="text-wrap">{props.auth?.name}</h5>
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
								to="#"
								className="p-2 px-3 dropdown-item"
								onClick={(e) => logout(e)}>
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
