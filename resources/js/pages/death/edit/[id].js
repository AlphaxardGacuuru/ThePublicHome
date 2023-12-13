import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
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

const DeathEdit = (props) => {
	// Get history for page location
	const router = useHistory()

	const { id } = useParams()

	// Declare states
	const [death, setDeath] = useState({})
	const [locale, setLocale] = useState()
	const [name, setName] = useState()
	const [poster, setPoster] = useState("")
	const [sunrise, setSunrise] = useState("")
	const [sunset, setSunset] = useState("")
	const [burialDate, setBurialDate] = useState("")
	const [announcement, setAnnouncement] = useState("")
	const [eulogy, setEulogy] = useState("")
	const [loadingBtn, setLoadingBtn] = useState()
	const [loadingBtn2, setLoadingBtn2] = useState()

	useEffect(() => props.get(`deaths/${id}`, setDeath), [])

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader and disable button
		setLoadingBtn(true)

		// Check if announcement limit is reached
		if (announcement.length > death.wordLimit) {
			return props.setErrors([
				`Announcement cannot be greater than ${death.wordLimit} words`,
			])
		}

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		Axios.post(`/api/deaths/${id}`, {
			locale: locale,
			name: name,
			poster: poster,
			sunrise: sunrise,
			sunset: sunset,
			burialDate: burialDate,
			announcement: announcement,
			_method: "PUT",
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove loader for button
				setLoadingBtn(false)
			})
			.catch((err) => {
				// Remove loader for button
				setLoadingBtn(false)
				props.getErrors(err)
			})
	}

	/*
	 * Delete Club */
	const onDelete = () => {
		// Set Loader
		setLoadingBtn2(true)

		Axios.delete(`api/deaths/${id}`)
			.then((res) => {
				// Remove loader
				setLoadingBtn2(false)
				props.setMessages([res.data.message])
				// Redirect to parties
				setTimeout(() => router.push("/"), 500)
			})
			.catch((err) => {
				// Remove loader
				setLoadingBtn2(false)
				props.getErrors(err)
			})
	}

	return (
		<div>
			<center>
				<h2 className="my-4">Upload your Death Announcement</h2>
			</center>

			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-5">
					<center>
						<form>
							<select
								type="text"
								name="locale"
								className="form-control mt-4"
								placeholder="locale"
								required={true}
								onChange={(e) => setLocale(e.target.value)}>
								<option value="">Choose Locale</option>
								<option
									value="home"
									selected={death.locale == "home"}>
									Home
								</option>
								<option
									value="international"
									selected={death.locale == "international"}>
									International
								</option>
							</select>
							<br />

							<input
								type="text"
								name="name"
								className="form-control text-secondary mb-2"
								placeholder={death.name}
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
								value={death.sunrise}
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
								value={death.sunset}
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
								value={death.burialDate}
								required={true}
								onChange={(e) => setBurialDate(e.target.value)}
							/>

							<textarea
								type="text"
								name="description"
								className="form-control"
								placeholder={death.announcement}
								cols="30"
								rows="5"
								onChange={(e) => setAnnouncement(e.target.value)}
								required={true}></textarea>

							<div className="d-flex justify-content-end py-2">
								<small
									className={`p-1
									${
										announcement.length > death.wordLimit * 0.8
											? announcement.length <= death.wordLimit
												? "bg-warning-subtle"
												: "bg-danger-subtle"
											: "bg-secondary-subtle"
									}
								`}>
									Word Count: {announcement.length} /{" "}
									{death.wordLimit == 1000000 ? "Unlimited" : death.wordLimit}
								</small>
							</div>
						</form>
					</center>
				</div>

				<div className="col-sm-6">
					<div className="w-75 mb-4 mx-auto text-center">
						<label className="mb-2">Upload Death Announcement Poster</label>
						<FilePond
							name="filepond-poster"
							labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
							imageCropAspectRatio="16:9"
							acceptedFileTypes={["image/*"]}
							// stylePanelAspectRatio="16:9"
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

					<div className="w-75 mb-4 mx-auto text-center">
						<label className="mb-2">Upload Related Photos</label>

						<FilePond
							name="filepond-photos"
							// labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
							// imageCropAspectRatio="16:9"
							acceptedFileTypes={["image/*"]}
							allowMultiple={true}
							allowRevert={false}
							allowRemove={false}
							server={{
								url: `/api/filepond`,
								process: {
									url: `/death-photos/${id}/${death.photoLimit}`,
									onload: (res) => props.setMessages([JSON.parse(err).message]),
									onerror: (err) => props.setErrors([JSON.parse(err).message]),
								},
							}}
						/>
					</div>

					<div className="w-75 mb-4 mx-auto text-center">
						<label className="mb-2">Upload Related Videos</label>

						<FilePond
							name="filepond-videos"
							// labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
							// imageCropAspectRatio="16:9"
							acceptedFileTypes={["video/*"]}
							allowMultiple={true}
							allowRevert={false}
							allowRemove={false}
							maxTotalFileSize={`${death.videoLimit}MB`}
							server={{
								url: `/api/filepond`,
								process: {
									url: `/death-videos/${id}/${death.videoLimit}`,
									onload: (res) => props.setMessages([JSON.parse(err).message]),
									onerror: (err) => props.setErrors([JSON.parse(err).message]),
								},
							}}
						/>
					</div>

					<div className="w-75 mb-4 mx-auto text-center">
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
				<div className="col-sm-1"></div>
			</div>

			{/* Buttons */}
			<div className="row w-75 mx-auto text-center">
				<Btn
					btnClass="mb-2"
					btnText="update death announcement"
					onSubmit={onSubmit}
					loading={loadingBtn}
					disabled={loadingBtn}
				/>

				{/* Collapse */}
				<button
					className="btn text-uppercase rounded-0 mb-2"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#collapseExample"
					aria-expanded="false"
					aria-controls="collapseExample">
					delete death announcement
				</button>
				<div
					className="collapse"
					id="collapseExample">
					<div className="text-center mb-2 py-4">
						<h4>Are you sure you want to delete the death announcement</h4>
						<h3>This process is irreversible</h3>
						<br />
						<Btn
							btnClass="btn-outline-danger text-white rounded-0"
							btnText="delete death announcement"
							loading={loadingBtn2}
							disabled={loadingBtn2}
							onClick={(e) => {
								e.preventDefault()
								onDelete()
							}}
						/>
					</div>
				</div>
				{/* Collapse End */}

				<MyLink
					linkTo={`/deaths/show/${id}`}
					text="back to death announcement"
				/>
			</div>
			{/* Buttons End */}
		</div>
	)
}

export default DeathEdit
