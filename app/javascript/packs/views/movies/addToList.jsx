import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { postMovie } from './../../actions/moviesActions'
import PropTypes from 'prop-types'

class AddToList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      errors: {}
    }
  }
  handleAddToList = (movie) => {
    this.setState({
      isLoading: true, errors: {}
    })
    this.props.postMovie(movie).then(movieData => {
      this.setState({
        isLoading:false, errors: {}
      })
    }).catch(err => {
      const errors = setErrors(err.response.data)
      this.setState({isLoading: false, errors})
    })
  }
  render () {
    const {moviesById, movieId, movie, isAuthenticated} = this.props
    const isInList = Object.values(moviesById).find(movie => {
      return movie.ext_id == movieId
    })
    if (!isAuthenticated) {
      return null
    }
    return (
      <div>
        {!!isInList ?
          <span>
            <Icon name='checkmark' size='large' color='green' /> Added to List
          </span>
        : <span>
            <Icon link
            name='add'
            size='large'
            color='blue'
            loading={!!this.state.isLoading}
            onClick={() => this.handleAddToList(movie)}
            />
            Add to List
          </span>
        }

      </div>
    )
  }
}

AddToList.propTyes = {
  postMovie: PropTypes.func.isRequired,
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
  }), 
  movieId: PropTypes.number.isRequired,
  movie: PropTypes.shape({
    ext_id: PropTypes.number.isRequired,
    title: PropTypes.string,
    tagline: PropTypes.string,
    overview: PropTypes.string,
    rating: PropTypes.number,
    genres: PropTypes.string,
    release_year: PropTypes.string,
    poster_path: PropTypes.string,
    runtime: PropTypes.string
  }).isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  moviesById: state.moviesById,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {postMovie})(AddToList)
