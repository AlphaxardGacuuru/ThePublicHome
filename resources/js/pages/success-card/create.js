import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import Axios from "axios"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateSize
)

const create = (props) => {
	// Declare states
	const [locale, setLocale] = useState()
	const [title, setTitle] = useState()
	const [venue, setVenue] = useState("")
	const [successCardDate, setSuccessCardDate] = useState("")
	const [announcement, setAnnouncement] = useState("")
	const [loadingBtn, setLoadingBtn] = useState("")

	// Get history for page location
	const router = useHistory()

	useEffect(() => {
		// Redirect if user has no membership
		if (!props.auth.membershipId) {
			router.push("/profile/membership")
		}
	}, [])

	// Get Word limit for announcement based on user's membership
	var wordLimit = props.auth.membershipFeatures?.announcement

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader and disable button
		setLoadingBtn(true)

		// Check if announcement limit is reached
		if (announcement.length > wordLimit) {
			setLoadingBtn(false)

			return props.setErrors([
				`Announcement cannot be greater than ${wordLimit} words`,
			])
		}

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		Axios.post(`/api/success-cards`, {
			membershipId: props.auth.membershipId,
			locale: locale,
			title: title,
			venue: venue,
			successCardDate: successCardDate,
			announcement: announcement,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove loader for button
				setLoadingBtn(false)
				// Redirect to Show Success Card
				Axios.get("api/auth").then((res2) => {
					// Set Auth
					props.setAuth(res2.data.data)
					// Push to edit page
					router.push(`/success-cards/edit/${res.data.data.id}`)
				})
			})
			.catch((err) => {
				// Remove loader for button
				setLoadingBtn(false)
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<center>
					<h2 className="mb-4">Upload your Success Card Announcement</h2>

					<form
						onSubmit={onSubmit}
						className="mb-5">
						<select
							type="text"
							name="locale"
							className="form-control mb-2"
							placeholder="locale"
							required={true}
							onChange={(e) => setLocale(e.target.value)}>
							<option value="">Choose Locale</option>
							<option value="home">Home</option>
							<option value="international">International</option>
						</select>

						<input
							type="text"
							name="name"
							className="form-control text-secondary mb-2"
							placeholder="Title"
							required={true}
							onChange={(e) => setTitle(e.target.value)}
						/>

						<textarea
							type="text"
							name="description"
							className="form-control mb-2"
							placeholder="Write your success card announcement"
							cols="30"
							rows="5"
							onChange={(e) => setAnnouncement(e.target.value)}
							required={true}></textarea>

						<div className="d-flex justify-content-end py-4">
							<small
								className={`p-1
									${
										announcement.length > wordLimit * 0.8
											? announcement.length <= wordLimit
												? "bg-warning-subtle"
												: "bg-danger-subtle"
											: "bg-secondary-subtle"
									}
								`}>
								Word Count: {announcement.length} /{" "}
								{wordLimit == 1000000 ? "Unlimited" : wordLimit}
							</small>
						</div>

						<Btn
							btnText="create success card announcement"
							loading={loadingBtn}
							disabled={loadingBtn}
						/>
						<br />
						<br />

						<MyLink
							linkTo="/success-cards"
							text="back to success card announcements"
						/>
					</form>
				</center>
			</div>
			<div className="col-sm-2"></div>
		</div>
	)
}

export default create
