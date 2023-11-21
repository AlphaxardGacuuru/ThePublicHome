import React from "react"

const membership = () => {
	return (
		<div className="container-fluid">
			{/* Background Image */}
			<div
				className="row"
				style={{
					height: "50vh",
					backgroundImage: 'url("/storage/death-announcement-posters/1.jpg")',
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}>
				{/* Cards */}
				<div className="col-12 d-flex align-items-center justify-content-center">
					<div
						className="card text-white bg-secondary mb-3"
						style={{ maxWidth: "25rem" }}>
						<div className="card-header">Standard</div>
						<div className="card-body">
							<h5 className="card-title">Card Title</h5>
							<ul
								className="card-text"
								style={{ listStyleType: "none" }}>
								<li>Candidate 2 photos + 1 page = $1</li>
								<li>Graduation 5 photos + 1 page = $5</li>
								<li>Wedding 10 photos + 1 page = $10</li>
								<li>Aniversary 10 photos + 1 page = $10</li>
								<li>Celebration 10 photos + 1 page = $10</li>
							</ul>
						</div>
					</div>

					<div
						className="card text-white bg-primary mb-3 mx-3"
						style={{ maxWidth: "25rem" }}>
						<div className="card-header">VIP</div>
						<div className="card-body">
							<h5 className="card-title">Card Title</h5>
							<ul
								className="card-text"
								style={{ listStyleType: "none" }}>
								<li>Candidate 10 photos + 2 pages = $30</li>
								<li>Graduation 20 photos + 4 pages = $40</li>
								<li>Wedding 50 photos + 4 pages = $50</li>
								<li>Aniversary 50 photos + 4 pages = $50</li>
								<li>Celebration 50 photos + 4 pages = $50</li>
							</ul>
						</div>
					</div>

					<div
						className="card text-white bg-success mb-3"
						style={{ maxWidth: "25rem" }}>
						<div className="card-header">Executive</div>
						<div className="card-body">
							<h5 className="card-title">Card Title</h5>
							<ul
								className="card-text"
								style={{ listStyleType: "none" }}>
								<li>Candidate no limit = $80</li>
								<li>Graduation no limit = $90</li>
								<li>Wedding no limit = $100</li>
								<li>Aniversary no limite = $100</li>
								<li>Celebration no limite = $100</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Membership Info */}
			<div className="row mt-5">
				<div className="col-12">
					<h2>Membership Information</h2>
					{/* Add your membership information content here */}
				</div>
			</div>
		</div>
	)
}

export default membership
