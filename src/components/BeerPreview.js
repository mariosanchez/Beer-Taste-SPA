import React from 'react';
import { Link } from 'react-router-dom';

export const BeerPreview = props => (
  <Link to={`/beer/${props.id}`}>
    <div className="beer-preview">
      <img src={`${props.picture}`} />
      <h2 className="name">{props.name}</h2>
      <span className="brewery">{props.brewery}</span>
    </div>
  </Link>
);

export default BeerPreview;
