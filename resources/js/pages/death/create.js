import React, { useState } from "react"
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
	const [images, setImages] = useState("")
	const [eulogy, setEulogy] = useState("")
	const [loadingBtn, setLoadingBtn] = useState("")

	// Get history for page location
	const router = useHistory()

	// Set Word and Page limit
	switch (props.auth.membership) {
		case "standard":
			var wordLimit = 100
			var pageLimit = 2
			break

		case "vip":
			var wordLimit = 200
			var pageLimit = 5
			break

		default:
			var wordLimit = 500
			var pageLimit = 10
			break
	}

	const onSubmit = (e) => {
		e.preventDefault()

		// Check if announcement limit is set
		if (announcement.length > wordLimit) {
			return props.setErrors([
				`Announcement cannot be greater than ${wordLimit} words`,
			])
		}

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
			images: images,
			eulogy: eulogy,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove loader for button
				setLoadingBtn(false)
				// Redirect to Show Death
				setTimeout(() => router.push(`/deaths/show/${res.data.data.id}`), 500)
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
					<h2>Upload your Death Announcement</h2>

					<br />

					<form onSubmit={onSubmit}>
						<select
							type="text"
							name="locale"
							className="form-control"
							placeholder="locale"
							required={true}
							onChange={(e) => setLocale(e.target.value)}>
							<option value="">Choose Locale</option>
							<option value="home">Home</option>
							<option value="international">International</option>
						</select>
						<br />

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
							name="name"
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
							name="name"
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
						<div className="d-flex justify-content-end p-2">
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
								Word Count: {announcement.length} / {wordLimit}
							</small>
						</div>
						<br />

						<div className="row">
							<div className="col-lg-4">
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
							<div className="col-lg-4">
								<label className="mb-2">Upload Related Images</label>

								<div>
									<FilePond
										name="filepond-images"
										// labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
										// imageCropAspectRatio="16:9"
										acceptedFileTypes={["image/*"]}
										allowMultiple={true}
										allowRevert={false}
										allowRemove={false}
										server={{
											url: `/api/filepond`,
											process: {
												url: "/death-images",
												onload: (res) => setImages([...images, res]),
												onerror: (err) => console.log(err.response.data),
											},
										}}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<label className="mb-2">Upload Eulogy</label>

								<FilePond
									name="filepond-eulogy"
									labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
									// imageCropAspectRatio="16:9"
									// acceptedFileTypes={[".doc, .docx, .pdf"]}
									// stylePanelAspectRatio="16:9"
									allowRevert={true}
									server={{
										url: `/api/filepond`,
										process: {
											url: "/eulogy",
											onload: (res) => setEulogy(res),
											onerror: (err) => console.log(err.response.data),
										},
										revert: {
											url: `/eulogy/${eulogy.substr(27)}`,
											onload: (res) => {
												props.setMessages([res])
												// Clear Poster
												setEulogy("")
											},
										},
									}}
								/>
							</div>
						</div>
						<br />
						<br />

						<Btn
							btnStyle={{ zIndex: "10000" }}
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
