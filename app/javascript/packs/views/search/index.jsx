import React from 'react'
import { Grid, Image, Search, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import moofieTitle from './../../public/images/moofieTitle.png'

const resultRenderer = ({title, release_date}) => {
  const releaseYear = release_date.slice(0, 4) || 'Unreleased'
  const content = `${title}, ${releaseYear}`
  return <Label content={content} />
}

const SearchBar = (props) => (
  <div >
    <Grid>
      <Grid.Column width={13} style={{margin: 'auto'}}>
        <Image src={moofieTitle} style={{margin: '8px auto 12px auto'}} />
        <Search
          loading={props.loading}
          results={props.movieSearchResults}
          value={props.queryTerm}
          onSearchChange={props.onSearchChange}
          onResultSelect={props.onResultSelect}
          resultRenderer={resultRenderer}
          minCharacters={2}
          input={{icon: 'search', style: {width: '1000px', marginBottom: '10px'}}}
          {...this.props}
        />
      </Grid.Column>
    </Grid>
  </div>
)

SearchBar.propTypes = {
  onResultSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  queryTerm: PropTypes.string.isRequired
}

export default SearchBar
