import React, { Component } from 'react'
import { connect } from 'react-redux'
import MovieListDetail from './movieListDetail'
import { Item, Header, Message} from 'semantic-ui-react'
import { removeMovie } from './../../actions/moviesActions'
import VanishingComponent from './../../containers/vanishingComponent'

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

const mapStateToProps = (state) => {
  return ({
    moviesById: state.moviesById
  })
}

export default connect(mapStateToProps, {removeMovie})(MovieList)
