import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { postMovie } from './../../actions/moviesAction'

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
    this.props.postMovie(movie)
  }
  render () {
    const {moviesById, movieId, movie} = this.props
    const isInList = Object.values(moviesById).find(movie => {
      return movie.ext_Id === movieId
    })
    return (
      <span>
        <Icon link={!isInList}
          name='add'
          size='large'
          color='blue'
          disabled={!!isInList}
          loading={!!this.state.isLoading}
          onClick={() => this.handleAddToList(movie)}
          />
        Add to List
      </span>
    )
  }
}

const mapStateToProps = (state) => ({
  moviesById: state.moviesById
})

export default connect(mapStateToProps, {postMovie})(AddToList)
