import React from 'react';
import { Link } from 'react-router-dom';
import BeerPicture from './BeerPicture';

export const BeerPreview = props => (
  <Link to={`/beer/${props.id}`}>
    <div className="beer-preview">
      <BeerPicture picture={props.picture} />
      <h2 className="name">{props.name}</h2>
      <h3 className="brewery">{props.brewery}</h3>
    </div>
  </Link>
);

export default BeerPreview;
