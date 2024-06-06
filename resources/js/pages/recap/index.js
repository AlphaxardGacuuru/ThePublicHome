import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import Recap from "@/components/Recap/Recap"
import LoadingRecap from "@/components/Recap/LoadingRecap"

import PlusSVG from "@/svgs/PlusSVG"

const index = (props) => {
	const [locale, setLocale] = useState("")
	const [page, setPage] = useState(5)

	// Set Ref to reference the Intersection Observer
	const observerRef = useRef(null)

	const fetchRecaps = () => {
		props.getPaginated(`recaps?locale=${locale}`, props.setRecaps, `recaps`)
	}

	/*
	 * Fetch Recaps on load and on every search
	 */
	useEffect(() => fetchRecaps(), [locale])

	/*
	 * Fetch Recaps when nth element is in view
	 */
	const fetchNextRecaps = () => {
		Axios.get(`${props.recaps.links.next}&locale=${locale}`)
			.then((res) => {
				props.setRecaps({
					data: [...props.recaps.data, ...res.data.data],
					links: res.data.links,
					meta: res.data.meta,
				})
			})
			.catch((err) => {
				// Set Errors
				// props.setErrors([`Failed to fetch recaps`])
			})
	}

	/*
	 * Intersection Observer API Callback function */
	let callback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Disconnect Previous Intersection Observer
				observerRef.current.disconnect()
				// Increment page
				setPage(page + 5)

				requestIdleCallback(fetchNextRecaps)
			}
		})
	}

	useEffect(() => {
		/*
		 * Intersection Observer API
		 * Fetch on every change of the state page
		 */
		observerRef.current = new IntersectionObserver(callback, {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		})

		const mediaItem = document.getElementById(`media${page}`)

		if (mediaItem) {
			observerRef.current.observe(mediaItem)
		}
	}, [page])

	/*
	 * Delete Recap
	 */
	const onDelete = (id) => {
		Axios.delete(`/api/recaps/${id}`)
			.then((res) => {
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				props.getErrors(err)
			})
	}

	const activeLocale = (current) => {
		if (locale == current) {
			return "active"
		}
	}

	const dummyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	return (
		<div className="row p-0">
			<div className="col-sm-1"></div>
			<div className="col-sm-10 p-0">
				<center>
					<h1>Recaps</h1>

					{/* Locales */}
					<div className="d-flex justify-content-center flex-wrap mb-2">
						<div
							className={`${activeLocale("")} px-4 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("")}>
							All
						</div>
						<div
							className={`${activeLocale("home")} px-4 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("home")}>
							Home
						</div>
						<div
							className={`${activeLocale("international")} px-4 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("international")}>
							International
						</div>
					</div>
					{/* Locales End */}

					{/* Recaps */}
					<div className="d-flex flex-wrap justify-content-center my-2">
						{/* Loading Recap items */}
						{dummyArray
							.filter(() => props.recaps.length < 1)
							.map((item, key) => (
								<LoadingRecap key={key} />
							))}

						{/* Real Recap items */}
						{props.recaps.data?.map((recap, key) => (
							<Recap
								{...props}
								key={key}
								index={key}
								recap={recap}
								onDelete={onDelete}
							/>
						))}
					</div>
					{/* Recaps End */}
				</center>
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

export default index
