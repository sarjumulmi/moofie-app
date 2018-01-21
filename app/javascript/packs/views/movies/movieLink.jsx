import React, {Component} from 'react'
import { Image, Menu, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import AddToList from './addToList'
import PropTypes from 'prop-types'

class MovieLink extends Component {

  handleItemClick = (e) => {
    this.props.handleItemClick(e)
  }

  render () {
    const {moviePath, movieId, active, movie} = this.props
    return (
      <table style={{width: '100%', padding: '15px 0 15px'}}>
        <tbody>
          <tr>
            <td style={{width: '120px'}}>
              <Menu.Item as={Link} to={`${moviePath}/${movieId}`}
                active={active}
                onClick={this.handleItemClick}
                style={active ? {background: 'rgba(33,150,243,.4)'} : null}>
                  <Image src={movie.poster_path} size='tiny' name={`movie-${movieId}`} rounded />
              </Menu.Item>
            </td>
            <td>
              <Header as='h3' style={{marginTop: '0', marginBottom: '5px'}}>{movie.title}</Header>
              <p style={{marginTop: '0', marginBottom: '5px'}}>{movie.release_year} </p>
              <p style={{marginTop: '0', marginBottom: '5px'}}>{movie.genres} </p>
              <AddToList movieId={movieId} movie={{...movie, ext_id: movieId}}/>
            </td>
          </tr>
        </tbody>
      </table>

    )
  }
}

MovieLink.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string,
    rating: PropTypes.number,
    genres: PropTypes.string,
    release_year: PropTypes.string,
    poster_path: PropTypes.string,
    runtime: PropTypes.string
  }).isRequired,
  movieId: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  moviePath: PropTypes.string.isRequired
}

export default MovieLink
