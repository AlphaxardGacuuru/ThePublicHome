import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import CryptoJS from "crypto-js"

const Socialite = (props) => {
	let { message, token } = useParams()

	useEffect(() => {
		props.setMessages([message])

		// Encrypt Token
		const encryptedToken = (token) => {
			const secretKey = "ThePublicHomeAuthorizationToken"
			// Encrypt
			return CryptoJS.AES.encrypt(token, secretKey).toString()
		}

		// Encrypt and Save Sanctum Token to Local Storage
		props.setLocalStorage("sanctumToken", encryptedToken(token))

		// Redirect to index page
		window.location.href = "/"
	}, [])

	return (
		<div
			id="preloader"
			style={{ top: "0" }}>
			<center className="p-5">
				<h1 className="mb-5">Welcome to The Public Home</h1>
				<div
					className="spinner-border text-primary my-auto"
					style={{ width: "5em", height: "5em" }}></div>
				<div className="mt-5">Redirecting...</div>
			</center>
		</div>
	)
}

export default Socialite
