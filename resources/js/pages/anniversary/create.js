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
	const [eulogy, setEulogy] = useState()
	const [loadingBtn, setLoadingBtn] = useState()

	// Get history for page location
	const router = useHistory()

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader and disable button
		setLoadingBtn(true)

		// Add form data to FormData object
		const formData = new FormData()
		formData.append("locale", locale)
		formData.append("name", name)
		formData.append("poster", poster)
		formData.append("eulogy", eulogy)

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		Axios.post(`/api/deaths`, formData)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove loader for button
				setLoadingBtn(false)
				// Redirect to Show Death
				setTimeout(() => router.push(`/death/show/${res.data.data.id}`), 500)
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
						{/* Death  Poster */}
						<label>Upload Death Announcement Poster</label>
						<br />

						<div className="row">
							<div className="col-lg-4"></div>
							<div className="col-lg-4 col-sm-12">
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
							<div className="col-lg-4"></div>
						</div>
						<br />
						<br />

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
							className="form-control mb-2"
							placeholder="Name"
							required={true}
							onChange={(e) => setName(e.target.value)}
						/>

						<input
							type="text"
							name="name"
							className="form-control mb-2"
							placeholder="Sunrise"
							required={true}
							onChange={(e) => setName(e.target.value)}
						/>

						<input
							type="text"
							name="name"
							className="form-control mb-2"
							placeholder="Sunset"
							required={true}
							onChange={(e) => setName(e.target.value)}
						/>

						<textarea
							type="text"
							name="description"
							className="form-control"
							placeholder="Say something about your death announcement"
							cols="30"
							rows="5"
							required={true}
							onChange={(e) => setEulogy(e.target.value)}
						/>
						<br />

						{/* Death  Poster */}
						<label>Upload Related Images</label>
						<br />

						<div className="row">
							<div className="col-lg-4"></div>
							<div className="col-lg-4 col-sm-12">
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
							<div className="col-lg-4"></div>
						</div>

						{/* Death  Poster */}
						<label>Upload Eulogy</label>
						<br />
						<div className="row">
							<div className="col-lg-4"></div>
							<div className="col-lg-4 col-sm-12">
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
