import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class SignupForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const {username, email, password, passwordConfirmation} = this.state
    const user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
    console.log({user: user})
  }
  render () {
    return (
      <div style={{ height: '100%', width:'40%', margin: '0 auto' }}>
        <Form size='tiny' onSubmit={this.handleSubmit}>
          <Segment stacked>
            <Form.Input fluid required
              label='User Name'
              name='username'
              value={this.state.username}
              onChange={this.onChange}
            />
            <Form.Input fluid required
                label='Email'
                name='email'
                value={this.state.email}
                onChange={this.onChange}
            />
            <Form.Input fluid required
                label='Password'
                name='password'
                value={this.state.password}
                type='password'
                onChange={this.onChange}
            />
            <Form.Input fluid required
                label='Password Confirmation'
                name='passwordConfirmation'
                value={this.state.passwordConfirmation}
                type='password'
                onChange={this.onChange}
            />

            <Button color='teal' fluid disabled={false}>Submit</Button>
          </Segment>
        </Form>
      </div>
    )
  }
}

export default SignupForm
