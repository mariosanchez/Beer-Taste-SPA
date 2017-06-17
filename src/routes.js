import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import BeerPage from './components/BeerPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage}/>
        <Route path="beer/:id" component={BeerPage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);

export default routes;