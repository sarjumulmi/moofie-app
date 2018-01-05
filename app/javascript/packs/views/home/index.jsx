import React, {Component} from 'react'
import SearchBar from './../search/'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      queryTerm: ''
    }
  }
  onChange = (e) => {
    this.setState({
      queryTerm: e.target.value
    })
  }
  render () {
    console.log('Query term: ', this.state.queryTerm)
    return (
      <div style={{margin: '0 0 0 20px'}}>
        <h3>Recent Movies {process.env.S3_API} {process.env.NODE_ENV}</h3>
        <SearchBar queryTerm={this.state.queryTerm} onChange={this.onChange} />
      </div>
    )
  }
}

export default Home
