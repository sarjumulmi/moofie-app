import React, {Component} from 'react'
import MovieLink from './movieLink'
import { Menu } from 'semantic-ui-react'

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
      movies.push(<MovieLink movie={movie}
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

export default MovieLinkList
