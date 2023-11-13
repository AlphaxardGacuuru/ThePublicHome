import React from "react"

import Btn from "@/components/Core/Btn"

const membership = (props) => {
	return (
		<div className="row">
			<div className="col-sm-12">
				<div className="d-flex flex-wrap">
					{/* Standard */}
					<div className="card">
						<div className="card-header">Standard</div>
						<div className="card-body">
							<ul>
								<li>Candidate 2 photos + 1 page = $1</li>
								<li>Graduation 5 photos + 1 page = $5</li>
								<li>Wedding 10 photos + 1 page = $10</li>
								<li>Aniversary 10 photos + 1 page = $10</li>
								<li>Celebration 10 photos + 1 page = $10</li>
							</ul>
						</div>
						<div className="card-footer">
							<Btn btnText="get" />
						</div>
					</div>
					{/* Standard End */}
					{/* VIP */}
					<div className="card">
						<div className="card-header">VIP</div>
						<div className="card-body">
							<ul>
								<li>Candidate 10 photos + 2 pages = $30</li>
								<li>Graduation 20 photos + 4 pages = $40</li>
								<li>Wedding 50 photos + 4 pages = $50</li>
								<li>Aniversary 50 photos + 4 pages = $50</li>
								<li>Celebration 50 photos + 4 pages = $50</li>
							</ul>
						</div>
						<div className="card-footer">
							<Btn btnText="get" />
						</div>
					</div>
					{/* VIP End */}
					{/* Executive */}
					<div className="card">
						<div className="card-header">Executive</div>
						<div className="card-body">
							<ul>
								<li>Candidate no limit = $80</li>
								<li>Graduation no limit = $90</li>
								<li>Wedding no limit = $100</li>
								<li>Aniversary no limite = $100</li>
								<li>Celebration no limite = $100</li>
							</ul>
						</div>
						<div className="card-footer">
							<Btn btnText="get" />
						</div>
					</div>
					{/* Executive End */}
				</div>
			</div>
		</div>
	)
}

export default membership
