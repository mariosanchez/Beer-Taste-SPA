import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import { IndexPage } from './IndexPage';
import { BeerPage } from './BeerPage';
import { NotFoundPage } from './NotFoundPage';
import beers from '../data/beers';

const renderIndex = () => <IndexPage beers={beers} />;
const renderBeer = ({ match, staticContext }) => {
  const id = match.params.id;
  const beer = beers.find(current => Number.parseInt(current.id) === Number.parseInt(id));
  if (!beer) {
    return <NotFoundPage staticContext={staticContext} />;
  }

  return <BeerPage beer={beer} beers={beers} />;
};

export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" render={renderIndex} />
      <Route exact path="/beer/:id" render={renderBeer} />
      <Route component={NotFoundPage} />
    </Switch>
  </Layout>
);

export default App;
