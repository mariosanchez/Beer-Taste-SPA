import React from 'react';

export const Flag = props => (
  <span className="flag">
    <img className="icon" title={props.country.name} src={`/img/${props.country.icon}`} alt={`${props.country.name}'s flag`} />
    {props.showName && <span className="name"> {props.city}, {props.country.name}</span>}
  </span>
);

export default Flag;
