import React, {Component} from 'react'
import SearchBar from './../search/'
import MovieLinkList from './../movies/movieLinkList'
import MovieDetail from './../movies/movieDetail'
import MovieList from './../movies/movieList'
import { Message, Header, Grid, Item } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { getMovies, getMovieDetails } from './../../actions/searchActions'
import { fetchMovies } from './../../actions/moviesActions'
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import { setErrors } from './../../client'
import PrivateRoute from './../../containers/privateRoute'
import VanishingComponent from './../../containers/vanishingComponent'
import PropTypes from 'prop-types'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      queryTerm: '',
      isLoading: false,
      movieSearchResults: [],
      movies:{},
      errors: ''
    }
  }

  componentWillMount() {
    this.resetComponent()
  }

  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.setState({
        isLoading:true
      })
      this.props.fetchMovies().then(moviesData => {
        this.setState({
          isLoading: false
        })
      }).catch(err => {
        const errors = setErrors(err.response.data)
        this.setState({isLoading: false, errors: errors.messages[0]})
      })
    }
  }

  resetComponent = () => this.setState({ isLoading: false, movieSearchResults: [], queryTerm: '' })

  onSearchChange = (e, {value}) => {
    this.setState({
      isLoading: true,
      queryTerm: value
    })
    if (this.state.queryTerm.length > 1) {
      this.props.getMovies(this.state.queryTerm)
        .then(results => {
          this.setState({
            isLoading: false,
            movieSearchResults: results
          })
        })
    }
    if (this.state.queryTerm.length < 1) return this.setState({isLoading:false, movieSearchResults: [] })
  }

  onResultSelect = (e, {result}) => {
    this.props.history.push(this.props.match.path)
    this.setState({movies: {}, errors:'', isLoading: true, queryTerm: result.title})
    this.props.getMovieDetails(this.state.queryTerm).then(
      data => {
        if (isEmpty(data)) {
          this.setState({isLoading: false, errors: 'No results found. Please try again!!', movies: {}})
        } else {
        this.setState({isLoading: false, movieSearchResults:[], errors: '', movies: data})
        this.props.history.push(`${this.props.match.path}/${Object.keys(data)[0]}`)
        }
      }
    )
    .catch((err) => {
      this.setState({isLoading: false, movieSearchResults:[], errors: 'Something went wrong. Please try again!!'})
    })
  }

  render () {
    const matchPath = this.props.match.path
    const from = this.props.location && this.props.location.state && this.props.location.state.from
    return (
      <div style={{margin: '0 0 0 30px'}}>
        {from === 'login' &&
          <VanishingComponent time={10000} transitionDuration={2000}>
            <Message
              compact
              success
              header='Log In Successful'
              content='Welcome Back to Moofie!!'
              style={{width: '30%', marginLeft: 'auto', marginRight: 'auto'}}
            />
          </VanishingComponent>
        }
        <SearchBar
          loading={!!this.state.queryTerm && this.state.isLoading}
          queryTerm={this.state.queryTerm}
          movieSearchResults={this.state.movieSearchResults}
          onSearchChange={this.onSearchChange}
          onResultSelect={this.onResultSelect}
          />
        {from === 'signup' &&
          <VanishingComponent time={10000} transitionDuration={2000}>
            <Message
              compact
              success
              header='Sign Up Successful'
              content='Welcome to Moofie!!'
              style={{width: '30%', marginLeft: 'auto', marginRight: 'auto'}}
            />
          </VanishingComponent>
        }
        {!!this.state.errors ?
          <VanishingComponent time={10000} transitionDuration={2000}>
            <Message
              compact
              warning={!!this.state.errors}
              header='Error'
              content={this.state.errors}
              style={{width: '30%', marginLeft: 'auto', marginRight: 'auto'}}
            />
          </VanishingComponent>
          :
          null}
          <Switch>
            <PrivateRoute isAuthenticated={this.props.isAuthenticated} exact path={`${matchPath}/list`} component={MovieList} />
            <Route path= {`${matchPath}/:movieId`} render={(props) => {
              const movieId = props.match.params.movieId
              const movie = this.state.movies[movieId]
              return (
                <Grid divided={!isEmpty(this.state.movies)}>
                  <Grid.Column width={5}>
                    <MovieLinkList movies={this.state.movies} moviePath={matchPath} />
                  </Grid.Column>
                  <Grid.Column width={11} style={{overflow: 'visible'}}>
                    <Item style={{padding: '0.785714em 0.928571em', paddingTop: '0.3em', position: 'sticky', top: '70px'}}>
                      {this.state.movies[movieId] ?
                        <MovieDetail movie={movie} /> :
                        <Header as='h3'>No Matching Movie Found!!</Header>
                      }
                    </Item>
                  </Grid.Column>
                </Grid>
              )
              }}/>
          </Switch>


      </div>
    )
  }
}

Home.propTypes = {
  getMovies: PropTypes.func.isRequired,
  getMovieDetails: PropTypes.func.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  moviesById: PropTypes.shape({
    id: PropTypes.shape({
      ext_id: PropTypes.number,
      tagline: PropTypes.string,
      title: PropTypes.string,
      overview: PropTypes.string,
      rating: PropTypes.number,
      genres: PropTypes.string,
      release_year: PropTypes.string,
      poster_path: PropTypes.string,
      production_companies: PropTypes.string,
      runtime: PropTypes.string
    })
  }),
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  moviesById: state.moviesById,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getMovies, getMovieDetails, fetchMovies})(Home)
