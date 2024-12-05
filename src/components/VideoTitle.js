import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="absolute bottom-20 left-10 text-white max-w-lg">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-md">{title}</h1>
            <p className="text-lg font-light text-gray-300 drop-shadow-md">{overview}</p>
            <button className="px-6 py-2 bg-red-600 text-white text-lg font-semibold rounded hover:bg-red-700 transition mt-3">
                Play Now
            </button>
        </div>
    )
}

export default VideoTitle 
