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

const DeathCreate = (props) => {
	// Declare states
	const [locale, setLocale] = useState()
	const [name, setName] = useState()
	const [poster, setPoster] = useState("")
	const [sunrise, setSunrise] = useState("")
	const [sunset, setSunset] = useState("")
	const [burialDate, setBurialDate] = useState("")
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

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		Axios.post(`/api/deaths`, {
			membershipId: props.auth.membershipId,
			locale: locale,
			name: name,
			poster: poster,
			sunrise: sunrise,
			sunset: sunset,
			burialDate: burialDate,
			announcement: announcement,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove loader for button
				setLoadingBtn(false)
				// Redirect to Show Death
				setTimeout(() => router.push(`/deaths/edit/${res.data.data.id}`), 500)
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
					<h2 className="mb-4">Upload your Death Announcement</h2>

					<form onSubmit={onSubmit}>
						<div className="w-50 mb-5">
							<label className="mb-2">Upload Death Announcement Poster</label>
							<FilePond
								name="filepond-poster"
								labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
								imageCropAspectRatio="16:9"
								acceptedFileTypes={["image/*"]}
								stylePanelAspectRatio="16:9"
								allowRevert={true}
								server={{
									url: `/api/filepond`,
									process: {
										url: "/death-poster",
										onload: (res) => setPoster(res),
										onerror: (err) => console.log(err.response.data),
									},
									revert: {
										url: `/death-poster/${poster.substr(27)}`,
										onload: (res) => {
											props.setMessages([res])
											// Clear Poster
											setPoster("")
										},
									},
								}}
							/>
						</div>

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
							placeholder="Name"
							required={true}
							onChange={(e) => setName(e.target.value)}
						/>

						<div className="ms-2 mb-2 d-flex justify-content-start">
							<label htmlFor="">Sunrise</label>
						</div>
						<input
							type="date"
							name="sunrise"
							className="form-control text-secondary mb-2"
							placeholder="Sunrise"
							required={true}
							onChange={(e) => setSunrise(e.target.value)}
						/>

						<div className="ms-2 mb-2 d-flex justify-content-start">
							<label htmlFor="">Sunset</label>
						</div>
						<input
							type="date"
							name="sunset"
							className="form-control text-secondary mb-2"
							placeholder="Sunset"
							required={true}
							onChange={(e) => setSunset(e.target.value)}
						/>

						<div className="ms-2 mb-2 d-flex justify-content-start">
							<label htmlFor="">Date of Burial</label>
						</div>
						<input
							type="date"
							name="name"
							className="form-control text-secondary mb-2"
							placeholder="Date of Burial"
							required={true}
							onChange={(e) => setBurialDate(e.target.value)}
						/>

						<textarea
							type="text"
							name="description"
							className="form-control"
							placeholder="Write your death announcement"
							cols="30"
							rows="5"
							onChange={(e) => setAnnouncement(e.target.value)}
							required={true}></textarea>

						<div className="d-flex justify-content-end py-2">
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
							btnText="create death announcement"
							loading={loadingBtn}
							disabled={loadingBtn}
						/>
						<br />
						<br />

						<MyLink
							linkTo="/deaths"
							text="back to death announcements"
						/>
					</form>
				</center>
			</div>
			<div className="col-sm-2"></div>
		</div>
	)
}

export default DeathCreate
