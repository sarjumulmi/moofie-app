import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      <div>
        {visible ? this.props.children : null}
      </div>
    )
  }
}

VanishingComponent.propTypes = {
  time: PropTypes.number
}
VanishingComponent.defaultProps = {
  time: 5000
}
