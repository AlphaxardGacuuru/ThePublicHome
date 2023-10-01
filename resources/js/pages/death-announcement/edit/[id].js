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

const DeathAnnouncementEdit = (props) => {
	// Get history for page location
	const router = useHistory()

	const { id } = useParams()

	// Declare states
	const [deathAnnouncement, setDeathAnnouncement] = useState({})
	const [name, setName] = useState()
	const [poster, setPoster] = useState("")
	const [eulogy, setEulogy] = useState()
	const [loadingBtn, setLoadingBtn] = useState()
	const [loadingBtn2, setLoadingBtn2] = useState()

	useEffect(
		() => props.get(`death-announcements/${id}`, setDeathAnnouncement),
		[]
	)

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader and disable button
		setLoadingBtn(true)

		// Add form data to FormData object
		const formData = new FormData()
		name && formData.append("name", name)
		poster && formData.append("poster", poster)
		eulogy && formData.append("eulogy", eulogy)
		formData.append("_method", "PUT")

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		Axios.post(`/api/death-announcements/${id}`, formData)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove loader for button
				setLoadingBtn(false)
				// Redirect to Show Death Announcement
				setTimeout(
					() => router.push(`/death-announcement/show/${res.data.data.id}`),
					500
				)
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

		Axios.delete(`api/death-announcements/${id}`)
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
		<div className="row">
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<center>
					<h2>Upload your Death Announcement</h2>

					<br />

					<form onSubmit={onSubmit}>
						{/* Death Announcement Poster */}
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
											url: "/death-announcement-poster",
											onload: (res) => setPoster(res),
											onerror: (err) => console.log(err.response.data),
										},
										revert: {
											url: `/death-announcement-poster/${poster.substr(27)}`,
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

						<input
							type="text"
							name="name"
							className="form-control"
							placeholder={deathAnnouncement.name}
							onChange={(e) => setName(e.target.value)}
						/>
						<br />

						<textarea
							type="text"
							name="description"
							className="form-control"
							placeholder={deathAnnouncement.eulogy}
							cols="30"
							rows="5"
							onChange={(e) => setEulogy(e.target.value)}
						/>
						<br />

						<Btn
							btnText="update death announcement"
							loading={loadingBtn}
							disabled={loadingBtn}
						/>
						<br />
						<br />

						{/* Collapse */}
						<button
							className="btn btn-outline-danger rounded-pill text-uppercase"
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
							<div className="">
								<br />
								<h4>Are you sure you want to delete the death announcement</h4>
								<h3>This process is irreversible</h3>
								<br />
								<Btn
									btnClass="btn-danger rounded-pill text-white"
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
						<br />
						<br />

						<MyLink
							linkTo={`/death-announcement/show/${id}`}
							text="back to death announcement"
						/>
					</form>
				</center>
			</div>
			<div className="col-sm-2"></div>
		</div>
	)
}

export default DeathAnnouncementEdit
