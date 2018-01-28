import React from 'react'
import {Segment, Image, Rating, Header} from 'semantic-ui-react'
import youtubeLogo from './../../public/images/youtube-logo.png'
import netflixLogo from './../../public/images/netflix-logo.png'
import googlePlayLogo from './../../public/images/google-play-logo.png'
import PropTypes from 'prop-types'

const MovieDetail = ({movie}) => {
  if (movie) {
    return (
      <Segment style={{width: '80%', backgroundColor: '#03a9f414'}}>
        <h2 style={{marginTop: '0', marginBottom: '0'}}>{movie.title}</h2>
        <p><small> - {movie.tagline}</small></p>
        <h4 style={{marginTop: '0', marginBottom: '0'}}>Genres</h4>
        <p>{movie.genres} </p>
        <h3 style={{marginTop: '0', marginBottom: '0'}}>Overview: </h3>
        <p>{movie.overview}</p>
        <h4 style={{marginTop: '0', marginBottom: '0'}}>Rating</h4>
        <Rating icon='star' rating={Math.round(movie.rating / 2)} maxRating={5} disabled />
        <h4 style={{marginTop: '10px', marginBottom: '0'}}>Production Companies: </h4>
        <p>{movie.production_companies}</p>
        <h4 style={{marginTop: '0', marginBottom: '7px'}}>Available On</h4>
        <p style={{marginBottom: '7px'}}><Image src={youtubeLogo} floated='left' />Youtube</p>
        <p style={{marginBottom: '7px'}}><Image src={netflixLogo} floated='left' />Netflix</p>
        <p style={{marginBottom: '7px'}}><Image src={googlePlayLogo} floated='left' />Google Play</p>
      </Segment>
    )
  } else {
    return (
      <Header as='h3'>No Matching Movie Found!!</Header>
    )
  }
}

MovieDetail.propTyes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    tagline: PropTypes.string,
    overview: PropTypes.string,
    rating: PropTypes.number,
    genres: PropTypes.string,
    production_companies: PropTypes.string
  }).isRequired
}

export default MovieDetail
