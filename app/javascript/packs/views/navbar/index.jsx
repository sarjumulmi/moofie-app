import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Container } from 'semantic-ui-react'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: ''
    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render () {
    const {activeItem} = this.state
    const userLinks = (
      <Menu size='large' inverted fixed='top' style={{height: '65px'}}>
        <Menu.Item as={Link} to='/' active={activeItem==='home'} name='home' onClick={this.handleItemClick}>MooFie!!</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/logout' active={activeItem==='logout'} name='logout' position='right' onClick={this.handleItemClick}>Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    )
    const guestLinks = (
      <Menu size='large' inverted fixed='top' style={{height: '65px'}}>
        <Menu.Item as={Link} to='/' active={activeItem==='home'} name='home' onClick={this.handleItemClick}>Home</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/signup' active={activeItem==='signup'} name='signup' position='right' onClick={this.handleItemClick}>Sign Up</Menu.Item>
          <Menu.Item as={Link} to='/login' active={activeItem==='login'} name='login' position='right' onClick={this.handleItemClick}>Login</Menu.Item>
        </Menu.Menu>
      </Menu>
    )
    const {isAuthenticated} = this.props.auth
    return (
      <Container>
        <div style={{margin: '0 0 100px'}}>
          {isAuthenticated ? userLinks : guestLinks}
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(Navbar)
