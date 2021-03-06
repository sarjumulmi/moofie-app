import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Container, Image, Label } from 'semantic-ui-react'
import logo from './../../public/images/logo.png'

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
    const movieNumber = Object.keys(this.props.moviesById).length
    const userLinks = (
      <Menu size='huge' inverted fixed='top' style={{height: '75px'}}>
        <Menu.Item style={{paddingRight: '2px', paddingLeft: '2px'}}>
          <Image src={logo} />
        </Menu.Item>
        <Menu.Item as={Link} to='/' active={activeItem==='home'} name='home' onClick={this.handleItemClick}>
          Home
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='My List' as={Link} to='/movies/list' active={activeItem==='list'} name='list' position='right' onClick={this.handleItemClick}>
            My List <span><Label color='teal' floating style={{top: 'unset', bottom: '0.2em', left: '90%'}}>{movieNumber}</Label></span>  
          </Menu.Item>
          <Menu.Item as={Link} to='/logout' active={activeItem==='logout'} name='logout' position='right' onClick={this.handleItemClick}>Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    )
    const guestLinks = (
      <Menu size='huge' inverted fixed='top' style={{height: '75px'}}>
        <Menu.Item style={{paddingRight: '2px', paddingLeft: '2px'}}>
          <Image src={logo} />
        </Menu.Item>
        <Menu.Item as={Link} to='/' active={activeItem==='home'} name='home' onClick={this.handleItemClick}>
          Home
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/signup' active={activeItem==='signup'} name='signup' position='right' onClick={this.handleItemClick}>Sign Up</Menu.Item>
          <Menu.Item as={Link} to='/login' active={activeItem==='login'} name='login' position='right' onClick={this.handleItemClick}>Login</Menu.Item>
        </Menu.Menu>
      </Menu>
    )
    const {isAuthenticated} = this.props.auth
    return (
      <Container>
        <div style={{margin: '0 0 80px'}}>
          {isAuthenticated ? userLinks : guestLinks}
        </div>
      </Container>
    )
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    moviesById: state.moviesById
  }
}
export default connect(mapStateToProps)(Navbar)
