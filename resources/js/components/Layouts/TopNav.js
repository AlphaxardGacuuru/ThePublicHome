import React, { useState, useEffect } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import Img from "@/components/Core/Img"

import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import PrivacySVG from "@/svgs/PrivacySVG"
import HomeSVG from "@/svgs/HomeSVG"
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

	// Function for showing active color
	const active = (check) => {
		return location.pathname.match(check) ? "active" : "text-white"
	}
	const activeStrict = (check) => {
		return location.pathname == check ? "active" : "text-white"
	}

	// Function for showing active color
	const active2 = (check) => {
		return location.pathname == check ? "active" : "text-white"
	}

	// Function for showing active color
	const activeStrict2 = (check) => {
		return location.pathname == check ? "active" : "text-white"
	}

	return (
		<>
			<div
				id="MyElement"
				className={`${menu} ${display}`}>
				{/* <!-- ***** Header Area Start ***** --> */}
				<header className="header-area">
					<div className="container-fluid p-0">
						<div className="row">
							<div
								className="col-12"
								style={{ padding: "0" }}>
								<div className="menu-area d-flex justify-content-between">
									<div className="d-flex align-items-center">
										{/* <!-- Left Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className={` text-white me-3 ${
												location.pathname.match("/profile/")
													? "d-block"
													: "d-none"
											}`}
											onClick={(e) => {
												e.preventDefault()
												props.setLeftMenu(props.leftMenu ? "" : "left-open")
											}}>
											<MenuSVG />
										</a>
										{/* <!-- Left Menu Icon End --> */}

										{/* <!-- Logo Area  --> */}
										<div className="logo-area">
											<Link
												to="/"
												className="text-white fw-lighter">
												The Public Home
											</Link>
										</div>
									</div>

									{/* Nav Links */}
									<div className="d-flex align-items-center justify-content-between hidden">
										<div className="hidden">
											<Link
												to="/"
												className={`nav-link mx-4 ${activeStrict(
													"/"
												)}`}
												onClick={() => setMenu("")}>
												Home
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/deaths"
												className={`nav-link mx-4 ${active(
													"/deaths"
												)}`}
												onClick={() => setMenu("")}>
												Deaths
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/weddings"
												className={`nav-link mx-4 ${active(
													"/weddings"
												)}`}
												onClick={() => setMenu("")}>
												Weddings
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/graduations"
												className={`nav-link mx-4 ${active(
													"/graduations"
												)}`}
												onClick={() => setMenu("")}>
												Graduations
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/success-cards"
												className={`nav-link mx-4 ${active(
													"/success-cards"
												)}`}
												onClick={() => setMenu("")}>
												Success Cards
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/anniversaries"
												className={`nav-link mx-4 ${active(
													"/anniversaries"
												)}`}
												onClick={() => setMenu("")}>
												Anniversaries
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/celebrations"
												className={`nav-link mx-4 ${active(
													"/celebrations"
												)}`}
												onClick={() => setMenu("")}>
												Celebrations
											</Link>
										</div>
									</div>
									{/* Nav Links End */}

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
												<div className="dropdown-center">
													{/* Avatar Dropdown */}
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
															to={`/profile/show/${props.auth.id}`}
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
																	<h5 className="text-wrap">
																		{props.auth?.name}
																	</h5>
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
											)}
											{/* Avatar Dropdown End */}
										</div>
										{/* <!-- Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className="text-white anti-hidden"
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
				{location.pathname.match(/profile/) ? (
					<br className="hidden" />
				) : (
					<span>
						<br />
						<br className="hidden" />
					</span>
				)}

				{/* <!-- ***** Side Menu Area Start ***** --> */}
				<div className="mainMenu d-flex align-items-center justify-content-between">
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon"
						onClick={() => setMenu("")}>
						<CloseSVG />
					</div>
					{/* <!-- Logo Area --> */}
					<div className="logo-area me-5">
						<Link to="/">The Public Home</Link>
					</div>
					{/* <!-- Nav --> */}
					<div
						className="sonarNav wow fadeInUp"
						data-wow-delay="1s">
						<nav>
							<ul>
								<li className="nav-item">
									<Link
										to="/"
										className={`nav-link ${activeStrict2("/")}`}
										onClick={() => setMenu("")}>
										Home
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/deaths"
										className={`nav-link ${active2("/deaths")}`}
										onClick={() => setMenu("")}>
										Deaths
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/weddings"
										className={`nav-link ${active2("/weddings")}`}
										onClick={() => setMenu("")}>
										Weddings
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/graduations"
										className={`nav-link ${active2("/graduations")}`}
										onClick={() => setMenu("")}>
										Graduations
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/success-cards"
										className={`nav-link ${active2("/success-cards")}`}
										onClick={() => setMenu("")}>
										Success Cards
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/anniversaries"
										className={`nav-link ${active2("/success-cards")}`}
										onClick={() => setMenu("")}>
										Anniversaries
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/celebrations"
										className={`nav-link ${active2("/success-cards")}`}
										onClick={() => setMenu("")}>
										Celebrations
									</Link>
								</li>
							</ul>
						</nav>
					</div>
					<br />
				</div>
			</div>
			{/* <!-- ***** Side Menu Area End ***** --> */}

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
