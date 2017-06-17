import React from 'react';
import { Link } from 'react-router';

export default class BeerPreview extends React.Component {
  render() {
    return (
      <Link to={`/beer/${this.props.id}`}>
        <img src={`${this.props.picture}`} />
        <h2 className="name">{this.props.name}</h2>
        <span className="brewery">{this.props.brewery}</span>
      </Link>
    );
  }
}