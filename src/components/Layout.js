import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            <img className="logo" src="/img/logo.png"/>
          </Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            Check all the beers of the VIII Bandit Beer Taste!! <strong>Fuck Fucking Yeah!!</strong>
          </p>
        </footer>
      </div>
    );
  }
}