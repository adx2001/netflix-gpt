import axios from 'axios'
import { useEffect } from 'react'
import { GET_OPTIONS } from '../utils/api'
import { useDispatch } from 'react-redux'
import { addTrailerVideo } from '../utils/moviesSlice'

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()
    //fetch movie teaser by movieId
    const getMovieTrailer = async () => {
        try {
            const dynamicURL = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`
            const response = await axios.get(dynamicURL, GET_OPTIONS)
            const data = response.data
            let filterData = data?.results.filter(video => video?.type === "Trailer")
            const trailer = filterData.length ? filterData[0] : data.results[0]
            dispatch(addTrailerVideo(trailer))
        } catch (error) {
            console.error("🚀 ~ getMovieTrailer ~ error:", error)
            throw error
        }
    }
    useEffect(() => {
        getMovieTrailer()
    }, [])

}

export default useMovieTrailer
