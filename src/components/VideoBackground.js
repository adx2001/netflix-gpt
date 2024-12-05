import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
    const trailerVideo = useSelector((store) => store.movies.trailerVideo);
    useMovieTrailer(movieId);

    return (
        <div className="w-full h-screen overflow-hidden relative">
            {/* Video Embed */}
            <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                    overflow: 'hidden', // Ensure anything outside bounds is cropped
                    zIndex: -1, // Ensure the video stays behind the content
                }}
            >
                <iframe
                    className="absolute top-0 left-0 w-full h-full "
                    src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&loop=1&playlist=${trailerVideo?.key}&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&showinfo=0`}
                    title="Background Video"
                    allow="autoplay"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}

                ></iframe>
            </div>
        </div>
    );
};

export default VideoBackground;
