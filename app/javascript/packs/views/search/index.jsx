import React from 'react'
import { Form, Grid, Icon, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const SearchBar = (props) => (
  <div >
    <Grid>
      <Grid.Column width={13} style={{margin: 'auto'}}>
        <Header as='h3' textAlign='center'>MooFie Search</Header>
        <Form onSubmit={props.onSubmit} loading={props.loading} style={{marginBottom: '12px'}}>
          <Form.Input fluid
            icon
            placeholder='Search Movies...'
            size='huge'
            value={props.queryTerm}
            onChange={props.onChange} >
            <input />
            <Icon name='search' inverted circular link onClick={props.onSubmit} />
          </Form.Input>
        </Form>
      </Grid.Column>
    </Grid>
  </div>
)

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  queryTerm: PropTypes.string.isRequired
}

export default SearchBar
