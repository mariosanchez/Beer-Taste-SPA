import React from 'react';
import { BeerPreview } from './BeerPreview';

export const IndexPage = ({ beers }) => (
  <div className="home">
    <div className="beers-selector">
      {
        beers.map(beerData => <BeerPreview key={beerData.id} {...beerData} />)
      }
    </div>
  </div>
);

export default IndexPage;
