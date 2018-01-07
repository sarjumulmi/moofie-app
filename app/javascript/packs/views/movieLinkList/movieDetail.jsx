import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'

class MovieDetail extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Header as='h2'>{this.props.movie.title}</Header>
        <Header as='h4'>Rating</Header>
        <p>{this.props.movie.rating}/10.0</p>
        <Header as='h4'>Imdb Synopsis: </Header>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et massa finibus nisl imperdiet lacinia. Mauris nulla massa, vestibulum auctor vestibulum ut, porttitor vestibulum est. Vivamus porttitor ante ac velit iaculis, at blandit purus dapibus. Vivamus id neque nisl. Nunc varius mauris ut libero pellentesque ornare. Vestibulum vestibulum a ligula in malesuada. Etiam a orci quis ex bibendum suscipit a vitae massa. Aliquam erat volutpat. Nunc risus felis, imperdiet volutpat nunc ac, porttitor fringilla purus. Aliquam et nunc nec erat pulvinar pellentesque posuere eget arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quis pulvinar erat, ut eleifend nulla. Vivamus feugiat dolor a urna consectetur, et pharetra nisi auctor. Integer a velit rhoncus, vestibulum purus non, ornare nibh.
        </p>
      </div>
    )
  }
}

export default MovieDetail
