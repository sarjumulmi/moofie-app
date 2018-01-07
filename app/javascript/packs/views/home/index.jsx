import React, {Component} from 'react'
import SearchBar from './../search/'
import MovieLinkList from './../movieLinkList/'
import { Message, Header, Grid } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { getMovies } from './../../actions/searchActions';
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
      queryTerm: e.target.value,
      isLoading:true
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/movies')
    this.setState({errors:'', movies:{}})
    this.props.getMovies(this.state.queryTerm).then(
      data => {
        if (isEmpty(data)) {
          this.setState({isLoading: false, errors: 'No results found. Please try again!!'})
        } else {
          this.setState({isLoading: false, errors: '', movies: data})
        }
      }
    ).catch((err) => {
      this.setState({isLoading: false, errors: 'No results found. Please try again!!'})
    })
  }

  render () {
    const matchPath = this.props.match.path
    return (
      <div style={{margin: '0 0 0 10px'}}>
        <Header as='h3'>Recent Movies having API {process.env.MOVIE_DB_API_KEY} {process.env.NODE_ENV} environment.</Header>
        <SearchBar
          queryTerm={this.state.queryTerm}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          loading={!!this.state.queryTerm && this.state.isLoading}
          />
        {!!this.state.errors ? <Message compact warning={!!this.state.errors} header='Error' content={this.state.errors} /> : null}
        <Grid>
          <Grid.Column width={6}>
            <MovieLinkList movies={this.state.movies} moviePath={matchPath} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Route path={`${matchPath}/:movieId`} render={({match}) => {
                const movieId = match.params.movieId
                const movie = this.state.movies.movieId
                return (
                  <div>{this.state.movies[movieId].title}</div>
                )
              }}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default connect(null, {getMovies})(Home)
