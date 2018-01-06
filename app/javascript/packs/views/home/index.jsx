import React, {Component} from 'react'
import SearchBar from './../search/'
import { Header } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { getMovies } from './../../actions/searchActions';

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      queryTerm: '',
      isLoading: false,
      movies:{}
    }
  }
  onChange = (e) => {
    this.setState({
      queryTerm: e.target.value,
      isLoading:true,
      movies:{}
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.getMovies(this.state.queryTerm).then(
      data => {
        this.setState({isLoading: false, movies: data})
      }
    ).catch((err) => {
      console.log(err)
      this.setState({
        isLoading: false
      })
    })
  }

  render () {
    console.log(this.state)
    return (
      <div style={{margin: '0 0 0 10px'}}>
        <Header as='h3'>Recent Movies having API {process.env.MOVIE_DB_API_KEY} {process.env.NODE_ENV} environment.</Header>
        <SearchBar queryTerm={this.state.queryTerm} onSubmit={this.onSubmit} onChange={this.onChange} loading={!!this.state.queryTerm && this.state.isLoading}/>
      </div>
    )
  }
}

export default connect(null, {getMovies})(Home)
