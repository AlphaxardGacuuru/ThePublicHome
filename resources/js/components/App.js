import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { HashRouter, Route } from "react-router-dom"

import TopNav from "@/components/Layouts/TopNav"

import ScrollToTop from "@/components/Core/ScrollToTop"
import Messages from "@/components/Core/Messages"
import LoginPopUp from "@/components/Auth/LoginPopUp"

import Index from "@/pages/index"

import DeathAnnouncementCreate from "@/pages/death-announcement/create"
import DeathAnnouncementShow from "@/pages/death-announcement/[id]"
import DeathAnnouncementEdit from "@/pages/death-announcement/edit/[id]"

import Socialite from "@/components/Auth/Socialite"

const App = () => {
	// Function for checking local storage
	const getLocalStorage = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return []
		}
	}

	// Function for checking local storage
	const getLocalStorageAuth = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return {
				name: "Guest",
				avatar: "/storage/avatars/male-avatar.png",
				accountType: "normal",
				decos: 0,
				posts: 0,
				fans: 0,
			}
		}
	}

	// Function to set local storage
	const setLocalStorage = (state, data) => {
		localStorage.setItem(state, JSON.stringify(data))
	}

	const url = process.env.MIX_APP_URL

	// Declare states
	const [messages, setMessages] = useState([])
	const [errors, setErrors] = useState([])
	const [login, setLogin] = useState(false)
	const [auth, setAuth] = useState(getLocalStorageAuth("auth"))

	const [deathAnnouncements, setDeathAnnouncements] = useState(
		getLocalStorage("deathAnnouncements")
	)

	// Function for fetching data from API
	const get = (endpoint, setState, storage = null, errors = true) => {
		Axios.get(`/api/${endpoint}`)
			.then((res) => {
				var data = res.data ? res.data.data : []
				setState(data)
				storage && setLocalStorage(storage, data)
			})
			.catch(() => errors && setErrors([`Failed to fetch ${endpoint}`]))
	}

	// Function for getting errors from responses
	const getErrors = (err, message = false) => {
		const resErrors = err.response.data.errors
		var newError = []
		for (var resError in resErrors) {
			newError.push(resErrors[resError])
		}
		// Get other errors
		message && newError.push(err.response.data.message)
		setErrors(newError)
	}

	// Fetch data on page load
	useEffect(() => {
		get("auth", setAuth, "auth", false)
	}, [])

	console.log("rendered")

	/*
	 *
	 * Register service worker */
	if (window.location.href.match(/https/)) {
		if ("serviceWorker" in navigator) {
			window.addEventListener("load", () => {
				navigator.serviceWorker.register("/sw.js")
				// .then((reg) => console.log('Service worker registered', reg))
				// .catch((err) => console.log('Service worker not registered', err));
			})
		}
	}

	/*
	 *
	 * PWA Install button */
	let deferredPrompt
	var btnAdd = useRef()
	const [downloadLink, setDownloadLink] = useState()
	const [downloadLinkText, setDownloadLinkText] = useState("")

	// Listen to the install prompt
	window.addEventListener("beforeinstallprompt", (e) => {
		deferredPrompt = e

		// Show the button
		setDownloadLink(true)

		// Action when button is clicked
		btnAdd.current.addEventListener("click", (e) => {
			// Show install banner
			deferredPrompt.prompt()
			// Check if the user accepted
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === "accepted") {
					setDownloadLinkText("User accepted")
				}
				deferredPrompt = null
			})

			window.addEventListener("appinstalled", (evt) => {
				setDownloadLinkText("Installed")
			})
		})
	})

	// All states
	const GLOBAL_STATE = {
		get,
		getErrors,
		getLocalStorage,
		setLocalStorage,
		login,
		setLogin,
		url,
		auth,
		setAuth,
		messages,
		setMessages,
		errors,
		setErrors,

		// State
		deathAnnouncements,
		setDeathAnnouncements,

		// PWA
		btnAdd,
		downloadLink,
		setDownloadLink,
		downloadLinkText,
		setDownloadLinkText,
	}

	const routes = [
		{
			path: "/",
			component: <Index {...GLOBAL_STATE} />,
		},
		{
			path: "/socialite/:message/:token",
			component: <Socialite {...GLOBAL_STATE} />,
		},
		{
			path: "/death-announcement/create",
			component: <DeathAnnouncementCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/death-announcement/show/:id",
			component: <DeathAnnouncementShow {...GLOBAL_STATE} />,
		},
		{
			path: "/death-announcement/edit/:id",
			component: <DeathAnnouncementEdit {...GLOBAL_STATE} />,
		},
	]

	return (
		<HashRouter>
			<ScrollToTop />

			<TopNav {...GLOBAL_STATE} />

			{routes.map((route, key) => (
				<Route
					key={key}
					path={route.path}
					exact
					render={() => route.component}
				/>
			))}

			<LoginPopUp {...GLOBAL_STATE} />
			<Messages {...GLOBAL_STATE} />

			{/* Install button */}
			<button
				ref={btnAdd}
				style={{ display: "none" }}>
				test
			</button>
		</HashRouter>
	)
}

export default App

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"))
}
