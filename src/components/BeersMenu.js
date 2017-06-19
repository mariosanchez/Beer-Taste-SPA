import React from 'react';
import { Route, Link } from 'react-router-dom';

const BeerMenuLink = ({ id, to, label }) => (
  <Route path={`/beer/${id}`}>
    {({ match }) => (
      <Link to={to} className={match ? 'active' : ''}>{label}</Link>
    )}
  </Route>
);

export const BeersMenu = ({ beers }) => (
  <nav className="beers-menu">
    {
      beers.map(beer =>
       <BeerMenuLink key={beer.id} id={beer.id} to={`/beer/${beer.id}`} label={beer.name} />
      )
    }
  </nav>
);

export default BeersMenu;
