import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { postMovie } from './../../actions/moviesActions'

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
          <span><Icon name='checkmark' size='large' color='green' /> Added to List </span> :
          <span>
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

const mapStateToProps = (state) => ({
  moviesById: state.moviesById,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {postMovie})(AddToList)
