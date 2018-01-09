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
    for (const [id, movie] of Object.entries(this.props.movies)) {
      movies.push(<MovieLink movie={movie}
        key={id}
        moviePath={this.props.moviePath}
        movieId={id}
        handleItemClick={this.handleItemClick}
        active={this.state.activeItem === `movie-${id}`} />)
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
