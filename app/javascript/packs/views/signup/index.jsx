import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { handleError, setErrors, formatErrorMessages } from './../../client'
import isEmpty from 'lodash/isEmpty'
import { userSignupRequest } from './../../actions/signupActions'

class SignupForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user:{
        username:'',
        password: '',
        password_confirmation: '',
        email:''
      },
      isLoading:false,
      errors: {},
      displaySuccessMsg:false
    }
  }
  onChange = (e) => {
    const {name, value} = e.target
    this.setState({
      user:{...this.state.user, [name]: value}
    })
  }

  isSuccess = () => {
    const success = isEmpty(this.state.errors)
    return success
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({errors: {}, isLoading: true, displaySuccessMsg:false})
    this.props.userSignupRequest(this.state.user)
      .then((response) => handleError(response))
      .then((user) => {
        this.setState({
          isLoading:false,
          displaySuccessMsg:true,
          user:{
            username:'',
            password: '',
            password_confirmation: '',
            email:''
          }
        })
      })
      .catch((err) => (err.json())
          .then(errMsg => {
              const errors = setErrors(errMsg)
              this.setState({
                isLoading:false,
                errors
              })
          })
      )

  }

  render () {
    return (
      <div style={{ height: '100%', width: '40%', margin: '0 auto' }}>
        <Form size='tiny' onSubmit={this.handleSubmit} loading={this.state.isLoading} success={this.state.displaySuccessMsg} error={!this.isSuccess()}>
          <Segment stacked>
            <Form.Input fluid required
              label='User Name'
              name='username'
              value={this.state.user.username}
              onChange={this.onChange}
            />
            <Form.Input fluid required
                label='Email'
                name='email'
                value={this.state.user.email}
                onChange={this.onChange}
            />
            <Form.Input fluid required
                label='Password'
                name='password'
                value={this.state.user.password}
                type='password'
                onChange={this.onChange}
            />
            <Form.Input fluid required
                label='Password Confirmation'
                name='password_confirmation'
                value={this.state.user.password_confirmation}
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
              header='Success'
              content= 'User Sign Up Successful. Please log in!!'
            />
          <Button color='teal' fluid disabled={this.state.isLoading}>Submit</Button>
          </Segment>
        </Form>
        <Message>
          <Link to='/login'>Already a member? Login</Link>
        </Message>
      </div>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest})(SignupForm)
