import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import isEmpty from 'lodash/isEmpty'
import { login } from './../../actions/authActions'
import { handleError, setErrors, formatErrorMessages } from './../../client'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: {
        identifier: '',
        password: ''
      },
      isLoading: false,
      errors: {}
    }
  }

  onChange = (e) => {
    const {name, value} = e.target
    this.setState({
      auth: {...this.state.auth, [name]: value}
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({errors: {}, isLoading: true})
    this.props.login(this.state.auth)
      .then(
        (response) => {
        }
      )
      .catch((err) => {
        const errors = setErrors(err.response.data)
        this.setState({isLoading: false, errors})
      })
    }

  render () {
    if (this.props.isAuthenticated) {
      const from = (this.props.location.state && this.props.location.state.from) || '/movies'
      return (
        <Redirect to={from} />
      )
    } else {
      return (
        <div style={{ height: '100%', width: '40%', margin: '0 auto' }}>
          <Form onSubmit={this.handleSubmit} loading={this.state.isLoading} error={!isEmpty(this.state.errors)}>
            <Segment stacked>
              <Form.Input fluid required
                label='Username/Email'
                name='identifier'
                value={this.state.auth.identifier}
                onChange={this.onChange}
              />
              <Form.Input fluid required
                label='Password'
                name='password'
                value={this.state.auth.password}
                type='password'
                onChange={this.onChange}
              />
              <Message
                error
                header='Error'
                content= {formatErrorMessages(this.state.errors)}
              />
              <Button color='teal' fluid disabled={false}>Submit</Button>
            </Segment>
          </Form>
          <Message>
            <Link to='/signup'>Not a member? Signup</Link>
          </Message>
        </div>
      )
    }
  }
}
LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps, {login})(LoginForm)
