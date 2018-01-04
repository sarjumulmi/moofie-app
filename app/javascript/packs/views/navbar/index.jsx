import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends Component {
  render () {
    const userLinks = (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/logout'>Logout</Link>
      </div>
    )
    const guestLinks = (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/login'>Login</Link>
      </div>
    )
    const {isAuthenticated} = this.props.auth
    return (
      <div>
        <nav>
          {isAuthenticated ? userLinks : guestLinks}
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(Navbar)
