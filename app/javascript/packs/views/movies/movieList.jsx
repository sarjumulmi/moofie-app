import React, { Component } from 'react'
import { connect } from 'react-redux'
import MovieListDetail from './movieListDetail'
import { Item, Header, Message} from 'semantic-ui-react'
import { removeMovie } from './../../actions/moviesActions'
import VanishingComponent from './../../containers/vanishingComponent'
import PropTypes from 'prop-types'

class MovieList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {},
      displayRemoveMsg: false
    }
  }
  removeMovie = (id) => {
    this.props.removeMovie(id)
    .then(data => {
      this.setState({
        displayRemoveMsg: true
      })
      setTimeout(() => {
        this.setState({
          displayRemoveMsg: false
        })
      }, 5000)
    })
    .catch(err => {
      const errors = setErrors(err.response.data)
      this.setState({isLoading: false, errors})
    })
  }

  render () {
    let movies = []
    for (const [id, movie] of Object.entries(this.props.moviesById)) {
      if (movie) {
        movies.push(
          <MovieListDetail movie={movie} key={id} id={id} removeMovie={this.removeMovie} />
        )
      } else {
        return (
          <Header as='h3' textAlign='center'>
            No movies added to list yet!!
          </Header>
        )
      }
    }
    return (
      <Item.Group divided style={{margin: '20px auto 15px auto', width: '80%'}}>
        {this.state.displayRemoveMsg &&
          <VanishingComponent>
            <Message compact success style={{width: '30%'}}>
              <Message.Header>Success</Message.Header>
              <p>Movie removed from list.</p>
            </Message>
          </VanishingComponent>
        }
          {movies}
      </Item.Group>
    )
  }
}

MovieList.propTypes = {
  removeMovie: PropTypes.func.isRequired,
  moviesById: PropTypes.shape({
    id: PropTypes.shape({
      title: PropTypes.string,
      overview: PropTypes.string,
      rating: PropTypes.number,
      genres: PropTypes.string,
      release_year: PropTypes.string,
      poster_path: PropTypes.string,
      runtime: PropTypes.string
    })
  })
}

const mapStateToProps = (state) => {
  return ({
    moviesById: state.moviesById
  })
}

export default connect(mapStateToProps, {removeMovie})(MovieList)
