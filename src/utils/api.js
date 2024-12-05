

export const GET_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.REACT_APP_BEARER_TOKEN
  }
}

export const NOW_PLAYING_MOVIES_API = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'

export const MOVIE_TRAILER_API = 'https://api.themoviedb.org/3/movie/1241982/videos?language=en-US'


