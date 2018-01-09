import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'

class MovieDetail extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Header as='h2'>{this.props.movie.title}</Header>
        <Header as='h4'>Rating</Header>
        <p>{this.props.movie.rating}/10.0</p>
        <Header as='h4'>Genres</Header>
        <p>{this.props.movie.genres}</p>
        <Header as='h4'>Imdb Synopsis: </Header>
        <p>
          {this.props.movie.overview}
        </p>
      </div>
    )
  }
}

export default MovieDetail
