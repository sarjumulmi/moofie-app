import React, {Component} from 'react'
import MovieLink from './movieLink'
import { Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class MovieLinkList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: ''
    }
  }
  handleItemClick = (e) => {
    this.setState({
      activeItem: e.target.name
    })
  }
  render () {
    let movies = []
    for (const [movieId, movie] of Object.entries(this.props.movies)) {
      movies.push(<MovieLink
        movie={movie}
        key={movieId}
        moviePath={this.props.moviePath}
        movieId={movieId}
        handleItemClick={this.handleItemClick}
        active={this.state.activeItem === `movie-${movieId}`} />)
    }
    return (
      <div>
        <Menu vertical icon secondary >
          {movies}
        </Menu>
      </div>
    )
  }
}
MovieLinkList.propTypes = {
  movies: PropTypes.shape({
    movieId: PropTypes.shape({
      title: PropTypes.string,
      overview: PropTypes.string,
      rating: PropTypes.number,
      genres: PropTypes.string,
      release_year: PropTypes.string,
      poster_path: PropTypes.string,
      runtime: PropTypes.string
    })
  }),
  moviePath: PropTypes.string.isRequired
}

export default MovieLinkList
