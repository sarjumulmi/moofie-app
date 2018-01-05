import React, { Component } from 'react'
import { Input, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div style={{margin: '0 0 0 20px'}}>
        <Grid>
          <Grid.Column width={8}>
            <Input fluid icon='search' placeholder='Search Movies...' size='huge' value={this.props.queryTerm} onChange={this.props.onChange} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  queryTerm: PropTypes.string.isRequired
}

export default SearchBar
