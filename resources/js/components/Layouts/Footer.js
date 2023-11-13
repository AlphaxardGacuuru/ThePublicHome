import React from "react"
import { Link, useLocation } from "react-router-dom"

import Img from "@/components/Core/Img"
import PrivacySVG from "@/svgs/PrivacySVG"
import ChatSVG from "@/svgs/ChatSVG"
import PersonSVG from "@/svgs/PersonSVG"
import ChevronUpSVG from "@/svgs/ChevronUpSVG"

const Footer = () => {
	const location = useLocation()

	const onScroll = () => {
		// Smooth scroll to top
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	const hide =
		location.pathname.match("/admin") || location.pathname.match("/profile")
			? "d-none"
			: ""

	return (
		<div
			className={`mt-5 p-5 ${hide}`}
			style={{ backgroundColor: "#2A0134" }}>
			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-3 mb-5">
					<h1 className="text-white">The Public Home</h1>
					<p className="text-white">
						The Public Home is an online funeral and burial announcement
						platform that seeks to provide more tailored death announcements.
					</p>
				</div>
				<div className="col-sm-1"></div>
				<div className="col-sm-3 mb-5">
					<div className="d-flex flex-column">
						<h1 className="text-white">Quick Links</h1>
						<Link
							to="/privacy"
							className="text-white">
							<span className="me-2">
								<PrivacySVG />
							</span>
							Privacy Policy
						</Link>
						<Link
							to="/feedback"
							className="text-white">
							<span className="me-2">
								<ChatSVG />
							</span>
							Feedback
						</Link>
						<Link
							to="/help"
							className="text-white">
							<span className="me-2">
								<PrivacySVG />
							</span>
							Help
						</Link>
						<Link
							to="/about"
							className="text-white">
							<span className="me-2">
								<PrivacySVG />
							</span>
							About Us
						</Link>
						<Link
							to="/about"
							className="text-white">
							<span className="me-2">
								<PrivacySVG />
							</span>
							Report Problem
						</Link>
					</div>
				</div>
				<div className="col-sm-1"></div>
				<div className="col-sm-3">
					<h1 className="text-white">Contact Us</h1>
					<p></p>
				</div>
			</div>
			<div className="row">
				<center>
					<div
						id="scrollUpBtn"
						onClick={onScroll}>
						<ChevronUpSVG />
					</div>
					<br className="anti-hidden" />
				</center>
			</div>
		</div>
	)
}

export default Footer
