import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

const ProfileShow = (props) => {
	let { id } = useParams()

	const [user, setUser] = useState({})
	const [pageLoader, setPageLoader] = useState(true)

	useEffect(() => {
		Axios.get(`api/users/${props.auth.id}`)
			.then((res) => {
				// Remove loader
				setPageLoader(false)
				setUser(res.data.data)
			})
			.catch((err) => props.getErrors(err))

		/* Fetch every time id changes, 
			fix for clicking profile link when viewing another user's profile */
	}, [id])

	return (
		<div className="row">
			{/* Page Loader */}
			{pageLoader && (
				<div
					id="preloader"
					style={{ top: 60 }}>
					<div className="preload-content mb-3">
						<div
							className="spinner-grow text-primary"
							style={{ width: "10em", height: "10em" }}></div>
					</div>
				</div>
			)}
			{/* Page Loader End */}

			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<center>
					{/* Profile Area */}
					<div
						className="avatar-thumbnail mt-4"
						style={{ borderRadius: "50%" }}>
						<Link to={"/profile/show/" + user.id}>
							<Img
								src={user.avatar}
								width="150px"
								height="150px"
							/>
						</Link>
					</div>

					<br />

					<h1>{user.name}</h1>
					<h2>{user.email}</h2>
					<h3>{user.phone}</h3>

					{/* Show edit button */}
					{user.id == props.auth?.id && (
						<React.Fragment>
							<hr className="w-50 mx-auto" />

							{/* Edit button */}
							<MyLink
								linkTo="/profile/edit"
								text="edit profile"
							/>
							{/* Edit button End */}
							{/* End of Profile Area */}
						</React.Fragment>
					)}

					<hr className="w-50 mx-auto" />
				</center>
			</div>
			<div className="col-sm-2"></div>
		</div>
	)
}

export default ProfileShow
