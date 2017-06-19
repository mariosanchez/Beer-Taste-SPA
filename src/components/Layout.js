import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = props => (
  <div className="app-container">
    <header>
      <Link to="/">
        <img className="logo" src="/img/logo.png" alt="Beer Taste Logo"/>
      </Link>
    </header>
    <div className="app-content">{props.children}</div>
    <footer>
      <p>
        Check all the beers of the VIII Bandit Beer Taste!! <strong>Fuck Fucking Yeah!!</strong>
      </p>
    </footer>
  </div>
);

export default Layout;
