import React from "react"

const LoadingKaraokeMedia = () => {
	return (
		<span className="my-2 mx-2 pt-0 px-0 pb-2 card">
			<div className="death-thumbnail">
				<div
					className="gradient"
					style={{
						width: "24em",
						height: "12em",
					}}></div>
			</div>
			<div className="d-flex justify-content-start">
				{/* User info */}
				<div
					className="d-flex p-1"
					style={{ maxWidth: "220em" }}>
					{/* Avatar */}
					<div style={{ minWidth: "40px" }}>
						<div
							className="gradient rounded-circle"
							style={{ width: "3em", height: "3em" }}></div>
					</div>
					{/* Avatar End */}
					{/* User Name */}
					<h6
						className="gradient loading-text death-user-name mt-2"
						style={{ maxHeight: "1em" }}></h6>
				</div>
				{/* User Name End */}
			</div>
			{/* User info End */}
			{/* Content */}
			<div className="d-flex justify-content-start flex-column">
				<h2
					className="gradient loading-text death-name"
					style={{ maxWidth: "11em" }}></h2>
				<h6 className="gradient loading-text death-user-name"></h6>
				<h6 className="gradient loading-text death-user-name"></h6>
				<h6 className="gradient loading-text death-user-name"></h6>
				<h6 className="gradient loading-text death-user-name"></h6>
				<h2
					className="gradient loading-text death-name"
					style={{ maxWidth: "11em" }}></h2>
			</div>
			{/* Content End */}
		</span>
	)
}

export default LoadingKaraokeMedia