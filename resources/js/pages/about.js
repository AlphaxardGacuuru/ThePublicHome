import React, { useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/core/MyLink"

const about = () => {
	useEffect(() => {
		// Slide on page load
		// Get the animated div
		const animatedDiv = document.getElementById("animatedDiv")

		// Add the 'active' class after a short delay (adjust as needed)
		setTimeout(function () {
			animatedDiv.classList.add("active")
		}, 500) // 500 milliseconds delay
	}, [])

	return (
		<div className="row">
			<div className="col-sm-6 m-0 p-0">
				<img
					src="storage/img/about.jpg"
					style={{
						height: "auto",
						maxWidth: "100%",
					}}
					loading="lazy"
					alt="creator"
				/>
			</div>
			<div
				className="col-sm-6 text-center"
				style={{ backgroundColor: "rgb(36, 37, 37)" }}>
				<div className="d-flex justify-content-center my-5 py-5">
					<div
						id="animatedDiv"
						className="p-5 slide-in">
						{/* Top Line */}
						<div
							className="m-3"
							style={{ backgroundColor: "white", height: "1px" }}></div>
						{/* Top Line End */}

						<h2 className="text-white">
							Empowerment through Procurement Excellence
						</h2>
						<p className="text-white">
							We are ordinary people who have encountered hardships in raising
							money for events and occurrences such as death and funerals,
							wedding, graduation, anniversary etc and due to this we have come
							up with a platform that will be available and affordable to all
							people despite their social and economic status. Our platform
							provides affordable rates to all who want to print or make
							announcements according to their respective events.
						</p>
					</div>
				</div>
				<MyLink
					to="/contact"
					text="contact us"
					className="btn sonar-btn white-btn"
				/>
			</div>
		</div>
	)
}

export default about
