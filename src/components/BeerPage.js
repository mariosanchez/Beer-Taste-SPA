import React from 'react';
import BeerPreview from 'BeerPreview';
import beers from '../data/beers';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="beer-selector">
          {beers.map(beerData => <BeerPreview key={beerData.id} {...beerData} />)}
        </div>
      </div>
    );
  }
}