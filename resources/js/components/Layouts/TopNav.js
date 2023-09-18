import React, { useState, useEffect } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import TopNavLinks from "./TopNavLinks"

import Img from "@/components/Core/Img"

import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import PrivacySVG from "@/svgs/PrivacySVG"
import MenuSVG from "@/svgs/MenuSVG"
// import PersonSVG from "@/svgs/PersonSVG"
// import HomeSVG from "@/svgs/HomeSVG"

const TopNav = (props) => {
	const location = useLocation()
	const router = useHistory()

	const [menu, setMenu] = useState("")
	const [bottomMenu, setBottomMenu] = useState("")

	const logout = () => {
		Axios.post(`/logout`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove phone from localStorage
				localStorage.clear()
				// Reload
				window.location.reload()
			})
			.catch((err) => {
				props.getErrors(err)
				// Remove phone from localStorage
				localStorage.clear()
				// Reload
				window.location.reload()
			})
	}

	// Hide TopNav from various pages
	const display =
		location.pathname.match("/404") ||
		location.pathname.match("/login") ||
		location.pathname.match("/register")
			? "d-none"
			: ""

	return (
		<>
			<div
				id="MyElement"
				className={`${menu} ${display}`}>
				{/* <!-- ***** Header Area Start ***** --> */}
				<header
					className="header-area"
					style={{
						backgroundColor: "purple",
						borderBottomRightRadius: "20px",
					}}>
					<div className="container-fluid p-0">
						<div className="row">
							<div
								className="col-12"
								style={{ padding: "0" }}>
								<div className="menu-area d-flex justify-content-between">
									{/* <!-- Logo Area  --> */}
									<div className="logo-area">
										<Link
											to="/"
											className="text-white">
											The Public Home
										</Link>
									</div>

									<div className="menu-content-area d-flex align-items-center">
										{/* <!-- Header Social Area --> */}
										<div className="header-social-area d-flex align-items-center">
											{props.auth.name == "Guest" ? (
												<Link
													to="#"
													className="display-4 text-white"
													onClick={() => props.setLogin(true)}>
													Login
												</Link>
											) : (
												<TopNavLinks
													{...props}
													bottomMenu={bottomMenu}
													setBottomMenu={setBottomMenu}
													logout={logout}
												/>
											)}
										</div>
										{/* <!-- Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className="hidden"
											onClick={(e) => {
												e.preventDefault()
												setMenu("menu-open")
											}}>
											<MenuSVG />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<br />
				<br />
				{/* Remove for profile page for better background image */}
				{location.pathname.match(/profile/) ||
				location.pathname.match(/audio-charts/) ? (
					<br className="hidden" />
				) : (
					<span>
						<br />
						<br className="hidden" />
					</span>
				)}
			</div>

			{/* Left Column */}
			<div
				id="MyElement"
				className="left-open">
				{/* <!-- ***** Side Menu Area Start ***** --> */}
				<div
					className="leftMenu d-flex align-items-center justify-content-start"
					style={{ backgroundColor: "purple" }}>
					<div
						className="sonarNav wow fadeInUp w-100 mt-4"
						data-wow-delay="1s">
						<nav>
							<ul className="m-0 p-0">
								<li className="nav-item"></li>
							</ul>
						</nav>
					</div>

					<br />
				</div>
				{/* <!-- ***** Side Menu Area End ***** --> */}
			</div>
			{/* Left Column End */}

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon float-end  mt-2 me-2"
							style={{ fontSize: "0.8em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>
					<br />

					{/* Avatar Bottom */}
					<div className="m-0 p-0">
						<Link
							to={`/profile/show/${props.auth?.id}`}
							style={{ padding: "0px", margin: "0px" }}
							className="border-bottom text-start"
							onClick={() => setBottomMenu("")}>
							<div className="d-flex">
								<div className="ms-3 me-3">
									<Img
										src={props.auth?.avatar}
										className="rounded-circle"
										width="25px"
										height="25px"
										alt="Avatar"
									/>
								</div>
								<div>
									<h5>{props.auth?.name}</h5>
								</div>
							</div>
						</Link>
						<Link
							to="/download"
							className="p-3 text-start"
							style={{
								display: props.downloadLink ? "inline" : "none",
								textAlign: "left",
							}}
							onClick={() => setBottomMenu("")}>
							<h6>
								<span className="ms-3 me-4">
									<DownloadSVG />
								</span>
								Get App
							</h6>
						</Link>
						<Link
							to="/privacy"
							className="p-3 text-start"
							onClick={() => setBottomMenu("")}
							title="Privacy Policy">
							<h6>
								<span className="ms-3 me-4">
									<PrivacySVG />
								</span>
								Privacy Policy
							</h6>
						</Link>
						<Link
							to="#"
							className="p-3 text-start"
							onClick={(e) => {
								e.preventDefault()
								setBottomMenu("")
								logout()
							}}>
							<h6>
								<span className="ms-3 me-4">
									<LogoutSVG />
								</span>
								Logout
							</h6>
						</Link>
					</div>
					{/* Avatar Bottom End */}
				</div>
			</div>
			{/* Sliding Bottom Nav End */}
		</>
	)
}

export default TopNav
