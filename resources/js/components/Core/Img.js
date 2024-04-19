import React from "react"

const Img = ({ src, width, height, className, style, alt }) => {
	return (
		<img
			src={src == "/storage/" ? "/storage/img/android-chrome-512x512.png" : src}
			width={width}
			height={height}
			className={className}
			style={style}
			alt={alt}
			loading="lazy"
		/>
	)
}

Img.defaultProps = {
	src: "/storage/img/android-chrome-512x512.png",
	alt: "image",
}

export default Img
