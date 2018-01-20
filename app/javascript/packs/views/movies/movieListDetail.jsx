import React, { Component } from 'react'
import { Item, Rating, Icon } from 'semantic-ui-react'
import { removeMovie } from './../../actions/moviesActions'

export default class MovieListDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      errors: {}
    }
  }

  onClick = (id) => {
    this.setState({
      isLoading: true,
      errors: {}
    })
    if (confirm('Do you want to remove the movie from the list?')) {
      this.props.removeMovie(id)
    }
  }

  render () {
    const {title, overview, rating, genres, release_year, poster_path, runtime} = this.props.movie
    const {id} = this.props
    return (
      <Item>
        <Item.Image src={poster_path} size='tiny' style={{margin: 'auto 0 auto 0'}} />
        <Item.Content>
          <Item.Header>{title}</Item.Header>
          <Item.Meta>{release_year} &middot; {genres} &middot; {runtime}</Item.Meta>
          <Rating icon='star' rating={Math.round(rating / 2)} maxRating={5} disabled />
          <Item.Description>{overview}</Item.Description>
        </Item.Content>
        <Icon link title='Remove from List'
          name='remove'
          size='large'
          color='red'
          loading={this.state.isLoading}
          onClick={() => this.onClick(id)}
        />
      </Item>
    )
  }
}
