import { NOW_PLAYING_MOVIES_API, GET_OPTIONS } from '../utils/api'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'

const useNowPlayingMovies = () => {

    const dispatch = useDispatch()

    const getNowPlayingMovies = async () => {
        try {
            const response = await axios.get(NOW_PLAYING_MOVIES_API, GET_OPTIONS)
            const data = response.data.results
            dispatch(addNowPlayingMovies(data))


        } catch (error) {
            console.log("🚀 ~ getNowPlayingMovies ~ error:", error)
            throw error
        }

    }
    useEffect(() => {
        getNowPlayingMovies()
    }, []);

}

export default useNowPlayingMovies
