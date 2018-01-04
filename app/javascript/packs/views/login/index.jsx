import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
      errors: {},
      displaySuccessMsg: false
    }
  }

  onChange = (e) => {
    const {name, value} = e.target
    this.setState({
      auth: {...this.state.auth, [name]: value}
    })
  }
  isSuccess = () => {
    const success = isEmpty(this.state.errors)
    return success
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({errors: {}, isLoading: true, displaySuccessMsg:false})
    this.props.login(this.state.auth)
      .then(
        (response) => {
          this.setState({isLoading: false, displaySuccessMsg:true})
        }
      )
      .catch((err) => {
        const errors = setErrors(err.response.data)
        this.setState({isLoading: false, errors})
      })

    }

  render () {
    return (
      <div style={{ height: '100%', width: '40%', margin: '0 auto' }}>
        <Form onSubmit={this.handleSubmit} loading={this.state.isLoading} success={this.state.displaySuccessMsg} error={!this.isSuccess()}>
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
            <Message
              success
              header='Success!!'
              content= 'Successfully Logged In!!'
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
LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default connect(null, {login})(LoginForm)
