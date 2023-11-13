import React, { useState, useEffect } from "react"
// import Axios from "axios"
import { Link } from "react-router-dom"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"

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
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform
)

const ProfileEdit = (props) => {
	// Declare states
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const [btnLoading, setBtnLoading] = useState()

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader for button
		setBtnLoading(true)

		const formData = new FormData()

		// Add form data to FormData object
		name && formData.append("name", name)
		phone && formData.append("phone", phone)
		formData.append("_method", "put")

		// Send data to UsersController
		Axios.post(`/api/users/${props.auth?.id}`, formData)
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Auth
				props.get("auth", props.setAuth, "auth")
				setName("")
				setPhone("")
				setBio("")
				setBtnLoading(false)
			})
			.catch((err) => {
				// Remove loader for button
				setBtnLoading(false)
				props.getErrors(err)
			})
	}

	return (
		<div className="row px-4">
			<div className="col-sm-12">
				<div className="form-group">
					<center>
						<h1>EDIT PROFILE</h1>
						<br />
						<label htmlFor="">Profile Pic</label>
						<div className="avatar-container mb-4">
							<FilePond
								name="filepond-avatar"
								labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
								stylePanelLayout="compact circle"
								imageCropAspectRatio="1:1"
								acceptedFileTypes={["image/*"]}
								stylePanelAspectRatio="1:1"
								allowRevert={false}
								server={{
									url: `/api/filepond`,
									process: {
										url: `/avatar/${props.auth?.id}`,
										onload: (res) => {
											props.setMessages([JSON.parse(res).message])
											// Update Auth
											props.get("auth", props.setAuth, "auth")
										},
										onerror: (err) => console.log(err.response),
									},
								}}
							/>
						</div>

						<form onSubmit={onSubmit}>
							{/* Name */}
							<label
								htmlFor=""
								className="float-start">
								Name
							</label>
							<input
								type="text"
								name="name"
								className="form-control"
								placeholder={props.auth?.name}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							{/* Name End */}

							<br />

							{/* Phone */}
							<label
								htmlFor=""
								className="float-start">
								Phone
							</label>
							<input
								type="tel"
								name="phone"
								className="form-control"
								placeholder={props.auth?.phone}
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
							{/* Phone End */}

							<br />

							<Btn
								type="submit"
								btnText="save changes"
								loading={btnLoading}
							/>

							<br />
							<br />

							<MyLink
								linkTo={`/profile/show/${props.auth.id}`}
								text="back to profile"
							/>
						</form>

						<br />
						<br />
						<br />
					</center>
				</div>
			</div>
		</div>
	)
}

export default ProfileEdit
