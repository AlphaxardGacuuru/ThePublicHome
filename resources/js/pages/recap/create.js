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
			sunrise: sunrise,
			sunset: sunset,
			burialDate: burialDate,
			announcement: announcement,
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove loader for button
				setLoadingBtn(false)
				// Redirect to Show Recap
				Axios.get("api/auth").then((res2) => {
					// Set Auth
					props.setAuth(res2.data.data)
					// Push to edit page
					router.push(`/deaths/edit/${res.data.data.id}`)
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
						maxTotalFileSize="100MB"
						server={{
							url: `/api/filepond`,
							process: {
								url: `/videos/death/${id}/${death.videoLimit}`,
								onload: () => props.get(`deaths/${id}`, setDeath),
								onerror: (err) => props.setErrors([JSON.parse(err).message]),
							},
						}}
					/>
				</div>
			</div>
			<div className="col-sm-2"></div>
		</div>
	)
}

export default DeathCreate
