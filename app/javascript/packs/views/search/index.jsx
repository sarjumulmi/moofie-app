import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
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
            <Form onSubmit={this.props.onSubmit}>
              <Form.Input fluid icon='search' loading={this.props.loading} placeholder='Search Movies...' size='huge' value={this.props.queryTerm} onChange={this.props.onChange} />
            </Form>
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
