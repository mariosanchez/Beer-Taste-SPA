import React from 'react';
import { Link } from 'react-router-dom';
import BeerMenu from './BeersMenu';
import Glass from './Glass';
import Flag from './Flag';

export const BeerPage = ({ beer, beers }) => {
  const headerStyle = { backgroundImage: `url(${beer.picture})` };
  return (
      <div className="beer-full">
        <BeerMenu beers={beers} />
        <div className="beer">
          <header style={headerStyle}/>
          <div className="picture-container">
            <img src={`${beer.picture}`}/>
            <h2 className="name">{beer.name}</h2>
          </div>
          <section className="info">
            <ul>
              <li>brewery: {beer.brewery}</li>
              <li>style: {beer.style}</li>
              <li>location: <Flag {...beer.location} showName="true"/></li>
              <li>ibu: {beer.ibu}</li>
              <li>abv: {beer.abv}</li>
            </ul>
          </section>
          <section className="glass">
            <ul>
              {beer.glass.map((glass, i) => <Glass key={i} {...glass}/>)}
            </ul>
          </section>
          <section className="description">
            {beer.description}
          </section>
        </div>
        <div>
          <Link to="/"> ← Back to the index </Link>
        </div>
      </div>
  );
}

export default BeerPage;
