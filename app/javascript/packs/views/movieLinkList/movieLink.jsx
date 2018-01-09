import React, {Component} from 'react'
import { Image, Menu, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class MovieLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: ''
    }
  }
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
              <Header as='h3'>{movie.title}</Header>
              <p>{movie.release_year} </p>
              <p>{movie.genres} </p>
            </td>
          </tr>
        </tbody>  
      </table>

    )
  }
}

export default MovieLink
