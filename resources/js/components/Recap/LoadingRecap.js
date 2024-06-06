import React from "react"

const LoadingRecapMedia = () => {
	return (
		<div
			className="m-1 recap-media"
			style={{
				borderRadius: "0px",
				textAlign: "center",
				color: "#232323",
			}}>
			<div
				className="recap-thumbnail gradient"
				style={{ width: "100%", minHeight: "25.6em" }}>
				<div
					className="gradient"
					style={{ width: "1080px", height: "1920px" }}></div>
			</div>
			<div className="d-flex">
				<div className="p-1">
					<div
						className="gradient rounded-circle"
						style={{
							width: "3em",
							height: "3em",
						}}></div>
				</div>
				<div className="p-1 flex-grow-1">
					<h6 className="loading-text announcement-user-name gradient w-75"></h6>
					<h6 className="loading-text announcement-user-name gradient w-50"></h6>
				</div>
			</div>
		</div>
	)
}

export default LoadingRecapMedia
