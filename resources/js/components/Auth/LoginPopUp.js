import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import CryptoJS from "crypto-js"
// import Axios from "axios"
// import { useAuth } from "@/hooks/auth";

import Btn from "@/components/Core/Btn"

import CloseSVG from "@/svgs/CloseSVG"

import { GoogleLoginButton } from "react-social-login-buttons"

const LoginPopUp = (props) => {
	const history = useHistory()
	const location = useLocation()

	// const [name, setName] = useState('Alphaxard Gacuuru')
	const [email, setEmail] = useState("alphaxardgacuuru47@gmail.com")
	// const [password, setPassword] = useState('0700364446')
	const [password, setPassword] = useState("0700000000")
	const [status, setStatus] = useState()
	const [errors, setErrors] = useState([])
	const [loading, setLoading] = useState(false)

	const onSocial = (website) => {
		// window.location.href = `${props.url}/api/login/${website}`
	}

	// const [phone, setPhone] = useState('07')
	const [phoneLogin, setPhoneLogin] = useState(false)

	// Encrypt Token
	const encryptedToken = (token) => {
		const secretKey = "ThePublicHomeAuthorizationToken"
		// Encrypt
		return CryptoJS.AES.encrypt(token, secretKey).toString()
	}

	const onSubmit = (e) => {
		setLoading(true)
		e.preventDefault()

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post(`/login`, {
				email: email,
				password: email,
				device_name: "deviceName",
				remember: "checked",
			})
				.then((res) => {
					props.setMessages([res.data.message])
					// Remove loader
					setLoading(false)
					// Hide Login Pop Up
					props.setLogin(false)
					// Encrypt and Save Sanctum Token to Local Storage
					props.setLocalStorage("sanctumToken", encryptedToken(res.data.data))
					// Update Logged in user
					props.get(`auth`, props.setAuth, "auth", false)
					// Reload page
					setTimeout(() => window.location.reload(), 1000)
				})
				.catch((err) => {
					// Remove loader
					setLoading(false)
					props.getErrors(err)
				})

			// setPhone("07")
		})
	}

	return (
		<div className={props.login ? "menu-open" : ""}>
			<div
				className="background-blur"
				style={{ visibility: props.login ? "visible" : "hidden" }}></div>
			<div className="bottomMenu">
				<div className="d-flex align-items-center justify-content-between">
					{/* <!-- Logo Area --> */}
					<div className="logo-area p-2">
						<a href="#">Login</a>
					</div>
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon float-end"
						style={{ fontSize: "1em" }}
						onClick={() => {
							props.setLogin(false)
							// Check location to index
							history.push("/")
						}}>
						<CloseSVG />
					</div>
				</div>
				<div className="p-2">
					{phoneLogin ? (
						<center>
							<div className="mycontact-form">
								<form
									method="POST"
									action=""
									onSubmit={onSubmit}>
									<input
										id="email"
										type="text"
										className="form-control"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required={true}
										autoFocus
									/>
									<br />

									<Btn
										type="submit"
										btnText="Login"
										loading={loading}
									/>
								</form>
								<br />

								<Btn
									btnText="back"
									onClick={() => setPhoneLogin(false)}
								/>
							</div>
						</center>
					) : (
						<>
							<GoogleLoginButton
								className="mt-2 rounded-0"
								onClick={() => onSocial("google")}
							/>
							<br />

							<Btn
								btnText="login with email"
								onClick={() => setPhoneLogin(true)}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default LoginPopUp
