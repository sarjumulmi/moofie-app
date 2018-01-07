import React, {Component} from 'react'
import { Image, Container, Grid } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class MovieLink extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Grid style={{margin: '0 0 0 20px'}}>
        <Grid.Column width={6}>
          <Container>
            <NavLink to={`${this.props.moviePath}/${this.props.movieId}`}>
              <Image src={this.props.movie.poster_path} size='tiny' rounded />
            </NavLink>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}

export default MovieLink
