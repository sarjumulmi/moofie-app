import React, { Component } from 'react'
import { Item, Rating } from 'semantic-ui-react'

export default class MovieListDetail extends Component {
  render () {
    const {title, overview, rating, genres, release_year, poster_path, runtime} = this.props.movie
    const {id} = this.props
    return (
      <Item>
        <Item.Image src={poster_path} size='tiny' style={{margin: 'auto 0 auto 0'}} />
        <Item.Content>
          <Item.Header>{title}</Item.Header>
          <Item.Meta>{release_year}&middot;{genres}&middot;{runtime}</Item.Meta>
          <Rating icon='star' rating={Math.round(rating / 2)} maxRating={5} disabled />
          <Item.Description>{overview}</Item.Description>
        </Item.Content>
      </Item>
    )
  }
}
