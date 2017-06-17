import React from 'react';
import { Link } from 'react-router';
import  NotFoundPage from './NotFoundPage';
import BeerMenu from './BeersMenu';
import Glass from './Glass';
import Flag from './Flag';
import beers from '../data/beers';

export default class BeerPage extends React.Component {
  render() {
    const id = this.props.params.id;
    const beer = beers.filter((beer) => beer.id === id)[0];
    if (!beer) {
      return <NotFoundPage/>;
    }
    const headerStyle = { backgroundImage: `url(/img/${beer.picture})` };
    return (
        <div className="beer-full">
            <BeerMenu beers={beers} />
            <div className="beer">
              <header style={headerStyle}/>
              <div className="picture-container">
                <img src={`/img/${beer.picture}`}/>
                <h2 className="name">{beer.name}</h2>
              </div>
              <section className="info">
                <ul>
                  <li>brewery: <Flag code={beer.country} showName="false"/> {beer.brewery}</li>
                  <li>style: {beer.style}</li>
                  <li>location: {beer.location}</li>
                  <li>glass: {beer.glass}</li>
                  <li>ibu: {beer.ibu}</li>
                  <li>abv: {beer.abv}</li>
                </ul>
              </section>
              <section className="glass">
                <ul>
                  {beer.glass.map((glass, key) => <Glass key={key} {...glass}/>)}
                </ul>
              </section>
              <section className="description">
                {beer.description}
              </section>
            </div>
            <div>
              <Link to="/"> {'<<'} Back to the index </Link>
            </div>
        </div>

    );
  }
}