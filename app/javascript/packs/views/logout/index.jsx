import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './../../actions/authActions'

class LogoutForm extends Component {
  constructor (props) {
    super(props)
    props.logout()
  }
  render () {
    return (
      <Redirect to='/' />
    )
  }
}

export default connect(null, {logout})(LogoutForm)
