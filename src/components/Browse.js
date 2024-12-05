import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'



const Browse = () => {

  useNowPlayingMovies()



  return (
    <>
      <div>
        <div>
          <Header />
          <MainContainer />
          <SecondaryContainer />
        </div>
      </div>

    </>
  )
}

export default Browse
