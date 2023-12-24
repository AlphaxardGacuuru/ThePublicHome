import React from "react"

const LoadingClubMedia = () => {
	return (
		<span className="my-2 mx-2 pt-0 px-0 pb-2 card">
			<div className="death-thumbnail">
				<div
					className="gradient"
					style={{
						width: "320em",
						height: "180em",
					}}></div>
			</div>
			<div className="d-flex">
				{/* User info */}
				<div
					className="d-flex p-1"
					style={{ maxWidth: "220em" }}>
					{/* Avatar */}
					<div
						className="py-2"
						style={{ minWidth: "40px" }}>
						<div
							className="gradient rounded-circle"
							style={{ width: "3em", height: "3em" }}></div>
					</div>
				</div>
				{/* Avatar End */}
				{/* Service Provider Name */}
				<div className="flex-grow-1 p-1">
					<h6 className="gradient loading-text service-provider-name mt-3"></h6>
				</div>
				{/* Service Provider Name End */}
			</div>
			{/* User info End */}
			<center>
				<h2 className="gradient loading-text death-name"></h2>
				<h6 className="gradient loading-text service-provider-name"></h6>
			</center>
		</span>
	)
}

export default LoadingClubMedia
