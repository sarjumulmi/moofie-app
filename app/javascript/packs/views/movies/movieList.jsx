import React, { Component } from 'react'
import { connect } from 'react-redux'
import MovieListDetail from './movieListDetail'
import { Item, Header } from 'semantic-ui-react'

class MovieList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  render () {
    let movies = []
    for (const [id, movie] of Object.entries(this.props.moviesById)) {
      if (movie) {
        movies.push(
          <MovieListDetail movie={movie} key={id} id={id} />
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
      <Item.Group divided style={{width: '80%', margin: '20px auto 15px auto'}}>
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

export default connect(mapStateToProps)(MovieList)
