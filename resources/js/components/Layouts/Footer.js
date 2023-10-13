import React from "react"
import { Link, useLocation } from "react-router-dom"

import Img from "@/components/Core/Img"
import PrivacySVG from "@/svgs/PrivacySVG"
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
		location.pathname.match("/admin") ||
		location.pathname.match("/profile")
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
						The Public Home Entertainment is a premium, exclusive service
						specializing in curating the ultimate VIP party experiences. We
						pride ourselves in the ability to create unforgettable memories for
						our members, ensuring they not only attend the best events, but also
						receive unparalleled service and discounts. Our services are
						tailored to meet the unique needs and tastes of our clientele,
						making each party experience uniquely personal.
					</p>
				</div>
				<div className="col-sm-1"></div>
				<div className="col-sm-3 mb-5">
					<h1 className="text-white">Quick Links</h1>
					{/* Privacy Policy */}
					<Link
						to="/privacy"
						className="text-white">
						<span className="me-2">
							<PrivacySVG />
						</span>
						Privacy Policy
					</Link>
					{/* Privacy Policy End */}
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
