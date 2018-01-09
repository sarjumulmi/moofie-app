import React, {Component} from 'react'
import SearchBar from './../search/'
import MovieLinkList from './../movieLinkList/'
import MovieDetail from './../movieLinkList/movieDetail'
import { Message, Header, Grid, Item } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { getMovies, getMovieDetails } from './../../actions/searchActions';
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'
import { Route } from 'react-router-dom';

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      queryTerm: '',
      isLoading: false,
      movies:{},
      errors: ''
    }
  }
  onChange = (e) => {
    this.setState({
      queryTerm: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.history.push(this.props.match.path)
    this.setState({errors:'', isLoading: true})
    this.props.getMovieDetails(this.state.queryTerm).then(
      data => {
        if (isEmpty(data)) {
          this.setState({isLoading: false, errors: 'No results found. Please try again!!'})
        } else {
        this.setState({isLoading: false, errors: '', movies: data})
        }
      }
    )
    .catch((err) => {
      this.setState({isLoading: false, errors: 'Something went wrong. Please try again!!'})
    })
  }

  render () {
    const matchPath = this.props.match.path
  
    return (
      <div style={{margin: '0 0 0 30px'}}>
        <SearchBar
          queryTerm={this.state.queryTerm}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          loading={!!this.state.queryTerm && this.state.isLoading}
          />
        {!!this.state.errors ?
          <Message
            compact
            warning={!!this.state.errors}
            header='Error'
            content={this.state.errors}
          /> :
        null}
        <Grid divided={!isEmpty(this.state.movies)}>
          <Grid.Column width={4} >
            <MovieLinkList movies={this.state.movies} moviePath={matchPath} />
          </Grid.Column>
          <Grid.Column width={12} style={{overflow: 'visible'}}>
            <Route path={`${matchPath}/:movieId`} render={({match}) => {
                const movieId = match.params.movieId
                const movie = this.state.movies[movieId]
                return (
                  <Item style={{padding: '0.785714em 0.928571em', paddingTop: '0.3em', position: 'sticky', top: '70px'}}>
                    {this.state.movies[movieId] ?
                      <MovieDetail matchPath={matchPath} movie={movie} movieId={movieId} /> :
                      <Header as='h3'>No Matching Movie Found!!</Header>
                    }
                  </Item>
                )
              }}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default connect(null, {getMovies, getMovieDetails})(Home)
