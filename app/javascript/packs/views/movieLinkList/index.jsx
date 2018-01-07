import React, {Component} from 'react'
import MovieLink from './movieLink'

class MovieLinkList extends Component {
  render () {
    let movies = []
    for (const [id, movie] of Object.entries(this.props.movies)) {
      movies.push(<MovieLink movie={movie} key={id} moviePath={this.props.moviePath} movieId={id} />)
    }
    return (
      <div>
        {movies}
      </div>
    )
  }
}

export default MovieLinkList
