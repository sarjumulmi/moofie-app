import React from 'react'
import {Segment} from 'semantic-ui-react'

const MovieDetail = ({movie}) => (
  <Segment style={{width: '70%', backgroundColor: '#03a9f414'}}>
    <h2 style={{marginTop: '0', marginBottom: '0'}}>{movie.title}</h2>
    <p><small> - {movie.tagline}</small></p>
    <h3 style={{marginTop: '0', marginBottom: '0'}}>Overview: </h3>
    <p>{movie.overview}</p>
    <h4 style={{marginTop: '0', marginBottom: '0'}}>Rating</h4>
    <p>{movie.rating}/10.0</p>
    <h4 style={{marginTop: '0', marginBottom: '0'}}>Production Companies: </h4>
    <p>{movie.production_companies}</p>
  </Segment>
)

export default MovieDetail
