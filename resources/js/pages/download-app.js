import React from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"
import BackSVG from "@/svgs/BackSVG"
// import PhoneSVG from "../svgs/PhoneSVG"
// import SMSSVG from "../svgs/SMSSVG"
// import WhatsAppSVG from "../svgs/WhatsAppSVG"
// import InstagramSVG from "../svgs/InstagramSVG"

const Download = (props) => {
	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="d-flex justify-content-between mb-1">
					{/* <!-- Back Icon Start --> */}
					<div>
						<Link
							to="/"
							className="fs-1">
							<BackSVG />
						</Link>
					</div>
					{/* <!-- Back Icon End --> */}
				</div>

				<center>
					<h1>Download the App</h1>
					<h3>It's quick and easy</h3>
					<br />
					<br />

					<Img
						src="storage/img/android-chrome-512x512.png"
						width="25%"
						className="rounded-circle"
					/>
					<br />
					<br />
					<br />

					<Btn
						btnText="Download and Install"
						style={{
							display: props.downloadLink ? "inline" : "none",
						}}
						onClick={() => props.btnAdd.current.click()}
					/>
					<br />
					<br />
					<br />
					<br />
				</center>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Download
