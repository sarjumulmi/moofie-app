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
      movies:{},
      errors: ''
    }
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

  onChange = (e) => {
    this.setState({
      queryTerm: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.history.push(this.props.match.path)
    this.setState({movies: {}, errors:'', isLoading: true})
    this.props.getMovieDetails(this.state.queryTerm).then(
      data => {
        if (isEmpty(data)) {
          this.setState({isLoading: false, errors: 'No results found. Please try again!!', movies: {}})
        } else {
        this.setState({isLoading: false, errors: '', movies: data})
        this.props.history.push(`${this.props.match.path}/${Object.keys(data)[0]}`)
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
