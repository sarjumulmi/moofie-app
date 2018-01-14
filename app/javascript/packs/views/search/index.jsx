import React from 'react'
import { Form, Grid, Icon, Header, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import moofieTitle from './../../public/images/moofieTitle.png'

const SearchBar = (props) => (
  <div >
    <Grid>
      <Grid.Column width={13} style={{margin: 'auto'}}>
        <Image src={moofieTitle} style={{margin: '8px auto 12px auto'}} />
        <Form onSubmit={props.onSubmit} loading={props.loading} style={{marginBottom: '12px'}}>
          <Form.Input fluid
            icon
            placeholder='Search Movies...'
            size='big'
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
