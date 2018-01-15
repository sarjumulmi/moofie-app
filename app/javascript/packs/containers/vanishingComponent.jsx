import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Transition} from 'semantic-ui-react'

export default class VanishingComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  componentDidMount () {
    this.timer = setTimeout(() => {
      this.setState({visible: false})
    }, this.props.time
  )
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    const {visible} = this.state
    return (
      <Transition visible={visible} animation='fade' duration={this.props.transitionDuration}>
        {this.props.children}
      </Transition>
    )
  }
}

VanishingComponent.propTypes = {
  time: PropTypes.number,
  transitionDuration: PropTypes.number
}
VanishingComponent.defaultProps = {
  time: 5000,
  transitionDuration: 500
}
