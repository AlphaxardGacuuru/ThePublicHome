import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
// import Axios from "axios"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
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

const edit = (props) => {
	// Get history for page location
	const router = useHistory()

	const { id } = useParams()

	// Declare states
	const [anniversary, setAnniversary] = useState({})
	const [locale, setLocale] = useState()
	const [title, setTitle] = useState()
	const [poster, setPoster] = useState("")
	const [venue, setVenue] = useState("")
	const [anniversaryDate, setAnniversaryDate] = useState("")
	const [announcement, setAnnouncement] = useState("")
	const [loadingBtn, setLoadingBtn] = useState()
	const [loadingBtn2, setLoadingBtn2] = useState()

	useEffect(() => props.get(`anniversaries/${id}`, setAnniversary), [])

	const onSubmit = () => {
		// Show loader and disable button
		setLoadingBtn(true)

		// Check if announcement limit is reached
		if (announcement.length > anniversary.wordLimit) {
			return props.setErrors([
				`Announcement cannot be greater than ${anniversary.wordLimit} words`,
			])
		}

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		Axios.post(`/api/anniversaries/${id}`, {
			locale: locale,
			title: title,
			venue: venue,
			anniversaryDate: anniversaryDate,
			announcement: announcement,
			_method: "PUT",
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove loader for button
				setLoadingBtn(false)
				// Reload page
				window.location.reload()
			})
			.catch((err) => {
				// Remove loader for button
				setLoadingBtn(false)
				props.getErrors(err)
			})
	}

	/*
	 * Delete Photos
	 */
	const onDeletePhotos = (photoPath) => {
		Axios.put(`api/anniversaries/${id}`, {
			photo: photoPath,
		})
			.then((res) => {
				// Set Messages
				props.setMessages([res.data.message])
				// Remove photos
				var filteredPhotos = anniversary.photos.filter(
					(photo) => photo != photoPath
				)

				anniversary.photos = filteredPhotos

				setAnniversary(anniversary)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Videos
	 */
	const onDeleteVideos = (videoPath) => {
		Axios.put(`api/anniversaries/${id}`, {
			video: videoPath,
		})
			.then((res) => {
				// Set Messages
				props.setMessages([res.data.message])
				// Remove videos
				var filteredVideos = anniversary.videos.filter(
					(video) => video != videoPath
				)

				anniversary.videos = filteredVideos

				setAnniversary(anniversary)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Anniversary */
	const onDelete = () => {
		// Set Loader
		setLoadingBtn2(true)

		Axios.delete(`api/anniversaries/${id}`)
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
		<div className="mb-5">
			<div className="border rounded m-2 p-2">
				<h2 className="text-center">Edit your Anniversary Announcement</h2>
			</div>

			<div className="row p-0">
				<div className="col-sm-4">
					<div className="text-center border rounded mx-2 my-2 px-2 py-5">
						<h3 className="text-center mb-4">Announcement Details</h3>

						<form>
							<div className="text-center bg-2 my-1 p-1 text-white text-uppercase">
								{anniversary.tier}
							</div>

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
									selected={anniversary.locale == "home"}>
									Home
								</option>
								<option
									value="international"
									selected={anniversary.locale == "international"}>
									International
								</option>
							</select>
							<br />

							<input
								type="text"
								name="title"
								className="form-control text-secondary mb-2"
								placeholder="Title"
								defaultValue={anniversary.title}
								required={true}
								onChange={(e) => setTitle(e.target.value)}
							/>

							<textarea
								type="text"
								name="description"
								className="form-control mb-2"
								placeholder="Announcement"
								defaultValue={anniversary.announcement}
								cols="30"
								rows="5"
								onChange={(e) => setAnnouncement(e.target.value)}
								required={true}></textarea>

							<input
								type="text"
								name="venue"
								className="form-control text-secondary mb-2"
								placeholder="Venue"
								defaultValue={anniversary.venue}
								onChange={(e) => setVenue(e.target.value)}
							/>

							<div className="ms-2 mb-2 d-flex justify-content-start">
								<label htmlFor="">Anniversary Date</label>
							</div>
							<input
								type="date"
								name="name"
								className="form-control text-secondary mb-2"
								defaultValue={anniversary.date}
								onChange={(e) => setAnniversaryDate(e.target.value)}
							/>

							<div className="d-flex justify-content-end py-2">
								<small
									className={`p-1
									${
										announcement.length > anniversary.wordLimit * 0.8
											? announcement.length <= anniversary.wordLimit
												? "bg-warning-subtle"
												: "bg-danger-subtle"
											: "bg-secondary-subtle"
									}
								`}>
									Word Count: {announcement.length} /{" "}
									{anniversary.wordLimit == 1000000
										? "Unlimited"
										: anniversary.wordLimit}
								</small>
							</div>

							{/* Buttons */}
							<div className="row w-75 mx-auto text-center">
								<Btn
									btnClass="mb-2"
									btnText="update anniversary announcement"
									onClick={onSubmit}
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
									delete anniversary announcement
								</button>
								<div
									className="collapse"
									id="collapseExample">
									<div className="text-center mb-2 py-4">
										<h4>
											Are you sure you want to delete the anniversary
											announcement
										</h4>
										<h5>This process is irreversible</h5>
										<br />
										<Btn
											btnText="delete anniversary announcement"
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
									linkTo={`/anniversaries/show/${id}`}
									text="back to anniversary announcement"
								/>
							</div>
							{/* Buttons End */}
						</form>
					</div>
				</div>

				<div className="col-sm-4">
					<div className="text-center border rounded mx-2 my-2 px-2 py-5">
						<h3 className="text-center mb-4">Upload Media</h3>

						<div className="w-100 mb-4 mx-auto text-center">
							<label className="mb-2">
								Upload Anniversary Announcement Poster
							</label>
							<FilePond
								name="filepond-poster"
								labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
								imageCropAspectRatio="16:9"
								acceptedFileTypes={["image/*"]}
								// stylePanelAspectRatio="16:9"
								allowReplace={true}
								allowRevert={true}
								server={{
									url: `/api/filepond`,
									process: {
										url: `/poster/anniversary/${id}`,
										onload: () =>
											props.get(`anniversaries/${id}`, setAnniversary),
										onerror: (err) => console.log(err.response.data),
									},
									revert: {
										url: `/poster/anniversary/${poster.substr(14)}`,
										onload: (res) => {
											props.setMessages([res])
											// Clear Poster
											setPoster("")
										},
									},
								}}
							/>
						</div>

						<div className="w-100 mb-4 mx-auto text-center">
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
										url: `/photos/anniversary/${id}/${anniversary.photoLimit}`,
										onload: () =>
											props.get(`anniversaries/${id}`, setAnniversary),
										onerror: (err) =>
											props.setErrors([JSON.parse(err).message]),
									},
								}}
							/>
						</div>

						{anniversary.videoLimit > 0 && (
							<React.Fragment>
								<div className="w-100 mb-4 mx-auto text-center">
									<label className="mb-2">Upload Related Videos</label>

									<FilePond
										name="filepond-videos"
										// labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
										// imageCropAspectRatio="16:9"
										acceptedFileTypes={["video/*"]}
										allowMultiple={true}
										allowRevert={false}
										allowRemove={false}
										maxTotalFileSize={`${anniversary.videoLimit}MB`}
										server={{
											url: `/api/filepond`,
											process: {
												url: `/videos/anniversary/${id}/${anniversary.videoLimit}`,
												onload: () =>
													props.get(`anniversaries/${id}`, setAnniversary),
												onerror: (err) =>
													props.setErrors([JSON.parse(err).message]),
											},
										}}
									/>
								</div>
							</React.Fragment>
						)}

						<div className="w-100 mb-4 mx-auto text-center">
							<label className="mb-2">Upload Recap</label>

							<FilePond
								name="filepond-recap"
								// labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
								// imageCropAspectRatio="16:9"
								acceptedFileTypes={["video/*"]}
								allowRevert={false}
								allowRemove={false}
								maxTotalFileSize={`${anniversary.videoLimit}MB`}
								server={{
									url: `/api/filepond`,
									process: {
										url: `/recaps/anniversary/${id}`,
										onload: () =>
											props.get(`anniversaries/${id}`, setAnniversary),
										onerror: (err) =>
											props.setErrors([JSON.parse(err).message]),
									},
								}}
							/>
						</div>
					</div>
				</div>

				<div className="col-sm-4">
					<div className="border rounded mx-2 my-2 px-2 py-5">
						<h3 className="text-center mb-4">Media Details</h3>

						{/* Poster */}
						<h5>Poster</h5>
						<div
							className="mb-4 card shadow p-2"
							style={{ width: "16.5em" }}>
							{anniversary.poster != "/storage/" && (
								<Img
									src={anniversary.poster}
									style={{ width: "15em", height: "auto" }}
								/>
							)}
						</div>
						{/* Poster End */}

						{/* List Images */}
						<h5>Photos</h5>
						<div className="d-flex justify-content-start mb-4 p-2 overflow-x-scroll custom-scroll">
							{anniversary.photos?.map((photo, key) => (
								<div
									key={key}
									className="shadow m-1 p-1">
									<div className="text-end">
										<span
											className="text-muted p-1"
											style={{ cursor: "pointer" }}
											onClick={() => onDeletePhotos(photo)}>
											<CloseSVG />
										</span>
									</div>
									<Img
										src={`/storage/${photo}`}
										className="mx-2"
										style={{ width: "8em", height: "auto" }}
									/>
								</div>
							))}
						</div>
						{/* List Images End */}

						{/* List Videos */}
						{anniversary.videoLimit > 0 && (
							<React.Fragment>
								<h5>Videos</h5>
								<div className="d-flex justify-content-start mb-4 p-2 overflow-x-scroll">
									{anniversary.videos?.map((video, key) => (
										<div
											key={key}
											className="shadow m-1 p-1">
											<div className="text-end">
												<span
													className="text-muted p-1"
													style={{ cursor: "pointer" }}
													onClick={() => onDeleteVideos(video)}>
													<CloseSVG />
												</span>
											</div>
											<video
												className="mx-2"
												style={{ width: "20em", height: "auto" }}
												controls>
												<source
													src={`/storage/${video}`}
													// type="video/mp4"
												/>
												Your browser does not support the video tag.
											</video>
										</div>
									))}
								</div>
							</React.Fragment>
						)}
						{/* List Videos End */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default edit
